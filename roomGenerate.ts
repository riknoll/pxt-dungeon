namespace dungeon {
    export function init_rooms_spikes() {

        addRoom(Doors.E, image.ofBuffer(hex`e40805005500050005000500050005000500050005000500050005000500050055550500`));

        addRoom(Doors.S, image.ofBuffer(hex`e40805005555050005000500050005000500000005000000050005000500050055550500`));

        addRoom(Doors.ES, image.ofBuffer(hex`e40805005555050055550500555505005500000055000000550005005500050055000500`));

        addRoom(Doors.NW, image.ofBuffer(hex`e40805005500050055000500550005000000050000000500555505005555050055550500`));

        addRoom(Doors.NS, image.ofBuffer(hex`e40805005555050055550500555505000000000000000000555505005555050055550500`));

        addRoom(Doors.EW, image.ofBuffer(hex`e40805005500050055000500550005005500050055000500550005005500050055000500`));

        addRoom(Doors.NEW, image.ofBuffer(hex`e40805005500050055000500550005000000050000000500550005005500050055000500`));

        addRoom(Doors.EWS, image.ofBuffer(hex`e40805005500050055000500550005005500000055000000550005005500050055000500`));

        addRoom(Doors.NES, image.ofBuffer(hex`e40805005555050055550500555505000000000000000000550005005500050055000500`));

        addRoom(Doors.NESW, image.ofBuffer(hex`e40805005500050055000500550005000000000000000000550005005500050055000500`));

    }

    init_rooms_spikes();
}
