namespace dungeon {
    export enum Direction {
        North,
        East,
        South,
        West
    }

    export enum CharacterFlag {
        FacingNorth = 1 << 0,
        FacingEast = 1 << 1,
        FacingSouth = 1 << 2,
        FacingWest = 1 << 3,

        // Character action
        Idle = 1 << 4,
        Walking = 1 << 5,
        Damaged = 1 << 7,
        Attacking = 1 << 6,
        Falling = 1 << 8,


        // Masks
        NoMovement = Attacking | Falling
    }

    const attackAnimationInterval = 100;
    const walkSpeed = 100;

    export class Effect {
        target: Character;
        endTime: number;

        constructor(target: Character) {
            this.target = target;
        }

        onUpdate(time: number) {
        }

        dispose() {
        }
    }

    export class BumpEffect extends Effect {
        vx: number;
        vy: number;

        constructor(target: Character, sourceX: number, sourceY: number) {
            super(target);

            const angle = Math.atan2(target.sprite.y - sourceY, target.sprite.x - sourceX);
            this.vx = walkSpeed * Math.cos(angle);
            this.vy = walkSpeed * Math.sin(angle);

            this.endTime = control.millis() + 200;
        }

        onUpdate(time: number) {
            // Override the player velocity
            this.target.sprite.vx = this.vx;
            this.target.sprite.vy = this.vy;
        }
    }

    export class InvulnerableEffect extends Effect {
        private lastImage: Image;
        constructor(target: Character) {
            super(target);

            this.endTime = control.millis() + 500;
            this.target.invincible = true;
        }

        onUpdate(time: number) {
            if (Math.idiv(time, 100) % 2) {
                this.lastImage = this.target.sprite.image;
                let i = this.lastImage.clone();
                i.replace(2, 1)
                this.target.sprite.setImage(i);
            }
        }

        dispose() {
            this.target.invincible = false;
            this.target.sprite.setImage(this.lastImage)
        }
    }


    export class Character {
        sprite: Sprite;
        flags: CharacterFlag;
        effects: Effect[];

        invincible: boolean;
        animationEndTime: number;

        constructor(s: Sprite) {
            this.sprite = s;
            this.effects = [];

            initAnimations(s);

            game.onUpdate(() => {
                this.update();
            })

            this.flags = CharacterFlag.Idle | CharacterFlag.FacingSouth;
        }

        update() {
            const time = control.millis();
            if (time > this.animationEndTime) {
                this.animationEndTime = undefined;

                // Keep the direction, but remove the state
                this.flags = this.flags & 0xf;
            }
            else if (controller.A.isPressed()) {
                this.setFlags((this.flags & 0xf) | CharacterFlag.Attacking);
            }


            // If we are animating, ignore controls
            if (!(this.flags & CharacterFlag.NoMovement)) {
                this.updateMovement();
            }

            // Effects get applied last
            this.updateEffects(time);
        }

        protected updateMovement() {
            let dx = 0;
            let dy = 0;
            let newState = 0;

            // Instead of checking the velocity, we check the input directly
            if (controller.up.isPressed()) dy -= 1;
            if (controller.down.isPressed()) dy += 1;
            if (controller.right.isPressed()) dx += 1;
            if (controller.left.isPressed()) dx -= 1;

            if (dx || dy) {
                newState |= CharacterFlag.Walking;

                // Choose a direction to face
                if (dx > 0) newState |= CharacterFlag.FacingEast;
                else if (dx < 0) newState |= CharacterFlag.FacingWest;
                else if (dy > 0) newState |= CharacterFlag.FacingSouth;
                else if (dy < 0) newState |= CharacterFlag.FacingNorth;
            }
            else {
                // Keep the direction we're facing, but set flag as idle
                newState |= (this.flags & 0xf | CharacterFlag.Idle);
            }

            this.sprite.vx = walkSpeed * dx;
            this.sprite.vy = walkSpeed * dy;

            this.setFlags(newState);
        }

        protected updateEffects(time: number) {
            if (this.effects) {
                let current: Effect;
                let toRemove: Effect[] = [];
                for (let i = 0; i < this.effects.length; i++) {
                    current = this.effects[i];
                    if (current.endTime < time) {
                        toRemove.push(current);
                        current.dispose();
                    }
                    else {
                        current.onUpdate(time)
                    }
                }
                while (toRemove.length) this.effects.removeElement(toRemove.pop());
            }
        }

        takeDamage(sourceX: number, sourceY: number) {
            if (!this.invincible) {
                this.addEffect(new BumpEffect(this, sourceX, sourceY));
                this.addEffect(new InvulnerableEffect(this));
            }
        }


        setFlags(newState: number) {
            if (newState != this.flags) {
                // Update animation
                animation.setAction(this.sprite, newState);
                this.flags = newState;

                if (newState & CharacterFlag.NoMovement) {
                    this.animationEndTime = control.millis() + (attackAnimationInterval << 2);
                }
            }
        }

        addEffect(effect: Effect) {
            if (!this.effects) this.effects = [];
            this.effects.push(effect);
        }
    }

    export function initAnimations(sprite: Sprite) {
        const walkInterval = 100;
        const walkEast = animation.createAnimation(CharacterFlag.FacingEast | CharacterFlag.Walking, walkInterval);
        walkEast.frames = [
            sprites.castle.heroWalkSideRight1,
            sprites.castle.heroWalkSideRight2,
            sprites.castle.heroWalkSideRight3,
            sprites.castle.heroWalkSideRight4
        ];
        animation.attachAnimation(sprite, walkEast);

        const walkWest = animation.createAnimation(CharacterFlag.FacingWest | CharacterFlag.Walking, walkInterval);
        walkWest.frames = [
            sprites.castle.heroWalkSideLeft1,
            sprites.castle.heroWalkSideLeft2,
            sprites.castle.heroWalkSideLeft3,
            sprites.castle.heroWalkSideLeft4
        ];
        animation.attachAnimation(sprite, walkWest);

        const walkNorth = animation.createAnimation(CharacterFlag.FacingNorth | CharacterFlag.Walking, walkInterval);
        walkNorth.frames = [
            sprites.castle.heroWalkBack1,
            sprites.castle.heroWalkBack2,
            sprites.castle.heroWalkBack3,
            sprites.castle.heroWalkBack4
        ];
        animation.attachAnimation(sprite, walkNorth);

        const walkSouth = animation.createAnimation(CharacterFlag.FacingSouth | CharacterFlag.Walking, walkInterval);
        walkSouth.frames = [
            sprites.castle.heroWalkFront1,
            sprites.castle.heroWalkFront2,
            sprites.castle.heroWalkFront3,
            sprites.castle.heroWalkFront4
        ];
        animation.attachAnimation(sprite, walkSouth);

        const idleEast = animation.createAnimation(CharacterFlag.FacingEast | CharacterFlag.Idle, walkInterval);
        idleEast.frames = [walkEast.frames[0]];
        animation.attachAnimation(sprite, idleEast);

        const idleWest = animation.createAnimation(CharacterFlag.FacingWest | CharacterFlag.Idle, walkInterval);
        idleWest.frames = [walkWest.frames[0]];
        animation.attachAnimation(sprite, idleWest);

        const idleNorth = animation.createAnimation(CharacterFlag.FacingNorth | CharacterFlag.Idle, walkInterval);
        idleNorth.frames = [walkNorth.frames[0]];
        animation.attachAnimation(sprite, idleNorth);

        const idleSouth = animation.createAnimation(CharacterFlag.FacingSouth | CharacterFlag.Idle, walkInterval);
        idleSouth.frames = [walkSouth.frames[0]];
        animation.attachAnimation(sprite, idleSouth);

        const attackEast = animation.createAnimation(CharacterFlag.FacingEast | CharacterFlag.Attacking, attackAnimationInterval);
        attackEast.frames = [
            sprites.castle.heroSideAttackRight1,
            sprites.castle.heroSideAttackRight2,
            sprites.castle.heroSideAttackRight3,
            sprites.castle.heroSideAttackRight4
        ];
        animation.attachAnimation(sprite, attackEast);

        const attackWest = animation.createAnimation(CharacterFlag.FacingWest | CharacterFlag.Attacking, attackAnimationInterval);
        attackWest.frames = [
            sprites.castle.heroSideAttackLeft1,
            sprites.castle.heroSideAttackLeft2,
            sprites.castle.heroSideAttackLeft3,
            sprites.castle.heroSideAttackLeft4
        ];
        animation.attachAnimation(sprite, attackWest);

        const attackSouth = animation.createAnimation(CharacterFlag.FacingSouth | CharacterFlag.Attacking, attackAnimationInterval);
        attackSouth.frames = [
            sprites.castle.heroFrontAttack1,
            sprites.castle.heroFrontAttack2,
            sprites.castle.heroFrontAttack3,
            sprites.castle.heroFrontAttack4
        ];
        animation.attachAnimation(sprite, attackSouth);
    }
}

// scene.setBackgroundColor(1)

// const s = sprites.create(sprites.castle.heroFrontAttack1, 1);
// const c = new dungeon.Character(s);

// controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
//     c.takeDamage(160, 120)
// })

