namespace dungeon {
    export type Action = () => void;

    export class Trigger {
        action: Action;

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

        constructor(col: number, row: number, width = 1, height = 1) {
            super();
            this.col = col + 1;
            this.row = row + 1;
            this.width = width;
            this.height = height;
        }

        check(target: Character): boolean {
            const col = target.sprite.x >> 4;
            const row = target.sprite.y >> 4;

            return !(col < this.col ||
                (col > this.col + this.width - 1) ||
                row < this.row ||
                (row > this.row + this.height - 1));
        }

        drawDebug() {
            screen.drawRect(
                (this.col << 4) - game.currentScene().camera.offsetX,
                (this.row << 4) - game.currentScene().camera.offsetY,
                this.width << 4, this.height << 4, 1);
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

            return new TileTrigger(col, Math.min(y, row), 1, 1 + Math.abs(y - row))
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

            return new TileTrigger(Math.min(col, x), row, 1 + Math.abs(col - x), 1);
        }
    }
}