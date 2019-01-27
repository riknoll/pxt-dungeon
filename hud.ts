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
}