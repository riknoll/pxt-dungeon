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

    /**
     * Creates an empty room with walls on all sides
     */
    export function emptyWalledRoom() {
        const room = image.create(10, 7);

        // Draw walls
        room.drawLine(0, 0, room.width - 1, 0, TileType.WallNorth)
        room.drawLine(0, room.height - 1, room.width - 1, room.height - 1, TileType.WallSouth)
        room.drawLine(0, 0, 0, room.height - 1, TileType.WallWest)
        room.drawLine(room.width - 1, 0, room.width - 1, room.height - 1, TileType.WallEast)

        // Set corners
        room.setPixel(0, 0, TileType.WallNorthWest)
        room.setPixel(0, room.height - 1, TileType.WallSouthWest)
        room.setPixel(room.width - 1, 0, TileType.WallNorthEast)
        room.setPixel(room.width - 1, room.height - 1, TileType.WallSouthEast)

        return room;
    }

    export function placeDoor(room: Image, direction: RoomFlags) {
        switch (direction) {
            case RoomFlags.DoorNorth:
                room.setPixel(room.width >> 1, 0, TileType.DoorNorthEast);
                room.setPixel((room.width >> 1) - 1, 0, TileType.DoorNorthWest);
                break;
            case RoomFlags.DoorEast:
                room.setPixel(room.width - 1, (room.height >> 1), TileType.DoorNorthEast);
                room.setPixel(room.width - 1, (room.height >> 1) + 1, TileType.DoorSouthEast);
                break;
            case RoomFlags.DoorSouth:
                room.setPixel((room.width >> 1), room.height - 1, TileType.DoorSouthEast);
                room.setPixel((room.width >> 1) - 1, room.height - 1, TileType.DoorSouthWest);
                break;
            case RoomFlags.DoorWest:
                room.setPixel(0, (room.height >> 1), TileType.DoorNorthWest);
                room.setPixel(0, (room.height >> 1) + 1, TileType.DoorSouthWest);
                break;

        }
    }

    export function initTiles() {
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


    enum RoomFlags {
        DoorNorth = 1,
        DoorEast = 1 << 1,
        DoorSouth = 1 << 2,
        DoorWest = 1 << 3,
        Treasure = 1 << 4,
        Key = 1 << 5,
        EnemyTrap = 1 << 6
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

    class Point {
        constructor(public x: number, public y: number, public color = 1) { }
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
        let room = 0;
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

    export function drawMap(floor: Map, dest: Image) {
        let room: number;
        for (let c = 0; c < floor.width; c++) {
            for (let r = 0; r < floor.height; r++) {
                room = floor.getRoom(c, r);
                if (room) {
                    dest.fillRect(1 + c * 6, 1 + r * 6, 4, 4, colorForRoom(floor.getRoomType(c, r)))
                    if (room & RoomFlags.DoorNorth) {
                        dest.fillRect(2 + c * 6, r * 6, 2, 1, 1)
                    }
                    if (room & RoomFlags.DoorEast) {
                        dest.fillRect(5 + c * 6, 2 + r * 6, 1, 2, 1)
                    }
                    if (room & RoomFlags.DoorSouth) {
                        dest.fillRect(2 + c * 6, 5 + r * 6, 2, 1, 1)
                    }
                    if (room & RoomFlags.DoorWest) {
                        dest.fillRect(c * 6, 2 + r * 6, 1, 2, 1)
                    }
                }
            }
        }
    }

    function colorForRoom(f: RoomFlags) {
        switch (f) {
            case RoomFlags.Key: return 5;
            case RoomFlags.Treasure: return 14;
            default: return 3;
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

    export const ROOM_WIDTH = 10;
    export const ROOM_HEIGHT = 7;

    export class Room {
        fr: Math.FastRandom;

        protected _data: Image;
        protected _map: Image;

        north: Room;
        east: Room;
        south: Room;
        west: Room;

        constructor(seed: number, public layout: Doors) {
            this.fr = new Math.FastRandom(seed);
        }

        get data(): Image {
            if (!this._data) this.generate();
            return this._data;
        }

        get map(): Image {
            if (!this._map) this.generate();
            return this._map;
        }

        generate() {
            this.fr.reset();

            // The tilemap for this room
            this._map = emptyWalledRoom();
            placeDoors(this._map, this.layout);

            // The interior of the room. Smaller because we don't need
            // to store the border
            this._data = getRoomInterior(this.layout & 0xf, this.fr);
        }

        unload() {
            this._data = undefined;
            this._map = undefined;
        }
    }

    function placeDoors(room: Image, kind: Doors) {
        if (kind & RoomFlags.DoorNorth) placeDoor(room, RoomFlags.DoorNorth);
        if (kind & RoomFlags.DoorEast) placeDoor(room, RoomFlags.DoorEast);
        if (kind & RoomFlags.DoorSouth) placeDoor(room, RoomFlags.DoorSouth);
        if (kind & RoomFlags.DoorWest) placeDoor(room, RoomFlags.DoorWest);
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

    let templates: Image[][];

    export function addRoom(kind: Doors, room: Image) {
        if (!templates) templates = [];
        if (!templates[kind]) templates[kind] = [];
        templates[kind].push(room);
    }

    function getRoom(kind: Doors, fr: Math.FastRandom) {
        return new Room(fr.next() + 1234, kind);
    }

    function getRoomInterior(kind: Doors, fr: Math.FastRandom) {
        let flip: boolean;
        switch (kind) {
            case Doors.W:
                flip = true;
                kind = Doors.E;
                break;
            case Doors.N:
                flip = true;
                kind = Doors.S;
                break;
            case Doors.WS:
                flip = true;
                kind = Doors.ES;
                break;
            case Doors.NE:
                flip = true;
                kind = Doors.NW;
                break;
            case Doors.NWS:
                flip = true;
                kind = Doors.NES;
                break;
            default:
                flip = false;
        }

        const possible = templates[kind];
        const template = possible[fr.randomRange(0, possible.length - 1)];

        if (flip) {
            const res = template.clone();
            if (kind === Doors.S) {
                res.flipY();
            }
            else {
                res.flipX();
            }
            return res;
        }
        else {
            return template;
        }
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
}