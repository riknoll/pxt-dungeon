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

    export function makeSpikeTrap() {
        const kf = new KeyFrameAnimation();
        kf.addStep(0, assets.spikeTrap1);
        kf.addStep(500, assets.spikeTrap2);
        kf.addStep(510, assets.spikeTrap3);
        kf.addStep(520, assets.spikeTrap4);
        kf.addStep(530, assets.spikeTrap5);
        kf.addStep(540, assets.spikeTrap4);
        kf.addStep(550, assets.spikeTrap3);
        kf.addStep(560, assets.spikeTrap2);
        kf.addStep(570, assets.spikeTrap1);
        kf.addStep(580, assets.spikeTrap0);
        kf.addStep(600, null);

        kf.target = sprites.create(assets.spikeTrap0, SpriteKind.SpikeTrap);
        kf.target.setFlag(SpriteFlag.Ghost, true);

        return kf;
    }

    export function makeFallingAnimation() {
        const kf = new KeyFrameAnimation();
        kf.addStep(0, sprites.castle.heroWalkFront1);
        kf.addStep(50, assets.heroFall0);
        kf.addStep(100, assets.heroFall1);
        kf.addStep(150, assets.heroFall2);
        kf.addStep(200, assets.heroFall3);
        kf.addStep(250, assets.heroFall4);
        kf.addStep(300, assets.heroFall5);
        kf.addStep(350, null);

        return kf;
    }

    // export class LinearAnimation implements Updater {
    //     v0: number;
    //     v1: number;
    //     rate: number;
        
    //     protected startTime: number;

    //     running: boolean;

    //     start() {
    //         this.running = true;
    //         this.startTime = control.millis();
    //     }

    //     isRunning() {
    //         return this.running;
    //     }

    //     update(time: number) {
    //         if (this.running) {
                
    //             const v = this.v0 + ((this.rate * (time - this.startTime)) << 4);
    //             this.updateValue(v);
    //         }
    //     }

    //     protected updateValue(v: number) {
    //         // subclass
    //     }

    // }
} 