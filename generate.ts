namespace dungeon {
    export enum TileType {
        Floor,
        WallNorth,
        WallEast,
        WallSouth,
        WallWest,
        WallNorthEast,
        WallSouthEast,
        WallSouthWest,
        WallNorthWest,
        DoorNorthEast,
        DoorSouthEast,
        DoorSouthWest,
        DoorNorthWest,
        Obstacle,
        Pit
    }

    export enum Doors {
        N = 1,
        E = 2,
        S = 4,
        W = 8,
        NE = N | E,
        NW = N | W,
        NS = N | S,
        ES = E | S,
        EW = E | W,
        WS = W | S,
        NES = NE | S,
        NEW = NE | W,
        NWS = NW | S,
        EWS = EW | S,
        NESW = NES | W
    }

    export class Map {
        data: Buffer;
        fr: Math.FastRandom;

        constructor(public width: number, public height: number, seed: number) {
            this.fr = new Math.FastRandom();
            this.data = pins.createBuffer(width * height)
        }

        setRoom(col: number, row: number, value: number) {
            this.data[col + row * this.width] = value;
        }

        getRoom(col: number, row: number) {
            return this.data[col + row * this.width];
        }

        setRoomType(col: number, row: number, flag: RoomFlags) {
            this.setRoom(col, row, (this.getRoom(col, row) & 0xf) | flag);
        }

        getRoomType(col: number, row: number) {
            return (this.getRoom(col, row) & 0xf0)
        }

        hasSingleEntrance(col: number, row: number): RoomFlags {
            const r = this.getRoom(col, row);
            let entrance: RoomFlags = 0;
            if (r & RoomFlags.DoorNorth) {
                entrance = RoomFlags.DoorNorth
            }
            if (r & RoomFlags.DoorEast) {
                if (entrance) return 0
                entrance = RoomFlags.DoorEast
            }
            if (r & RoomFlags.DoorSouth) {
                if (entrance) return 0
                entrance = RoomFlags.DoorSouth
            }
            if (r & RoomFlags.DoorWest) {
                if (entrance) return 0
                entrance = RoomFlags.DoorWest
            }
            return entrance;
        }
    }

    export function createMap(width: number, height: number, seed: number) {
        // Add two to height so that we have room for the entrance and exit
        const floor = new Map(width, height + 2, seed);
        const fr = floor.fr;
        const colors: number[][] = [];

        // Mark the entrance room
        floor.setRoom((width >> 1), height + 1, RoomFlags.DoorNorth)

        // Mark the exit room
        floor.setRoom((width >> 1), 0, RoomFlags.DoorSouth)

        // Make a bunch of random hallways
        for (let c = 0; c < width; c++) {
            colors[c] = [];
            for (let r = 0; r < height; r++) {
                let room = 0;

                while (!room) {
                    if (r && fr.percentChance(10)) {
                        room |= RoomFlags.DoorNorth
                    }
                    if ((c < width - 1) && fr.percentChance(10)) {
                        room |= RoomFlags.DoorEast
                    }
                    if ((r < height - 1) && fr.percentChance(10)) {
                        room |= RoomFlags.DoorSouth
                    }
                    if (c && fr.percentChance(10)) {
                        room |= RoomFlags.DoorWest
                    }
                }

                floor.setRoom(c, 1 + r, room)
            }
        }

        let color = 1;

        // Mirror hallway connections and mark a color for each region
        for (let c = 0; c < width; c++) {
            for (let r = 0; r < height + 2; r++) {
                const room = floor.getRoom(c, r);
                let currentColor;
                if (room) {
                    if (!colors[c][r]) {
                        colors[c][r] = color++;
                    }
                    currentColor = colors[c][r];
                    if (room & RoomFlags.DoorNorth) {
                        linkRoom(colors, floor, c, r - 1, RoomFlags.DoorSouth, currentColor);
                    }
                    if (room & RoomFlags.DoorEast) {
                        linkRoom(colors, floor, c + 1, r, RoomFlags.DoorWest, currentColor);
                    }
                    if (room & RoomFlags.DoorSouth) {
                        linkRoom(colors, floor, c, r + 1, RoomFlags.DoorNorth, currentColor);
                    }
                    if (room & RoomFlags.DoorWest) {
                        linkRoom(colors, floor, c - 1, r, RoomFlags.DoorEast, currentColor);
                    }

                    floor.setRoom(c, r, room)
                }
            }
        }

        // Link all the disconnected regions
        for (let c = 0; c < width; c++) {
            for (let r = 1; r < height + 1; r++) {
                const room = floor.getRoom(c, r);
                if (room) {
                    const color = colors[c][r];

                    if (c && colors[c - 1][r] != color) {
                        floor.setRoom(c, r, room | RoomFlags.DoorWest);
                        linkRoom(colors, floor, c - 1, r, RoomFlags.DoorEast, color);
                    }
                    if (r > 1 && colors[c][r - 1] != color) {
                        floor.setRoom(c, r, room | RoomFlags.DoorNorth);
                        linkRoom(colors, floor, c, r - 1, RoomFlags.DoorSouth, color);
                    }
                }
            }
        }

        addFeatures(floor, 2);

        return floor;
    }

    function linkRoom(colors: number[][], floor: Map, c: number, r: number, flag: RoomFlags, color: number) {
        floor.setRoom(c, r, flag | floor.getRoom(c, r));
        if (!colors[c][r]) {
            colors[c][r] = color;
        }
        else if (colors[c][r] != color) {
            // Unite the two colors
            const old = colors[c][r];
            for (let i = 0; i < colors.length; i++) {
                for (let j = 0; j < colors[i].length; j++) {
                    if (colors[i][j] === old) colors[i][j] = color;
                }
            }
        }
    }

    export function addFeatures(floor: Map, numTreasures: number) {
        const toAdd: RoomFlags[] = [RoomFlags.Key];
        for (let i = 0; i < numTreasures; i++) toAdd.push(RoomFlags.Treasure);

        let c: number;
        let r: number;

        // First pass places features at the end of hallways
        for (c = 0; c < floor.width; c++) {
            for (r = 1; r < floor.height - 1; r++) {

                const entrance = floor.hasSingleEntrance(c, r);
                if (entrance) {
                    floor.setRoomType(c, r, toAdd.removeAt(floor.fr.randomRange(0, toAdd.length - 1)));
                }
            }
        }

        // Place the rest of the features randomly
        while (toAdd.length) {
            c = floor.fr.randomRange(0, floor.width - 1);
            r = floor.fr.randomRange(1, floor.height - 2);

            if (!floor.getRoomType(c, r)) {
                floor.setRoomType(c, r, toAdd.removeAt(floor.fr.randomRange(0, toAdd.length - 1)));
            }
        }
    }

    function getRoom(kind: Doors, fr: Math.FastRandom) {
        return new Room(fr.next() + 1234, kind);
    }

    export function buildMap(map: Map): Room {
        map.fr.reset();

        let rooms: Room[][] = [];

        // Create rooms
        for (let c = 0; c < map.width; c++) {
            rooms[c] = [];
            for (let r = 0; r < map.height; r++) {
                rooms[c][r] = getRoom(map.getRoom(c, r), map.fr);
            }
        }

        for (let c = 0; c < map.width; c++) {
            for (let r = 0; r < map.height; r++) {
                const room = rooms[c][r];
                if (room) {
                    if (map.getRoom(c, r) & RoomFlags.DoorEast) {
                        room.east = rooms[c + 1][r];
                        rooms[c + 1][r].west = room;
                    }
                    if (map.getRoom(c, r) & RoomFlags.DoorSouth) {
                        room.south = rooms[c][r + 1];
                        rooms[c][r + 1].north = room;
                    }
                }
            }
        }

        return rooms[map.width >> 1][map.height - 1];
    }
}