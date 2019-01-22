namespace dungeon {
    export type Action = () => void;

    export class Trigger {
        action: Action;
        isEternal: boolean;

        constructor() { }

        drawDebug() {
        }

        check(target: Character): boolean {
            return true;
        }
    }

    export class TileTrigger extends Trigger {
        col: number;
        row: number;
        width: number;
        height: number;

        protected firstCheck: boolean;

        constructor(col: number, row: number, width = 1, height = 1) {
            super();
            this.firstCheck = true;
            this.col = col;
            this.row = row;
            this.width = width;
            this.height = height;
        }

        check(target: Character): boolean {
            const col = target.sprite.x >> 4;
            const row = target.sprite.y >> 4;

            const triggered = !(col < this.col ||
                (col > this.col + this.width - 1) ||
                row < this.row ||
                (row > this.row + this.height - 1));

            // Add some extra logic to make sure the player doesn't set off a trigger
            // that they spawn into. The trigger needs to go low before it can fire
            if (this.firstCheck) {
                if (!triggered) this.firstCheck = false;
                return false;
            }
            else {
                if (triggered) this.firstCheck = true;
                
                return triggered
            }
        }

        drawDebug() {
            screen.drawRect(
                (this.col << 4) - game.currentScene().camera.offsetX,
                (this.row << 4) - game.currentScene().camera.offsetY,
                this.width << 4, this.height << 4, 1);
        }
    }

    export class MultiTrigger extends Trigger {
        children: Trigger[];
        constructor(children: Trigger[]) {
            super();
            this.children = children;
        }

        drawDebug() {
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].drawDebug();
            }
        }

        check(target: Character): boolean {
            for (let i = 0; i < this.children.length; i++) {
                if (!this.children[i].check(target)) return false;
            }
            
            return true;
        }
    }

    export class SimpleTrigger extends Trigger {
        checker: (target: Character) => boolean;

        constructor(checker: (target: Character) => boolean) {
            super();
            this.checker = checker;
        }

        check(target: Character) {
            return this.checker(target);
        }
    }

    function isPassable(tile: RoomTile) {
        switch (tile) {
            case RoomTile.Normal:
            case RoomTile.EnemySpawn:
            case RoomTile.SpikeTrap:
            case RoomTile.Empty:
                return true;
            case RoomTile.Wall:
            case RoomTile.Treasure:
            case RoomTile.Door:
            case RoomTile.ArrowNorth:
            case RoomTile.ArrowEast:
            case RoomTile.ArrowSouth:
            case RoomTile.ArrowWest:
            case RoomTile.FlameNorth:
            case RoomTile.FlameEast:
            case RoomTile.FlameSouth:
            case RoomTile.FlameWest:
                return false;
            default:
                return false;
        }
    }

    /**
     * Create a trigger that extends from a col/row in a given direction
     */
    export function createRayTrigger(col: number, row: number, direction: Direction, map: Image) {
        if (direction === Direction.North || direction === Direction.South) {
            const dy = direction === Direction.North ? -1 : 1;
            let y = row + dy;

            while (y < map.height && y > 0) {
                if (!isPassable(map.getPixel(col, y))) {
                    y -= dy;
                    break;
                }
                y += dy;
            }

            return new TileTrigger(col + 1, 1 + Math.min(y, row), 1, 1 + Math.abs(y - row))
        }
        else {
            const dx = direction === Direction.East ? 1 : -1;

            let x = col + dx;

            while (x < map.width && x > 0) {
                if (!isPassable(map.getPixel(x, row))) {
                    x -= dx;
                    break;
                }
                x += dx;
            }

            return new TileTrigger(1 + Math.min(col, x), row + 1, 1 + Math.abs(col - x), 1);
        }
    }
}