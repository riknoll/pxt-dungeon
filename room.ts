// Add your code here
namespace dungeon {
    export enum RoomFlags {
        DoorNorth = 1,
        DoorEast = 1 << 1,
        DoorSouth = 1 << 2,
        DoorWest = 1 << 3,
        Treasure = 1 << 4,
        Key = 1 << 5,
        EnemyTrap = 1 << 6
    }

    export const ROOM_WIDTH = 10;
    export const ROOM_HEIGHT = 7;

    export class Room {
        fr: Math.FastRandom;

        protected _data: Image;
        protected _map: Image;

        cleared: boolean;

        north: Room;
        east: Room;
        south: Room;
        west: Room;

        constructor(seed: number, public layout: Doors) {
            this.fr = new Math.FastRandom(seed);
            this.cleared = false;
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

    export function placeDoors(room: Image, kind: Doors) {
        if (kind & RoomFlags.DoorNorth) placeDoor(room, RoomFlags.DoorNorth);
        if (kind & RoomFlags.DoorEast) placeDoor(room, RoomFlags.DoorEast);
        if (kind & RoomFlags.DoorSouth) placeDoor(room, RoomFlags.DoorSouth);
        if (kind & RoomFlags.DoorWest) placeDoor(room, RoomFlags.DoorWest);
    }

    let templates: Image[][];

    export function addRoom(kind: Doors, room: Image) {
        if (!templates) templates = [];
        if (!templates[kind]) templates[kind] = [];
        templates[kind].push(room);
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
}