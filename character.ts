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

    const attackAnimationInterval = 75;
    const walkSpeed = 100;
    const enemySpeed = 40;

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

        private color1: number;
        private color2: number;

        constructor(target: Character, c1 = 2, c2 = 1) {
            super(target);

            this.endTime = control.millis() + 500;
            this.target.invincible = true;
            this.color1 = c1;
            this.color2 = c2;
        }

        onUpdate(time: number) {
            if (Math.idiv(time, 100) % 2) {
                this.lastImage = this.target.sprite.image;
                let i = this.lastImage.clone();
                i.replace(this.color1, this.color2)
                this.target.sprite.setImage(i);
            }
        }

        dispose() {
            this.target.invincible = false;
            this.target.sprite.setImage(this.lastImage)
        }
    }


    export class Character implements Updater {
        sprite: Sprite;
        flags: CharacterFlag;
        effects: Effect[];
        sword: Sword;

        invincible: boolean;
        animationEndTime: number;

        protected lastColumn: number;
        protected lastRow: number;

        constructor(s: Sprite) {
            this.sprite = s;
            this.effects = [];
            this.init();

            world.addUpdater(this)

            this.flags = CharacterFlag.Idle | CharacterFlag.FacingSouth;
        }

        init() {
            initAnimations(this.sprite);
            this.sword = new Sword(this.sprite);
        }

        isRunning() {
            return !!this.sprite;
        }

        update(time: number) {
            this.updatePosition();

            if (time > this.animationEndTime) {
                this.animationEndTime = undefined;
                this.onAnimationEnd();

                // Keep the direction, but remove the state
                this.flags = this.flags & 0xf;
            }
            else {
                this.updateAttack();
            }


            // If we are animating, ignore controls
            if (!(this.flags & CharacterFlag.NoMovement)) {
                this.updateMovement();
            }
            else {
                this.sprite.vx = 0;
                this.sprite.vy = 0;
            }

            // Effects get applied last
            this.updateEffects(time);
        }

        facing() {
            if (this.flags & CharacterFlag.FacingNorth) return Direction.North;
            else if (this.flags & CharacterFlag.FacingEast) return Direction.East;
            else if (this.flags & CharacterFlag.FacingSouth) return Direction.South;
            else return Direction.West;
        }

        protected updateAttack() {
            if (controller.A.isPressed()) {
                this.setFlags((this.flags & 0xf) | CharacterFlag.Attacking);
                if (this.sword) this.sword.swing(this.facing())
            }
        }

        protected updateMovement() {
            let dx = 0;
            let dy = 0;
            let newState = 0;

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

        protected updatePosition() {
            const c = this.sprite.x >> 4;
            const r = this.sprite.y >> 4;

            if ((c != this.lastColumn || r != this.lastRow) && world.map.getPixel(c, r) !== TileType.Pit) {
                this.lastColumn = c;
                this.lastRow = r;
            }
        }

        protected onAnimationEnd() {
            if (this.flags & CharacterFlag.Falling) {
                this.sprite.x = (this.lastColumn << 4) + 8;
                this.sprite.y = (this.lastRow << 4) + 8;
                this.addEffect(new InvulnerableEffect(this));
                this.sprite.setFlag(SpriteFlag.Ghost, false);
            }
        }

        takeDamage(sourceX: number, sourceY: number) {
            if (!this.invincible) {
                this.addEffect(new BumpEffect(this, sourceX, sourceY));
                this.addEffect(new InvulnerableEffect(this));
            }
        }

        fallDown(column: number, row: number) {
            this.setFlags((this.flags & 0xf) | CharacterFlag.Falling);
            this.sprite.x = (column << 4) + 8;
            this.sprite.y = (row << 4) + 8;
        }


        setFlags(newState: number) {
            if (newState != this.flags) {
                // Update animation
                animation.setAction(this.sprite, newState);
                this.flags = newState;

                if (newState & CharacterFlag.Attacking) {
                    this.animationEndTime = control.millis() + (attackAnimationInterval << 2);
                }

                if (newState & CharacterFlag.Falling) {
                    this.animationEndTime = control.millis() + 1000;
                    const anim = makeFallingAnimation();
                    anim.target = this.sprite;
                    anim.start();
                }
            }
        }

        addEffect(effect: Effect) {
            if (!this.effects) this.effects = [];
            this.effects.push(effect);
        }
    }

    const emptyImage = img`0`;
    const swordInterval = 80;

    export class Sword implements Updater {
        owner: Sprite;
        showSprite: Sprite;
        hitSprite: Sprite;

        protected swinging: boolean;
        protected direction: Direction;
        protected startTime: number;


        constructor(owner: Sprite) {
            this.owner = owner;
            this.hitSprite = sprites.create(emptyImage, SpriteKind.Sword);

            this.hitSprite.z = -999;

            // The hitsprite is the one used for collisions, but the tilemap will
            // push it around so it hides under the map and this one shows up
            this.showSprite = sprites.create(emptyImage, SpriteKind.Sword);
            this.showSprite.setFlag(SpriteFlag.Ghost, true);
        }

        swing(direction: Direction) {
            if (this.swinging) return;

            this.direction = direction;
            this.swinging = true;
            this.startTime = control.millis();

            world.addUpdater(this);
        }

        update(time: number) {
            if (!this.swinging) return;
            const index = Math.idiv(time - this.startTime, swordInterval);

            if (index === 0) {
                // For the first index, the sprite needs to be a ghost. Otherwise it
                // will get caught on the tilemap when it moves from off screen
                this.hitSprite.setFlag(SpriteFlag.Ghost, true);
                switch (this.direction) {
                    case Direction.North:
                        this.positionSprites(this.owner.x + 20, this.owner.y - 4, assets.swordEast);
                        break;
                    case Direction.East:
                        this.positionSprites(this.owner.x + 6, this.owner.y - 17, assets.swordNorth);
                        break;
                    case Direction.South:
                        this.positionSprites(this.owner.x - 18, this.owner.y + 4, assets.swordWest);
                        break;
                    case Direction.West:
                        this.positionSprites(this.owner.x - 6, this.owner.y - 17, assets.swordNorth);
                        break;
                }
            }
            else if (index === 1) {
                this.hitSprite.setFlag(SpriteFlag.Ghost, false);
                switch (this.direction) {
                    case Direction.North:
                        this.positionSprites(this.owner.x + 17, this.owner.y - 15, assets.swordNorthEast);
                        break;
                    case Direction.East:
                        this.positionSprites(this.owner.x + 17, this.owner.y - 15, assets.swordNorthEast);
                        break;
                    case Direction.South:
                        this.positionSprites(this.owner.x - 17, this.owner.y + 15, assets.swordSouthWest);
                        break;
                    case Direction.West:
                        this.positionSprites(this.owner.x - 17, this.owner.y - 15, assets.swordNorthWest);
                        break;
                }
            }
            else if (index === 2) {
                this.hitSprite.setFlag(SpriteFlag.Ghost, false);
                switch (this.direction) {
                    case Direction.North:
                        this.positionSprites(this.owner.x + 4, this.owner.y - 18, assets.swordNorth);
                        break;
                    case Direction.East:
                        this.positionSprites(this.owner.x + 20, this.owner.y - 2, assets.swordEast);
                        break;
                    case Direction.South:
                        this.positionSprites(this.owner.x - 4, this.owner.y + 18, assets.swordSouth);
                        break;
                    case Direction.West:
                        this.positionSprites(this.owner.x - 20, this.owner.y - 2, assets.swordWest);
                        break;
                }
            }
            else {
                this.hitSprite.setFlag(SpriteFlag.Ghost, true);
                this.positionSprites(0, 0, emptyImage)
                this.swinging = false;
            }
        }

        protected positionSprites(x: number, y: number, image: Image) {
            this.hitSprite.x = x;
            this.hitSprite.y = y;
            this.hitSprite.setImage(image);

            this.showSprite.x = x;
            this.showSprite.y = y;
            this.showSprite.setImage(image);
        }

        isRunning() {
            return this.swinging;
        }
    }
}
