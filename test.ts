// let arrowTest = img`
//     1 1 8 1 1 8 1 1 1 1 1 1 1 1 1 1
//     1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 9
//     1 1 1 1 1 1 2 1 2 1 1 1 1 1 1 1
//     1 1 1 1 1 1 2 1 2 1 1 1 1 1 1 1
//     1 1 1 1 1 1 2 1 2 1 1 1 1 1 1 9
//     1 1 1 1 1 1 2 1 2 1 1 1 1 1 1 1
//     1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
//     e 1 2 1 1 2 1 5 5 1 1 2 1 1 2 1
//     1 1 1 1 1 1 1 5 5 1 1 1 1 1 1 1
//     1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
//     7 1 1 1 1 1 1 1 2 0 0 0 1 1 1 1
//     1 1 1 1 1 1 1 1 1 0 0 0 1 1 1 1
//     1 1 1 1 1 1 1 1 1 0 0 0 1 1 1 1
//     1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
//     7 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1
//     1 1 1 1 1 1 1 1 1 1 1 6 1 1 6 1
// `;



// const startRoom = new dungeon.Room(arrowTest);
// const nextRoom = new dungeon.Room(arrowTest);

// startRoom.north = nextRoom;
// nextRoom.south = startRoom;

// dungeon.loadRoom(startRoom)

// let s: Sprite;
// function update() {
//     const f = dungeon.createMap(3, 4, Math.randomRange(1, 9999));

//     if (s) s.destroy();

//     s = sprites.create(image.create(f.width * 6, f.height * 6))
//     dungeon.drawMap(f, s.image);
//     const m = dungeon.buildMap(f)
// }

// update();
// controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
//     update();
// })


const map = dungeon.createMap(3, 4, Math.randomRange(1, 9999));
const entrance = dungeon.buildMap(map);
dungeon.loadRoom(entrance)
dungeon.initTiles();

// dungeon.initTiles();