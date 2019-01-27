namespace dungeon {
    export class KeyFrameAnimation implements Updater {
        protected frames: Image[];
        protected offsets: number[];

        startTime: number;
        index: number;

        target: Sprite;

        constructor() {
            this.frames = [];
            this.offsets = [];
        }

        start() {
            if (!this.frames.length) return;
            this.startTime = control.millis();
            this.index = 0;
            this.target.setImage(this.frames[0]);
            world.addUpdater(this);
        }

        isRunning() {
            return this.index != undefined;
        }

        addStep(timeOffset: number, frame: Image) {
            if (frame) this.frames.push(frame);
            this.offsets.push(timeOffset);
        }

        update(time: number) {
            if (this.isRunning()) {
                if (this.offsets[this.index + 1] < time - this.startTime) {
                    ++this.index;
                    if (this.index >= this.frames.length) {
                        this.target.setImage(this.frames[this.frames.length - 1]);
                        this.startTime = undefined;
                        this.index = undefined;
                        this.target.setFlag(SpriteFlag.Ghost, true);
                        return;
                    }
                    else {
                        this.target.setFlag(SpriteFlag.Ghost, false);
                        this.target.setImage(this.frames[this.index]);
                    }
                }
            }
        }
    }
}