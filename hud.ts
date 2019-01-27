namespace dungeon {
    const heartImage = img`
        f 1 f 1 f
        1 3 1 3 1
        1 3 3 3 1
        f 1 3 1 f
        f f 1 f f
    `;

    export function initHud() {
        game.currentScene().eventContext.registerFrameHandler(100, function () {
            drawInfoBar();
        })
    }

    export function drawInfoBar() {
        screen.fillRect(0, screen.height - 8, screen.width, 8, 15);
        if (!world) return;

        const seconds = Math.idiv(control.millis(), 1000);
        screen.print(formatTime(Math.idiv(seconds, 60), seconds % 60), 130, 114, 1, image.font5)

        for (let i = 0; i < world.playerHealth; i++) {
            screen.drawImage(heartImage, 1 + i * 7, 114)
        }
    }

    function formatTime(minutes: number, seconds: number) {
        return (minutes < 10 ? "0" + minutes : minutes.toString()) + ":" + (seconds < 10 ? "0" + seconds : seconds.toString());
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
}