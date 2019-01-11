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


    export const flameTrapNorth = image.ofBuffer(hex`e41010003333333333333333333333232233333333333342443233333333234445323333333333424432333333333323223333333333333333333333333333333333333333333313113333333333331311333333333333131133333333331311111133333333331111313333333333131133333333333333313333333333333333333333`);
    export const flameTrapEast = image.ofBuffer(hex`e41010003333333333333333333333333333333333333333333333333333333333333333333331333333333333133133332322333311111133424432131111112344453233111111334244323313313333232233333331333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333`);
    export const flameTrapSouth = image.ofBuffer(hex`e41010003333333333333333333333333333333333333333333333333333333333333333333333333313333333232233331331333342443211111133234445321111113133424432111111333323223333133133333333333313333333333333333333333333333333333333333333333333333333333333333333333333333333333333`);
    export const flameTrapWest = image.ofBuffer(hex`e41010003333333333333333333333133333333333333311313333333333131111333333333311111131333333333311313333333333331131333333333333113133333333333311313333333333333333333333333333223233333333332344243333333333425424333333333323442433333333333322323333333333333333333333`);
    
    export const flameTrap = [flameTrapNorth, flameTrapEast, flameTrapSouth, flameTrapWest];
    
    
    export const spikeTrap0 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddffdfddddffdfddddffdfddddffdfddddffdfddddffdfddddffdfddddffdfddddffdfddddffdfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddffdfddddffdfddddffdfddddffdfddddffdfddddffdfddddffdfddddffdfddddffdfddddffdfddddfdddddddfddddddddddddddddddd`);
    export const spikeTrap1 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddffdfddddffdfddddcfdfddddcfdfdd1d11dfdd1d11dfdddd1fdfdddd1fdfddddffdfddddffdfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddffdfddddffdfddddcfdfddddcfdfdd1d11dfdd1d11dfdddd1fdfdddd1fdfddddffdfddddffdfddddfdddddddfddddddddddddddddddd`);
    export const spikeTrap2 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddbfdfddddbfdfddbd1bdfddbd1bdf1d1111df1d1111dfdd1d11dfdd1d11dfdddd1fdfdddd1fdfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddbfdfddddbfdfddbd1bdfddbd1bdf1d1111df1d1111dfdd1d11dfdd1d11dfdddd1fdfdddd1fdfddddfdddddddfddddddddddddddddddd`);
    export const spikeTrap3 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddffdfddddffdfddddffdfddddffdfdddd11dfdddd11dfddddffdfddddffdfddddffdfddddffdfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddffdfddddffdfddddffdfddddffdfdddd11dfdddd11dfddddffdfddddffdfddddffdfddddffdfddddfdddddddfddddddddddddddddddd`);
    export const spikeTrap4 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddffdfddddffdfddddbbdfddddbbdfdd1111dfdd1111dfdddd11dfdddd11dfddddffdfddddffdfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddffdfddddffdfddddbbdfddddbbdfdd1111dfdd1111dfdddd11dfdddd11dfddddffdfddddffdfddddfdddddddfddddddddddddddddddd`);
    export const spikeTrap5 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddbbdfddddbbdfddbb11dfddbb11df111111df111111dfdd1111dfdd1111dfdddd11dfdddd11dfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddbbdfddddbbdfddbb11dfddbb11df111111df111111dfdd1111dfdd1111dfdddd11dfdddd11dfddddfdddddddfddddddddddddddddddd`);
}