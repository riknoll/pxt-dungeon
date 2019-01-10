// Add your code here
namespace dungeon {
    const debug = true;

    export enum SpriteKind {
        Player,
        Arrow,
        Launcher
    }

    export enum RoomTile {
        Empty,
        Normal,
        Wall,
        Treasure,
        EnemySpawn,
        SpikeTrap,
        ArrowNorth,
        ArrowEast,
        ArrowSouth,
        ArrowWest,
        FlameNorth,
        FlameEast,
        FlameSouth,
        FlameWest,
        Door
    }

    enum TileInternal {
        Floor,
        Hole,
        Wall,
        Spike,
        Object,
        DoorNorth,
        DoorEast,
        DoorSouth,
        DoorWest
    }

    function initTiles() {
        scene.setTile(TileInternal.Floor, sprites.castle.tilePath5);
        scene.setTile(TileInternal.Hole, img`
            d d d d d d d d d d d d d d d d
            d d d f f f f f f f f f f d d d
            d d f f f f f f f f f f f f d d
            d f f f f f f f f f f f f f f d
            d f f f f f f f f f f f f f f d
            d f f f f f f f f f f f f f f d
            d f f f f f f f f f f f f f f d
            d f f f f f f f f f f f f f f d
            d f f f f f f f f f f f f f f d
            d f f f f f f f f f f f f f f d
            d f f f f f f f f f f f f f f d
            d f f f f f f f f f f f f f f d
            d f f f f f f f f f f f f f f d
            d d f f f f f f f f f f f f d d
            d d d f f f f f f f f f f d d d
            d d d d d d d d d d d d d d d d
            `);
        scene.setTile(TileInternal.Spike, sprites.castle.shrub);

        scene.setTile(TileInternal.Wall, sprites.castle.rock1, true);
        scene.setTile(TileInternal.Object, sprites.castle.rock0, true);
    }

    function initPlayer() {
        const s = sprites.create(sprites.castle.heroWalkFront1, SpriteKind.Player);
        world.player = new Character(s);
        scene.cameraFollowSprite(s);
        controller.moveSprite(s);

        info.setLife(3);
    }

    function initHandlers() {
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Arrow, function (player: Sprite, arrow: Sprite) {
            world.player.takeDamage(arrow.x, arrow.y);
        })
    }

    export class World {
        player: Character;
        triggers: Trigger[];

        constructor() {
        }

        update() {
            this.checkTriggers();
        }

        loadRoom(room: Room, enteringFrom?: Direction) {
            this.triggers = [];
            scene.setBackgroundColor(Math.randomRange(2, 14))

            let tilemap = image.create(room.width + 2, room.height + 2);
            tilemap.fill(TileInternal.Wall);

            for (let col = 0; col < room.width; col++) {
                for (let row = 0; row < room.height; row++) {
                    const data: RoomTile = room.data.getPixel(col, row);

                    let tile: TileInternal;

                    switch (data) {
                        case RoomTile.Empty:
                            tile = TileInternal.Hole;
                            break;
                        case RoomTile.Normal:
                            tile = TileInternal.Floor;
                            break;
                        case RoomTile.Wall:
                            tile = TileInternal.Wall;
                            break;
                        case RoomTile.Treasure:
                            tile = TileInternal.Object;
                            break;
                        case RoomTile.EnemySpawn:
                            tile = TileInternal.Floor;
                            break;
                        case RoomTile.SpikeTrap:
                            tile = TileInternal.Spike;
                            break;
                        case RoomTile.Door:
                            tile = TileInternal.DoorNorth;
                            break;
                        case RoomTile.ArrowNorth:
                            tile = TileInternal.Object;
                            this.createArrowLauncher(col, row, Direction.North, room.data);
                            break;
                        case RoomTile.ArrowEast:
                            tile = TileInternal.Object;
                            this.createArrowLauncher(col, row, Direction.East, room.data);
                            break;
                        case RoomTile.ArrowSouth:
                            tile = TileInternal.Object;
                            this.createArrowLauncher(col, row, Direction.South, room.data);
                            break;
                        case RoomTile.ArrowWest:
                            tile = TileInternal.Object;
                            this.createArrowLauncher(col, row, Direction.West, room.data);
                            break;
                        case RoomTile.FlameNorth:
                            tile = TileInternal.Object;
                            break;
                        case RoomTile.FlameEast:
                            tile = TileInternal.Object;
                            break;
                        case RoomTile.FlameSouth:
                            tile = TileInternal.Object;
                            break;
                        case RoomTile.FlameWest:
                            tile = TileInternal.Object;
                            break;
                    }

                    tilemap.setPixel(col + 1, row + 1, tile);
                }
            }

            if (room.north) this.createDoorway(Direction.North, room.north, tilemap);
            if (room.east) this.createDoorway(Direction.East, room.east, tilemap);
            if (room.south) this.createDoorway(Direction.South, room.south, tilemap);
            if (room.west) this.createDoorway(Direction.West, room.west, tilemap);

            scene.setTileMap(tilemap);

            if (enteringFrom != undefined) {
                // Move the player to the doorway
                const col = getDoorCol(enteringFrom, tilemap.width);
                const row = getDoorRow(enteringFrom, tilemap.height);
                this.player.sprite.x = (col << 4) + 8;
                this.player.sprite.y = (row << 4) + 8
            }
        }

        protected checkTriggers() {
            if (this.triggers) {
                const toRemove: Trigger[] = [];
                let current: Trigger;

                for (let i = 0; i < this.triggers.length; i++) {
                    current = this.triggers[i];
                    if (current.check(this.player)) {
                        toRemove.push(current);
                        if (current.action) {
                            current.action();
                        }
                    }
                }

                while (toRemove.length) this.triggers.removeElement(toRemove.shift());
            }
        }

        protected createArrowLauncher(col: number, row: number, direction: Direction, map: Image) {
            const trigger = createRayTrigger(col, row, direction, map);
            const sprite = sprites.create(assets.launcher[direction], SpriteKind.Launcher);
            sprite.left = (col + 1) << 4;
            sprite.top = (row + 1) << 4;
            sprite.setFlag(SpriteFlag.Ghost, true);

            trigger.action = () => {
                const arrowSprite = sprites.create(assets.arrow[direction], SpriteKind.Arrow);
                const arrowSpeed = 100;

                arrowSprite.x = sprite.x;
                arrowSprite.y = sprite.y;

                arrowSprite.setFlag(SpriteFlag.DestroyOnWall, true)

                switch (direction) {
                    case Direction.North:
                        arrowSprite.bottom = sprite.top - 1;
                        arrowSprite.vy = -arrowSpeed;
                        break;
                    case Direction.East:
                        arrowSprite.left = sprite.right + 1;
                        arrowSprite.vx = arrowSpeed;
                        break;
                    case Direction.South:
                        arrowSprite.top = sprite.bottom + 1;
                        arrowSprite.vy = arrowSpeed;
                        break;
                    case Direction.West:
                        arrowSprite.right = sprite.left - 1;
                        arrowSprite.vx = -arrowSpeed;
                        break;
                }
            };

            this.triggers.push(trigger);
        }

        protected createDoorway(direction: Direction, next: Room, tilemap: Image) {
            const col = getDoorCol(direction, tilemap.width);
            const row = getDoorRow(direction, tilemap.height);

            const trigger = new TileTrigger(col, row);
            trigger.action = () => {
                this.loadRoom(next, getOpposite(direction));
            }

            tilemap.setPixel(col, row, TileInternal.DoorNorth);

            this.triggers.push(trigger);
        }
    }

    function getDoorCol(direction: Direction, width: number) {
        switch (direction) {
            case Direction.South:
            case Direction.North:
                return width >> 1;
                break;
            case Direction.East:
                return width - 1;
            case Direction.West:
                return 0;
        }
    }

    function getDoorRow(direction: Direction, height: number) {
        switch (direction) {
            case Direction.East:
            case Direction.West:
                return height >> 1;
                break;
            case Direction.North:
                return 0;
            case Direction.South:
                return height - 1;
        }
    }

    export let world: World;

    function init() {
        if (world) return;

        world = new World();
        initTiles();
        initPlayer();
        initHandlers();

        game.onUpdate(function () {
            world.update();
        });

        if (debug) {
            game.currentScene().eventContext.registerFrameHandler(99, function () {
                if (world.triggers) {
                    for (let i = 0; i < world.triggers.length; i++) {
                        world.triggers[i].drawDebug();
                    }
                }
            })
        }
    }

    export class Room {
        north: Room;
        east: Room;
        south: Room;
        west: Room;

        data: Image;

        constructor(data: Image) {
            this.data = data;
        }

        get width() {
            return this.data.width;
        }

        get height() {
            return this.data.height;
        }
    }

    export function loadRoom(room: Room) {
        init();
        world.loadRoom(room)
    }

    function getOpposite(direction: Direction): Direction {
        return (direction + 2) % 4
    }
}