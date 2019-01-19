namespace dungeon {
    const ditherLevels = 3;
    let ditherImages: Image[];

    function init() {
        if (!ditherImages) ditherImages = [];
        for (let i = 0; i < ditherLevels; i++) {
            const di = image.create(16, 16);

            for (let c = 0; c < di.width; c++) {
                for (let r = 0; r < di.height; r++) {

                    switch (i) {
                        case 0:
                            if ((c & 1) && (r & 1)) {
                                di.setPixel(c, r, 15)
                            }
                            break;
                        case 1:
                            if ((c + r) & 1) {
                                di.setPixel(c, r, 15)
                            }
                            break;

                        case 2:
                            if ((c & 1) || (r & 1)) {
                                di.setPixel(c, r, 15)
                            }
                            break;
                    }
                }
            }

            ditherImages.push(di);
        }

        game.currentScene().eventContext.registerFrameHandler(99, function () {
            if (!world || !world.player) return;
            const camera = game.currentScene().camera;
            const cx = (world.player.sprite.x - camera.offsetX) >> 4;
            const cy = (world.player.sprite.y - camera.offsetY) >> 4;

            for (let c = 0; c < 10; c++) {
                for (let r = 0; r < 8; r++) {
                    const index = Math.floor(distance(cx, cy, c, r)) - 2;
                    if (index >= 0 && index < ditherLevels) {
                        screen.drawTransparentImage(ditherImages[index], c << 4, r << 4)
                    }
                    else if (index >= ditherLevels) {
                        screen.fillRect(c << 4, r << 4, 16, 16, 15)
                    }
                }
            }
        })

        function distance(x0: number, y0: number, x1: number, y1: number) {
            return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        }
    }

    // init();
}