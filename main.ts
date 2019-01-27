namespace dungeon {
    export let world: World;

    export function loadRoom(room: Room) {
        init();
        world.loadRoom(room)
    }

    function init() {
        if (world) return;

        world = new World();
        initPlayer();
        initHandlers();
        initHud();
        initTiles();

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

    function initTiles() {
        scene.setTile(TileType.WallNorthWest, projectImages.dungeon_tiles_15, true);
        scene.setTile(TileType.WallWest, projectImages.dungeon_tiles_16, true);
        scene.setTile(TileType.WallSouthWest, projectImages.dungeon_tiles_17, true);
        scene.setTile(TileType.WallNorth, projectImages.dungeon_tiles_21, true);
        scene.setTile(TileType.Floor, projectImages.dungeon_tiles_22, false);
        scene.setTile(TileType.WallSouth, projectImages.dungeon_tiles_23, true);
        scene.setTile(TileType.WallNorthEast, projectImages.dungeon_tiles_27, true);
        scene.setTile(TileType.WallEast, projectImages.dungeon_tiles_28, true);
        scene.setTile(TileType.WallSouthEast, projectImages.dungeon_tiles_29, true);
        scene.setTile(TileType.DoorSouthEast, projectImages.dungeon_tiles_51, false);
        scene.setTile(TileType.DoorNorthEast, projectImages.dungeon_tiles_53, false);
        scene.setTile(TileType.DoorSouthWest, projectImages.dungeon_tiles_63, false);
        scene.setTile(TileType.DoorNorthWest, projectImages.dungeon_tiles_65, false);
        scene.setTile(TileType.Obstacle, projectImages.dungeon_tiles_22, true);
    }
}




controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {

})