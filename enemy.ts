namespace dungeon {
    const enemySpeed = 40;
    
    export class Enemy extends Character {
        protected target: Sprite;
        health: number;

        constructor(target: Sprite) {
            super(sprites.create(sprites.castle.skellyFront, SpriteKind.Enemy));
            this.target = target;
            this.health = 2;
        }

        init() {
            initSkelly(this.sprite);
        }

        takeDamage(sourceX: number, sourceY: number) {
            if (!this.invincible) {
                this.health--;
                if (this.health) {
                    this.addEffect(new BumpEffect(this, sourceX, sourceY));
                    this.addEffect(new InvulnerableEffect(this, 15, 14));
                }
                else {
                    this.sprite.destroy();
                }
            }
        }

        protected updateAttack() {
            // just bump
        }

        protected updateMovement() {
            if (!this.target) return;
            let dx = 0;
            let dy = 0;
            let newState = 0;

            if (this.target.y > this.sprite.y) dy += 1;
            if (this.target.y < this.sprite.y) dy -= 1;
            if (this.target.x < this.sprite.x) dx -= 1;
            if (this.target.x > this.sprite.x) dx += 1;

            if (dx || dy) {
                newState |= CharacterFlag.Walking;

                // Choose a direction to face
                if (dy > 0) newState |= CharacterFlag.FacingSouth;
                else if (dx > 0) newState |= CharacterFlag.FacingEast;
                else newState |= CharacterFlag.FacingWest;
                // else if (dy < 0) newState |= CharacterFlag.FacingNorth;
            }
            else {
                // Keep the direction we're facing, but set flag as idle
                newState |= (this.flags & 0xf | CharacterFlag.Idle);
            }

            this.sprite.vx = enemySpeed * dx;
            this.sprite.vy = enemySpeed * dy;

            this.setFlags(newState);
        }
    }

}