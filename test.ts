let arrowTest = img`
    1 1 8 1 1 8 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 9
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 4 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 4 2 1 1 1 1 1 1 9
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    e 1 2 1 1 2 1 5 5 1 1 2 1 1 2 1
    1 1 1 1 1 1 1 5 5 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    7 1 1 1 1 1 1 1 2 0 0 0 1 1 1 1
    1 1 1 1 1 1 1 1 1 0 0 0 1 1 1 1
    1 1 1 1 1 1 1 1 1 0 0 0 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    7 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 6 1 1 6 1
`;



const startRoom = new dungeon.Room(arrowTest);
const nextRoom = new dungeon.Room(arrowTest);

startRoom.north = nextRoom;
nextRoom.south = startRoom;

dungeon.loadRoom(startRoom)