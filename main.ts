// namespace lighting {
//     const lightRings = 4;
//     const bandWidth = 10;
//     const centerRadius = 8;

//     const byteHeight = ((screen.height * 4 + 31) >> 5) << 2;
//     let lightTable: Buffer;
//     // let screenBuffer: Buffer;
//     // let si: Image;

//     const palette_ramps = image.ofBuffer(hex`e4100400ffff0000d1cb0000a2ff0000b3fc0000e4fc000045ce000086fc000067c80000c8ff000069c80000bafc0000cbff0000fcff0000bdfc0000ceff0000ffff0000`);
//     const fr = new Math.FastRandom();

//     export function init() {
//         const halfh = (centerRadius * 2 + lightRings * 2 * bandWidth) >> 1;
//         lightTable = pins.createBuffer((lightRings + 1) * halfh);

//         // screenBuffer = pins.createBuffer(4 + screen.width * byteHeight);
//         // screenBuffer[0] = 0xe4;
//         // screenBuffer[1] = screen.width;
//         // screenBuffer[2] = screen.height;

//         // si = image.ofBuffer(screenBuffer);
//         // si.fill(7)


//         // Approach is roughly based on https://hackernoon.com/pico-8-lighting-part-1-thin-dark-line-8ea15d21fed7
//         let x: number;
//         let band: number;
//         let y2: number;
//         for (let y = 0; y < halfh; y++) {
//             y2 = Math.pow(y, 2);
//             // Store the offsets where the bands switch light levels for each row. We only need to
//             // do one quadrant which we can mirror in x/y
//             for (band = 0; band < lightRings; band++) {
//                 x = Math.sqrt(Math.pow(centerRadius + bandWidth * (band + 1), 2) - y2) | 0;
//                 lightTable[y * lightRings + band] = x;
//             }
//         }

//         game.eventContext().registerFrameHandler(99, function () {
//             if (dungeon.world) applyLighting(dungeon.world.player.sprite.x, dungeon.world.player.sprite.y);
//         })
//     }

//     function applyLighting(cx: number, cy: number) {
//         const camera = game.currentScene().camera;
//         const halfh = centerRadius * 2 + lightRings * 2 * bandWidth;
//         let offset: number;
//         let next: number;
//         let band: number;
//         let x: number;
//         let y: number;
//         cx -= camera.offsetX;
//         cy -= camera.offsetY;

//         // si.drawImage(screen, 0, 0)
//         // screenBuffer = image.toBuffer(screen);

//         // let index;
//         // let current: number;
//         // band = 3;
//         // for (index = 4; index < screenBuffer.length; index += byteHeight) {
//         //     for (y = 0; y < byteHeight; y++) {
//         //         current = screenBuffer[index + y];
//         //         screenBuffer[index + y] = colorRamps[(current & 0xf) + (band << 4)] | (colorRamps[((current >> 4) & 0xf) + (band << 4)] << 4)
//         //     }
//         // }


//         for (y = 0; y < halfh; y++) {
//             band = lightRings;
//             offset = cx - lightTable[y * lightRings + band - 1]

//             for (x = 0; band > 0; x++) {
//                 screen.setPixel(x, cy + y, palette_ramps.getPixel(screen.getPixel(x, cy + y), band))
//                 screen.setPixel(screen.width - x, cy + y, palette_ramps.getPixel(screen.getPixel(screen.width - x, cy + y), band))
//                 screen.setPixel(x, cy - y, palette_ramps.getPixel(screen.getPixel(x, cy - y), band))
//                 screen.setPixel(screen.width - x, cy - y, palette_ramps.getPixel(screen.getPixel(screen.width - x, cy - y), band))

//                 if (x >= offset) {
//                     band--
//                     offset = cx - lightTable[y * lightRings + band - 1]
//                 }
//             }
//         }

//         // screen.drawImage(si, 0, 0)
//     }
// }

// lighting.init();




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