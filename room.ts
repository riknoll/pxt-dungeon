// Add your code here
namespace dungeon {
    const debug = false;

    export enum SpriteKind {
        Player,
        Sword,
        Arrow,
        Enemy,
        Launcher,
        SpikeTrap
    }

    export enum RoomTile {
        Normal,
        Pit,
        Wall,
        Treasure,
        EnemySpawn,
        SpikeTrap,
        ArrowNorth,
        ArrowEast,
        ArrowSouth,
        ArrowWest,
        Key,
        Health,
        Item,
        Money
    }

    function initPlayer() {
        const s = sprites.create(sprites.castle.heroWalkFront1, SpriteKind.Player);
        world.player = new Character(s);
        scene.cameraFollowSprite(s);
    }

    function initHandlers() {
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Arrow, function (player: Sprite, arrow: Sprite) {
            world.player.takeDamage(arrow.x, arrow.y);
        })
        sprites.onOverlap(SpriteKind.Player, SpriteKind.SpikeTrap, function (player: Sprite, trap: Sprite) {
            world.player.takeDamage(trap.x, trap.y);
        })
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player: Sprite, enemy: Sprite) {
            world.player.takeDamage(enemy.x, enemy.y);
        })
        sprites.onOverlap(SpriteKind.Sword, SpriteKind.Enemy, function (sword: Sprite, enemy: Sprite) {
            let e: Character;
            for (let i = 0; i < world.enemies.length; i++) {
                e = world.enemies[i];
                if (e.sprite === enemy) break;
            }
            if (e) {
                e.takeDamage(world.player.sprite.x, world.player.sprite.y);
            }
        })
        sprites.onOverlap(SpriteKind.Sword, SpriteKind.Arrow, function (sword: Sprite, arrow: Sprite) {
            arrow.destroy();
        })
    }

    export interface Updater {
        update(time: number): void;
        isRunning(): boolean;
    }

    export class World {
        player: Character;
        triggers: Trigger[];
        updaters: Updater[];
        trackedSprites: Sprite[];
        enemies: Character[];

        playerHealth: number;

        map: Image;

        constructor() {
            this.playerHealth = 3;
        }

        update() {
            const time = control.millis();
            this.checkTriggers();
            this.updateChildren(time);
        }

        loadRoom(room: Room, enteringFrom?: Direction) {
            this.cleanUpSprites();
            this.triggers = [];
            this.updaters = [this.player, this.player.sword];
            this.enemies = [];
            scene.setBackgroundColor(13)

            let tilemap = room.map;
            let roomObjects = room.data;

            for (let col = 0; col < roomObjects.width; col++) {
                for (let row = 0; row < roomObjects.height; row++) {
                    const data: RoomTile = roomObjects.getPixel(col, row);

                    let tile: TileType;

                    switch (data) {
                        case RoomTile.Pit:
                            tile = TileType.Pit;
                            break;
                        case RoomTile.Normal:
                        case RoomTile.Wall:
                        case RoomTile.Treasure:
                            break;
                        case RoomTile.EnemySpawn: ;
                            this.createEnemy(col, row)
                            break;
                        case RoomTile.SpikeTrap:
                            this.createSpikeTrap(col, row);
                            break;
                        case RoomTile.ArrowNorth:
                            tile = TileType.Obstacle;
                            this.createArrowLauncher(col, row, Direction.North, room.data);
                            break;
                        case RoomTile.ArrowEast:
                            tile = TileType.Obstacle;
                            this.createArrowLauncher(col, row, Direction.East, room.data);
                            break;
                        case RoomTile.ArrowSouth:
                            tile = TileType.Obstacle;
                            this.createArrowLauncher(col, row, Direction.South, room.data);
                            break;
                        case RoomTile.ArrowWest:
                            tile = TileType.Obstacle;
                            this.createArrowLauncher(col, row, Direction.West, room.data);
                            break;
                        case RoomTile.Key:
                            tile = TileType.Obstacle;
                            break;
                        case RoomTile.Health:
                            tile = TileType.Obstacle;
                            break;
                        case RoomTile.Money:
                            tile = TileType.Obstacle;
                            break;
                        case RoomTile.Item:
                            tile = TileType.Obstacle;
                            break;
                    }

                    if (tile != undefined) {
                        tilemap.setPixel(col + 1, row + 1, tile);
                    }
                }
            }



            if (!room.cleared) {
                const trigger = new TileTrigger(1, 1, 8, 5);
                trigger.action = () => {
                    lockUnlockDoors(true)
                    this.addDoorways(room, tilemap)
                };
                this.triggers.push(trigger);
            }
            else {
                this.addDoorways(room, tilemap);
            }

            this.createPitTriggers(tilemap);

            scene.setTileMap(tilemap);
            this.map = tilemap;
            game.currentScene().tileMap.z = -20;

            if (enteringFrom != undefined) {
                // Move the player to the doorway

                switch (enteringFrom) {
                    case Direction.North:
                        this.player.sprite.x = screen.width >> 1;
                        this.player.sprite.y = 9;
                        break;
                    case Direction.East:
                        this.player.sprite.x = screen.width - 9;
                        this.player.sprite.y = (screen.height - 8) >> 1;
                        break;
                    case Direction.South:
                        this.player.sprite.x = screen.width >> 1;
                        this.player.sprite.y = screen.height - 9;
                        break;
                    case Direction.West:
                        this.player.sprite.x = 9;
                        this.player.sprite.y = (screen.height - 8) >> 1;
                        break;
                }
            }
        }

        addUpdater(u: Updater) {
            if (!this.updaters) return;
            this.updaters.push(u);
        }

        protected addDoorways(room: Room, tilemap: Image) {
            if (room.north) this.createDoorway(Direction.North, room.north, tilemap);
            if (room.east) this.createDoorway(Direction.East, room.east, tilemap);
            if (room.south) this.createDoorway(Direction.South, room.south, tilemap);
            if (room.west) this.createDoorway(Direction.West, room.west, tilemap);
        }

        protected checkTriggers() {
            if (this.triggers) {
                const toRemove: Trigger[] = [];
                let current: Trigger;

                for (let i = 0; i < this.triggers.length; i++) {
                    current = this.triggers[i];
                    if (current.check(this.player)) {
                        if (!current.isEternal) {
                            toRemove.push(current);
                        }
                        if (current.action) {
                            current.action();
                        }
                    }
                }

                while (toRemove.length) this.triggers.removeElement(toRemove.shift());
            }
        }

        protected updateChildren(time: number) {
            if (this.updaters) {
                const toRemove: Updater[] = [];
                let current: Updater;

                for (let i = 0; i < this.updaters.length; i++) {
                    current = this.updaters[i];
                    current.update(time);
                    if (!current.isRunning()) {
                        toRemove.push(current);
                    }
                }

                while (toRemove.length) this.updaters.removeElement(toRemove.shift());
            }
        }

        protected createArrowLauncher(col: number, row: number, direction: Direction, map: Image) {
            const trigger = createRayTrigger(col, row, direction, map);
            const sprite = sprites.create(assets.launcher[direction], SpriteKind.Launcher);
            sprite.left = (col + 1) << 4;
            sprite.top = (row + 1) << 4;
            sprite.setFlag(SpriteFlag.Ghost, true);
            this.trackedSprites.push(sprite);

            trigger.action = () => {
                const arrowSprite = sprites.create(assets.arrow[direction], SpriteKind.Arrow);
                this.trackedSprites.push(arrowSprite);
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

        protected createSpikeTrap(col: number, row: number) {
            const trap = makeSpikeTrap();
            trap.target.left = (col + 1) << 4;
            trap.target.top = (row + 1) << 4;
            trap.target.z = -1;
            this.trackedSprites.push(trap.target);

            const trigger = new MultiTrigger([
                new SimpleTrigger(() => !trap.isRunning()),
                new TileTrigger(col + 1, row + 1)
            ]);

            trigger.isEternal = true;

            trigger.action = () => {
                trap.start();
            };

            this.triggers.push(trigger);
        }

        protected createDoorway(direction: Direction, next: Room, tilemap: Image) {
            let trigger: TileTrigger;
            switch (direction) {
                case Direction.North:
                    trigger = new TileTrigger((ROOM_WIDTH >> 1) - 1, 0, 2, 1);
                    break;
                case Direction.East:
                    trigger = new TileTrigger(ROOM_WIDTH - 1, ROOM_HEIGHT >> 1, 1, 2);
                    break;
                case Direction.South:
                    trigger = new TileTrigger((ROOM_WIDTH >> 1) - 1, ROOM_HEIGHT - 1, 2, 1);
                    break;
                case Direction.West:
                    trigger = new TileTrigger(0, ROOM_HEIGHT >> 1, 1, 2);
                    break;
            }
            trigger.action = () => {
                this.loadRoom(next, getOpposite(direction));
            }

            this.triggers.push(trigger);
        }

        protected createPitTriggers(map: Image) {
            let marked: boolean[] = [];
            let isPit: boolean;
            let index: number;

            let triggers: Trigger[] = [];

            for (let r = 0; r < map.height; r++) {
                for (let c = 0; c < map.width; c++) {
                    index = getIndex(c, r, map.width);

                    if (marked[index]) {
                        continue;
                    }

                    isPit = map.getPixel(c, r) === TileType.Pit;
                    if (isPit) {
                        // Make the biggest rectangle we can
                        marked[index] = true;
                        let width = 0;
                        let height = 0;
                        let running = true;


                        while (running) {
                            width++;
                            height++;

                            for (let i = 0; i < width; i++) {
                                if (marked[getIndex(c + i, r + height, map.width)] || map.getPixel(c + i, r + height) !== TileType.Pit) {
                                    width--;
                                    height--;
                                    running = false;
                                    break;
                                }
                            }

                            for (let i = 0; i < height - 1; i++) {
                                if (marked[getIndex(c + width, r + i, map.width)] || map.getPixel(c + width, r + i) !== TileType.Pit) {
                                    width--;
                                    height--;
                                    running = false;
                                    break;
                                }
                            }
                        }


                        for (let dx = 0; dx < width + 1; dx++) {
                            for (let dy = 0; dy < height + 1; dy++) {
                                marked[getIndex(c + dx, r + dy, map.width)] = true;
                            }
                        }

                        triggers.push(new TileTrigger(c, r, width + 1, height + 1));
                    }
                }
            }

            triggers.forEach(t => {
                t.isEternal = true;
                t.action = () => {
                    world.player.fallDown(world.player.sprite.x >> 4, world.player.sprite.y >> 4)
                };
                this.triggers.push(t);
            });
        }

        protected createEnemy(col: number, row: number) {
            const e = new Enemy(this.player.sprite);
            this.trackedSprites.push(e.sprite);
            e.sprite.x = ((col + 1) << 4) + 8;
            e.sprite.y = ((row + 1) << 4) + 8;
            this.enemies.push(e);
        }

        protected cleanUpSprites() {
            if (this.trackedSprites) {
                for (let i = 0; i < this.trackedSprites.length; i++) {
                    this.trackedSprites[i].destroy();
                }
            }
            this.trackedSprites = [];
        }
    }

    function getIndex(col: number, row: number, width: number) {
        return col + row * width;
    }

    export let world: World;

    function init() {
        if (world) return;

        world = new World();
        initPlayer();
        initHandlers();
        initHud();

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

    export function loadRoom(room: Room) {
        init();
        world.loadRoom(room)
    }

    function getOpposite(direction: Direction): Direction {
        return (direction + 2) % 4
    }
}