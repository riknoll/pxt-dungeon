namespace assets {
    export const arrowLauncherSouth = img`
        c c c c c c c c c c c c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c c 1 c 1 c 1 c c c c c c
        c c c c c 1 1 1 1 1 c c c c c c
        c c c c c 1 1 1 1 1 c c c c c c
        c c c c c c 1 c 1 c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c 1 1 1 1 1 1 1 c c c c c
        c c c c c 1 1 1 1 1 c c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c c c c 1 c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        `;
    export const arrowLauncherEast = img`
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c 1 c c c c
        c c 1 1 1 c c c c c c 1 1 c c c
        c 1 c 1 c 1 c 1 1 1 1 1 1 1 c c
        c 1 1 1 1 1 c 1 1 1 1 1 1 1 1 c
        c 1 1 1 1 1 c 1 1 1 1 1 1 1 c c
        c c 1 c 1 c c c c c c 1 1 c c c
        c c c c c c c c c c c 1 c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        `;
    export const arrowLauncherNorth = img`
        c c c c c c c c c c c c c c c c
        c c c c c c c 1 c c c c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c c 1 1 1 1 1 c c c c c c
        c c c c 1 1 1 1 1 1 1 c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c 1 1 1 c c c c c c c
        c c c c c 1 c 1 c 1 c c c c c c
        c c c c c 1 1 1 1 1 c c c c c c
        c c c c c 1 1 1 1 1 c c c c c c
        c c c c c c 1 c 1 c c c c c c c
        c c c c c c c c c c c c c c c c
        `;
    export const arrowLauncherWest = img`
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c 1 c c c c c c c c c c c
        c c c 1 1 c c c c c c 1 1 1 c c
        c c 1 1 1 1 1 1 1 c 1 c 1 c 1 c
        c 1 1 1 1 1 1 1 1 c 1 1 1 1 1 c
        c c 1 1 1 1 1 1 1 c 1 1 1 1 1 c
        c c c 1 1 c c c c c c 1 c 1 c c
        c c c c 1 c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        c c c c c c c c c c c c c c c c
        `;

    export const launcher = [arrowLauncherNorth, arrowLauncherEast, arrowLauncherSouth, arrowLauncherWest];


    export const arrowEast = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . f . . .
        . . . . . . . . . . . f 1 f . .
        . f f f f f f f f f f f 1 1 f .
        f e e e e e e e e e e e 1 1 1 f
        . f f f f f f f f f f f 1 1 f .
        . . . . . . . . . . . f 1 f . .
        . . . . . . . . . . . . f . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        `;
    export const arrowWest = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . f . . . . . . . . . . . .
        . . f 1 f . . . . . . . . . . .
        . f 1 1 f f f f f f f f f f f .
        f 1 1 1 e e e e e e e e e e e f
        . f 1 1 f f f f f f f f f f f .
        . . f 1 f . . . . . . . . . . .
        . . . f . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        `;
    export const arrowNorth = img`
        . . . . . . . f . . . . . . . .
        . . . . . . f 1 f . . . . . . .
        . . . . . f 1 1 1 f . . . . . .
        . . . . f 1 1 1 1 1 f . . . . .
        . . . . . f f e f f . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . . f . . . . . . . .
        `;
    export const arrowSouth = img`
        . . . . . . . f . . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . . f e f . . . . . . .
        . . . . . f f e f f . . . . . .
        . . . . f 1 1 1 1 1 f . . . . .
        . . . . . f 1 1 1 f . . . . . .
        . . . . . . f 1 f . . . . . . .
        . . . . . . . f . . . . . . . .
        `;

    export const arrow = [arrowNorth, arrowEast, arrowSouth, arrowWest];

}