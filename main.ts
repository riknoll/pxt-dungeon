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