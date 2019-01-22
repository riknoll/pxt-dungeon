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
    export const spikeTrap1 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddffdfddddffdfddddffdfddddffdfdddd11dfdddd11dfddddffdfddddffdfddddffdfddddffdfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddffdfddddffdfddddffdfddddffdfdddd11dfdddd11dfddddffdfddddffdfddddffdfddddffdfddddfdddddddfddddddddddddddddddd`);
    export const spikeTrap2 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddffdfddddffdfddddcfdfddddcfdfdd1d11dfdd1d11dfdddd1fdfdddd1fdfddddffdfddddffdfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddffdfddddffdfddddcfdfddddcfdfdd1d11dfdd1d11dfdddd1fdfdddd1fdfddddffdfddddffdfddddfdddddddfddddddddddddddddddd`);
    export const spikeTrap3 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddffdfddddffdfddddbbdfddddbbdfdd1111dfdd1111dfdddd11dfdddd11dfddddffdfddddffdfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddffdfddddffdfddddbbdfddddbbdfdd1111dfdd1111dfdddd11dfdddd11dfddddffdfddddffdfddddfdddddddfddddddddddddddddddd`);
    export const spikeTrap4 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddbfdfddddbfdfddbd1bdfddbd1bdf1d1111df1d1111dfdd1d11dfdd1d11dfdddd1fdfdddd1fdfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddbfdfddddbfdfddbd1bdfddbd1bdf1d1111df1d1111dfdd1d11dfdd1d11dfdddd1fdfdddd1fdfddddfdddddddfddddddddddddddddddd`);
    export const spikeTrap5 = image.ofBuffer(hex`e4101000ddddfdddddddfdddddddbbdfddddbbdfddbb11dfddbb11df111111df111111dfdd1111dfdd1111dfdddd11dfdddd11dfddddfdddddddfdddddddddddddddddddddddfdddddddfdddddddbbdfddddbbdfddbb11dfddbb11df111111df111111dfdd1111dfdd1111dfdddd11dfdddd11dfddddfdddddddfddddddddddddddddddd`);

    export const heroFall0 = image.ofBuffer(hex`e41010000000000000000000000000f00f00000000f0fffffff0ff0000ffccccfccffc00f0cfbcbcccccfc00f0cccbbcbbbbfcffffbccbfbbfbbccffcfbccbbbbbbbcb0fcfbccbbbbbbbcb0fffbccbfbbfbbccfff0cccbbcbbbbfcfff0cfbcbcccccfc0000ffccccfccffc0000f0fffffff0ff00000000f00f0000000000000000000000`);
    export const heroFall1 = image.ofBuffer(hex`e4101000000000000000000000000000000000000000ffffff00000000f0ccccccffff0000ffbcbccbccfc00f0ccccbcbbcccc0ff0bccbfbbfbbcc0ff0bccbbbbbbbfc00f0bccbbbbbbbfc00f0bccbfbbfbbcc0ff0ccccbcbbcccc0f00ffbcbccbccfc0000f0ccccccffff000000ffffff00000000000000000000000000000000000000`);
    export const heroFall2 = image.ofBuffer(hex`e41010000000000000000000000000000000000000000000000000000000f0ff0f0000000000cfccfc00000000f0cfbbccff0f0000cfccfbcbccfc0000cfcbbbbbcb0f0000cfcbbbbbcb0f0000cfccfbcbccfc0000f0cfbbccff0f000000cfccfc0000000000f0ff0f000000000000000000000000000000000000000000000000000000`);
    export const heroFall3 = image.ofBuffer(hex`e41010000000000000000000000000000000000000000000000000000000000000000000000000ff0f0000000000f0ccfc0000000000cfbcccff0f0000f0ccbbcbfc000000f0ccbbcbfc00000000cfbcccff0f000000f0ccfc000000000000ff0f0000000000000000000000000000000000000000000000000000000000000000000000`);
    export const heroFall4 = image.ofBuffer(hex`e410100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f000000000000000cfff0f00000000f0ccfc0000000000f0ccfc000000000000cfff0f0000000000f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`);
    export const heroFall5 = image.ofBuffer(hex`e4101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f00f000000000000cffc000000000000cffc000000000000f00f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`);

    export const swordNorthWest = image.ofBuffer(hex`e4111100000000000000000000000000c0cc00000000000000000000c0dd0c000000000000000000c0ddcd00101111110000000000dcdd1cb1bbbbbb0100000000c0ddcd1b111111000000000000dcdd0c000000000000000000c1ddcd000000000000000000b1dcdd0c00000000000000101bc0ddcd00000000000000101b00dcdd0c000000000000101b00c0ddcdb00c00000000101b0000dcddcb0000000000101b0000c0bd0c0000000000101b000000cbbc0000000000101b0000b00ccb0b0000000000010000c000b00c000000`);
    export const swordSouth = image.ofBuffer(hex`e406140000c00000000000000000000000cccccccccccccccc0c0000ccccddddddddddddddcd0000ccccddddddddddddddcd000000cccccccccccccccc0c000000c000000000000000000000`);
    export const swordSouthEast = image.ofBuffer(hex`e4111100bc00c0000000010000000000cb0bbc0000101b0000000000b0cc0b0000101b000000000000bccd0000101b0000000000c0dbdd0c00101b0000000000bcc0ddcd00101b00000000000000dcdd0c101b00000000000000c0ddcd101b0000000000000000dcddbc010000000000000000c0ddcd01000000000000000000dcdd0c000000000010111111cbddcd0000000000b1bbbbbb11dcdd0c000000001011111100c0ddcd00000000000000000000dccd00000000000000000000c0cc00000000000000000000000000000000`);
    export const swordSouthWest = image.ofBuffer(hex`e4111100000000000000000000000000000000000000c0cc00000000000000000000dccd000000001011111100c0ddcd00000000b1bbbbbb11dcdd0c0000000010111111cbddcd000000000000000000dcdd0c0000000000000000c0ddcd010000000000000000dcddbc0100000000000000c0ddcd101b00000000000000dcdd0c101b0000000000bcc0ddcd00101b0000000000c0dbdd0c00101b000000000000bccd0000101b0000000000b0cc0b0000101b0000000000cb0bbc0000101b0000000000bc00c0000000010000000000`);
    export const swordWest = image.ofBuffer(hex`e414060000cc0000c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00cccccc00c0cc0c0000cc000000cc0000`);
    export const swordEast = image.ofBuffer(hex`e414060000cc000000cc0000c0cc0c00cccccc00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c00c0dd0c0000cc0000`);
    export const swordNorth = image.ofBuffer(hex`e406140000000000000000000c000000c0cccccccccccccccc000000dcddddddddddddddcccc0000dcddddddddddddddcccc0000c0cccccccccccccccc00000000000000000000000c000000`);
    export const swordNorthEast = image.ofBuffer(hex`e41111000000010000c000b00c00000000101b0000b00ccb0b00000000101b000000cbbc0000000000101b0000c0bd0c0000000000101b0000dcddcb0000000000101b00c0ddcdb00c00000000101b00dcdd0c000000000000101bc0ddcd0000000000000000b1dcdd0c0000000000000000c1ddcd000000000000000000dcdd0c0000000000000000c0ddcd1b1111110000000000dcdd1cb1bbbbbb01000000c0ddcd001011111100000000c0dd0c000000000000000000c0cc00000000000000000000000000000000000000000000`);
}


namespace projectImages {
    //% fixedInstance
    export const dungeon_tiles_0 = image.ofBuffer(hex`e41010007577777777777777777777777777777775776777577777577777557677777777777757657777777777577577777777777777557777777777777777557777777777775765777775777777577677775577777777777757577777777777775576777777757777657777777777777777777777777777777777777777777777777755`);
    //% fixedInstance
    export const dungeon_tiles_1 = image.ofBuffer(hex`e41010006766666666666666666666666666666667668666766666766666776866666666666676876666666666766766666666666666776666666666666666776666666666667687666667666666766866667766666666666676766666666666667768666666676666876666666666666666666666666666666666666666666666666677`);
    //% fixedInstance
    export const dungeon_tiles_2 = image.ofBuffer(hex`e41010007777777777777777777677777777777757657777777777777755767777557677557777777777777757757777777777777757757777777777775576777777777777657777777777777777777777777777777777777777777777777777777777777777576577777777777777777777577777777777777777777777777777777777`);
    //% fixedInstance
    export const dungeon_tiles_3 = image.ofBuffer(hex`e41010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`);
    //% fixedInstance
    export const dungeon_tiles_4 = image.ofBuffer(hex`e41010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`);
    //% fixedInstance
    export const dungeon_tiles_5 = image.ofBuffer(hex`e41010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`);
    //% fixedInstance
    export const dungeon_tiles_6 = image.ofBuffer(hex`e410100075777777777777777777d176771776777537116377717157771176d177177677771176d17777777777371163777777777777d176177677777777777771717777777777771776777777576577777777777777775775176d777777775576133176776177671761177d171777771761177d77617777771331767777777777176d77`);
    //% fixedInstance
    export const dungeon_tiles_7 = image.ofBuffer(hex`e410100067666666666666666666d168661668666736118366616176661168d166166866661168d16666666666361183666666666666d168166866666666666661616666666666661668666666768766666666666666667667168d666666667768133168668166861681166d161666661681166d66816666661331686666666666168d66`);
    //% fixedInstance
    export const dungeon_tiles_8 = image.ofBuffer(hex`e41010006666666666666666666866666666666676876666666666666677686666776866776666666666666676676666666666666676676666666666667768666666666666876666666666666666666666666666666666666666666666666666666666666666768766666666666666666666766666666666666666666666666666666666`);
    //% fixedInstance
    export const dungeon_tiles_9 = image.ofBuffer(hex`e41010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`);
    //% fixedInstance
    export const dungeon_tiles_10 = image.ofBuffer(hex`e41010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`);
    //% fixedInstance
    export const dungeon_tiles_11 = image.ofBuffer(hex`e41010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`);
    //% fixedInstance
    export const dungeon_tiles_12 = image.ofBuffer(hex`e41010007577777777777777777777777777777775776777577777577777557677777777777757657777777777577577777777777777557777777777777777557777777777775765777777777777577677667766777777777767d6dd7777777767dddddd77777577d6dddddd7777777767dddddd7777777767ddddbb7777777766ddddbb`);
    //% fixedInstance
    export const dungeon_tiles_13 = image.ofBuffer(hex`e4101000777777777777777777777777777777777777777777777777777777657777777777777777777777777777777777777777777777775765777777777777777777777777777777777777676d6766666d6776d6ddd6dddd6dd66dddddddddddddddddddddbdddddddddddddddddddddddddddddddddddddddd1dddddddddddddddddd`);
    //% fixedInstance
    export const dungeon_tiles_14 = image.ofBuffer(hex`e41010007777777777777777777677777777777757657777777777777755767777557677557777777777777757757777777777777757757777777777777777777777777777777777777777776776667777777777d76ddd7677777777d6dddd6d77777777ddbbdd7677777777ddbbdd6d77775777dddddddd77777777dddddd6677777777`);
    //% fixedInstance
    export const dungeon_tiles_15 = image.ofBuffer(hex`e4101000ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbccbbccccccccccbcdbddccccccccbcddddddccccccccdbddddddccccccccbcddddddccccccccbcddddbbccccccccbbddddbb`);
    //% fixedInstance
    export const dungeon_tiles_16 = image.ofBuffer(hex`e4101000ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcbdbcbbbbbdbccbdbdddbddddbddbbdddddddddddddddddddddbdddddddddddddddddddddddddddddddddddddddd1dddddddddddddddddd`);
    //% fixedInstance
    export const dungeon_tiles_17 = image.ofBuffer(hex`e4101000ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbccbbbccccccccccdcbdddcbccccccccdbddddbdccccccccddbbddcbccccccccddbbddbdccccccccddddddddccccccccddddddbbcccccccc`);
    //% fixedInstance
    export const dungeon_tiles_18 = image.ofBuffer(hex`e410100077777777d6dddddd77777777d6dd11dd7777777767dd11dd7777777776dddd1d7777777777ddd1dd7755767766dddddd7777777777d6dddd77777777d6dddddd77777777d6dddddd77777777dddddddd5777777776ddd1dd7777777767dddddd77775577d7dddddd7777777766dddddd7777777777d6dddd7777777767dddddd`);
    //% fixedInstance
    export const dungeon_tiles_19 = image.ofBuffer(hex`e4101000dddddddddddddddddddddddddddddddddd11dddddd1dd1dddd11dddddd1dd1ddddddddbddbddddddddddddbddbdddddd1dddddddddddddddddddbdddddddddbddddddddddddddddddddddddddddbddddddddddddddddddddddddddddddddddddbbddddddddddddddbbddddddddddddddddddbddddd1ddddddddddddddddddddd`);
    //% fixedInstance
    export const dungeon_tiles_20 = image.ofBuffer(hex`e4101000dddddd7677777777dddddd7677777777dddddd7d77777777bddddd6d77777777dddddd6677777777dd1dd17677776577dd1dd16d77576577dddddddd77557677dddddd6d77777777dddddd767777777711dddd677777777711dddb7d77777777dddddd7657657777dddddd6d77777777dddddd7677777777dddddd6d77777777`);
    //% fixedInstance
    export const dungeon_tiles_21 = image.ofBuffer(hex`e4101000ccccccccdbddddddccccccccdbdd11ddccccccccbcdd11ddcccccccccbdddd1dccccccccccddd1ddccccccccbbddddddccccccccccdbddddccccccccdbddddddccccccccdbddddddccccccccddddddddcccccccccbddd1ddccccccccbcddddddccccccccdcddddddccccccccbbddddddccccccccccdbddddccccccccbcdddddd`);
    //% fixedInstance
    export const dungeon_tiles_22 = image.ofBuffer(hex`e4101000dddddddddddddddddddddddddddddddddd11dddddd1dd1dddd11dddddd1dd1ddddddddbddbddddddddddddbddbdddddd1dddddddddddddddddddbdddddddddbddddddddddddddddddddddddddddbddddddddddddddddddddddddddddddddddddbbddddddddddddddbbddddddddddddddddddbddddd1ddddddddddddddddddddd`);
    //% fixedInstance
    export const dungeon_tiles_23 = image.ofBuffer(hex`e4101000ddddddcbccccccccddddddcbccccccccddddddcdccccccccbdddddbdccccccccddddddbbccccccccdd1dd1cbccccccccdd1dd1bdccccccccddddddddccccccccddddddbdccccccccddddddcbcccccccc11ddddbccccccccc11dddbcdccccccccddddddcbccccccccddddddbdccccccccddddddcbccccccccddddddbdcccccccc`);
    //% fixedInstance
    export const dungeon_tiles_24 = image.ofBuffer(hex`e41010007577777767dddddd7777777766dd1ddd75776777ddddddbd77775576d61dd1dd77775765671dd1dd77577577d6dddd6d7777557767ddd67d777777557766677677775765777777777777577677777777777777777777777777777777775576777777757777657777777777777777777777777777777777777777777777777755`);
    //% fixedInstance
    export const dungeon_tiles_25 = image.ofBuffer(hex`e4101000ddddddddd1dddddddddddddddddddddddddddddddddddddddddddddddddddbddddddddd1dddddddddddddddd6dddddddddd6dd667dd66dd666676d6776766d6777777777777777777777777777777777777777777777777777777765777777777777576577777777777767777777777777777777777777777777777777777777`);
    //% fixedInstance
    export const dungeon_tiles_26 = image.ofBuffer(hex`e41010001ddddd6d77777777dddddd6677777777dddddd7677777757dddddd7677777777ddddd16d77777777dddddd7677777777dd6d767777777777667776557777777777775765777777777777577677777777777777777757777777777777775576777777757777657777777777777777777777777777777777777777777777777755`);
    //% fixedInstance
    export const dungeon_tiles_27 = image.ofBuffer(hex`e4101000ccccccccbcddddddccccccccbbdd1dddccccccccddddddbdccccccccdb1dd1ddccccccbcbc1dd1ddccccccccdbddddbdccccccccbcdddbcdccccccccccbbbccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`);
    //% fixedInstance
    export const dungeon_tiles_28 = image.ofBuffer(hex`e4101000ddddddddd1dddddddddddddddddddddddddddddddddddddddddddddddddddbddddddddd1ddddddddddddddddbddddddddddbddbbcddbbddbbbbcbdbccbcbbdbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`);
    //% fixedInstance
    export const dungeon_tiles_29 = image.ofBuffer(hex`e41010001dddddbdccccccccddddddbbccccccccddddddcbccccccccddddddcbccccccccddddd1bdccccccccddddddcbccccccccddbdcbccccccccccbbcccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`);
    //% fixedInstance
    export const dungeon_tiles_30 = image.ofBuffer(hex`e4101000dddddddddddddddddddddddddddddddddddddddddddddddddd11dddddd1dd1dddd11dddddd1dd1ddddddddbddbddddddddddddbddbdddddd1ddddddddddddddddddddddddddddddddddddddddd66dd66dddddddddd6d7677dddddddd6d777777dddddddd76777777dddddddd6d777777dddddddd6d776577dddddddd66777777`);
    //% fixedInstance
    export const dungeon_tiles_31 = image.ofBuffer(hex`e4101000dddddddddddddddddddddddddddddddddddddddddddddddd1dd1dddddd11dddd1dd1dddddd11dddddddddddddddddddddddddddbddddddddd1dddddddddddddddddddddddddddddd6d676d6666676dd6767776777767766777777777777777777777777777777777777777775576777777777777777777777777777777777777`);
    //% fixedInstance
    export const dungeon_tiles_32 = image.ofBuffer(hex`e4101000dddddddddddddddddddddddddddddddd1dd1dddddd11dddd1dd1dddddd11dddddddddddbddddddddddddddddddddddddd1ddddddddddddddddddddddddbddddddddddddddddddddd6dd666dddddddddd7d6777d6dddddddd76777767ddddbddb777777d6ddddbddb77777767dddddddd77777777dddddddd77777766dddddddd`);
    //% fixedInstance
    export const dungeon_tiles_33 = image.ofBuffer(hex`e4101000cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66cc66cccccccccc6c7677cccccccc6c777777cccccccc76777777cccccccc6c777777cccccccc6c776577cccccccc66777777`);
    //% fixedInstance
    export const dungeon_tiles_34 = image.ofBuffer(hex`e4101000cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6c676c6666676cc6767776777767766777777777777777777777777777777777777777775576777777777777777777777777777777777777`);
    //% fixedInstance
    export const dungeon_tiles_35 = image.ofBuffer(hex`e4101000cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6cc666cccccccccc7c6777c6cccccccc76777767cccccccc777777c6cccccccc77777767cccccccc77777777cccccccc77777766cccccccc`);
    //% fixedInstance
    export const dungeon_tiles_36 = image.ofBuffer(hex`e4101000dddddddd767777771ddddddd76777777dddddddd6d777777ddddddddd6777777ddddbbdddd777777ddddbbdd66777777dddddddddd765776dddddddd76777777dddddddd76775776dddddddd77777777ddddddddd67777771ddddddd6d777777dddddddd7d777777dddddddd66777777dddd1ddddd767777dddddddd6d777777`);
    //% fixedInstance
    export const dungeon_tiles_37 = image.ofBuffer(hex`e41010007777777777777777777777777777777777776777577777577777557677777777777757657777777777577577777777777777557777777777777777557777777777775765777775777777577677775577777777777757577777777777775576777777757777657777777777777777777777777777777777777777777777777755`);
    //% fixedInstance
    export const dungeon_tiles_38 = image.ofBuffer(hex`e4101000777777d6dddddddd777777d6dddddddd777777d7dddddddd77777767dddddddd77777766dd1ddddd777777d6dddddddd77577667dddddddd77777777dddddddd77777767dddddddd777777d6dddddddd777777671dd1bddd777775d71dd1dddd777777d6dddddddd77777767dddddddd777777d6dddddddd77777767dddddddd`);
    //% fixedInstance
    export const dungeon_tiles_39 = image.ofBuffer(hex`e4101000cccccccc76777777cccccccc76777777cccccccc6c777777ccccccccc6777777cccccccccc777777cccccccc66777777cccccccccc765776cccccccc76777777cccccccc76775776cccccccc77777777ccccccccc6777777cccccccc6c777777cccccccc7c777777cccccccc66777777cccccccccc767777cccccccc6c777777`);
    //% fixedInstance
    export const dungeon_tiles_40 = image.ofBuffer(hex`e41010007777777777777777777777777777777777776777577777577777557677777777777757657777777777577577777777777777557777777777777777557777777777775765777775777777577677775577777777777757577777777777775576777777757777657777777777777777777777777777777777777777777777777755`);
    //% fixedInstance
    export const dungeon_tiles_41 = image.ofBuffer(hex`e4101000777777c6cccccccc777777c6cccccccc777777c7cccccccc77777767cccccccc77777766cccccccc777777c6cccccccc77577667cccccccc77777777cccccccc77777767cccccccc777777c6cccccccc7777776ccccccccc777775c7cccccccc777777c6cccccccc77777767cccccccc777777c6cccccccc77777767cccccccc`);
    //% fixedInstance
    export const dungeon_tiles_42 = image.ofBuffer(hex`e4101000dddddddd6d777777dddddddd66777777dddddddd77776577dddddddd76777777dd1ddd6d6c777777dddddddd76777767dddddddd6d7776d7dddddddddd666dd6dddddddddddddddddddddddddddddddd1dd1dddddd11dddd1dd1dddddd11ddddddddddbbddddddddddddddbbddddddddd1dddddddddddddddddddddddddddddd`);
    //% fixedInstance
    export const dungeon_tiles_43 = image.ofBuffer(hex`e410100077777777777777777777777777777777777777777777777777777757657777777777777777777777777777776777777777767766d7766776666d676dd6d6676ddddddddddddddddddddddddddddddddd1dd1ddddddd1dddd1dd1dddddddddddddddddddddddddddddddddddbddddddddd1dddddddddddddddddddddddddddddd`);
    //% fixedInstance
    export const dungeon_tiles_44 = image.ofBuffer(hex`e410100077777767dddddddd77777766dddddddd777777d6dddddddd777777d6dddbdddd77657767dddddddd777777d6dddddddd7767d6dddddddddd66ddd6ddddddddddddddddddddddbddddddddddddddddddddd11dddddd1dd1dddd11dddddd1dd1ddddddddbddbddddddddddddbddbdddddd1ddddddddddddddddddddddddddddddd`);
    //% fixedInstance
    export const dungeon_tiles_45 = image.ofBuffer(hex`e4101000cccccccc6c777777cccccccc66777777cccccccc77776577cccccccc76777777cccccc6c6c777777cccccccc76777767cccccccc6c7776c7cccccccccc666cc6cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`);
    //% fixedInstance
    export const dungeon_tiles_46 = image.ofBuffer(hex`e410100077777777777777777777777777777777777777777777777777777757657777777777777777777777777777776777777777767766c7766776666c676cc6c6676ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`);
    //% fixedInstance
    export const dungeon_tiles_47 = image.ofBuffer(hex`e410100077777767cccccccc77777766cccccccc777777c6cccccccc777777c6cccccccc77657767cccccccc777777c6cccccccc7767c6cccccccccc66ccc6cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`);
    //% fixedInstance
    export const dungeon_tiles_48 = image.ofBuffer(hex`e41010007577777777777777777777777777777775776777577777577777557677777777777757657777777777577577777777777777557777777777777777557777777777775765777777777777577677667766777777777767c6cc7777777767cccccc77777577c6cccccc7777777767cccccc7777777767cccccc7777777766cccccc`);
    //% fixedInstance
    export const dungeon_tiles_49 = image.ofBuffer(hex`e4101000777777777777777777777777777777777777777777777777777777657777777777777777777777777777777777777777777777775765777777777777777777777777777777777777676c6766666c6776c6ccc6cccc6cc66ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`);
    //% fixedInstance
    export const dungeon_tiles_50 = image.ofBuffer(hex`e41010007777777777777777777677777777777757657777777777777755767777557677557777777777777757757777777777777757757777777777777777777777777777777777777777776776667777777777c76ccc7677777777c6cccc6c77777777cccccc7677777777cccccc6c77775777cccccccc77777777cccccc6677777777`);
    //% fixedInstance
    export const dungeon_tiles_51 = image.ofBuffer(hex`e4101000dddddddddddddddddddddddddddddddddddddddddddddddddd11dddddd1dd1dddd11dddddd1dd1ddddddddbddbddddddddddddbddbdddddd1dddddddddddddddddddddddddddddddddddddddddbbddbbddddddddddbdcbccddddddddbdccccccddddddddcbccccccddddddddbdccccccddddddddbdccccccddddddddbbcccccc`);
    //% fixedInstance
    export const dungeon_tiles_52 = image.ofBuffer(hex`e4101000dddddddddddddddddddddddddddddddddddddddddddddddd1dd1dddddd11dddd1dd1dddddd11dddddddddddddddddddddddddddbddddddddd1ddddddddddddddddddddddddddddddbdbcbdbbbbbcbddbcbcccbccccbccbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`);
    //% fixedInstance
    export const dungeon_tiles_53 = image.ofBuffer(hex`e4101000dddddddddddddddddddddddddddddddd1dd1dddddd11dddd1dd1dddddd11dddddddddddbddddddddddddddddddddddddd1ddddddddddddddddddddddddbdddddddddddddddddddddbddbbbddddddddddcdbcccdbddddddddcbccccbcddddbddbccccccdbddddbddbccccccbcddddddddccccccccddddddddccccccbbdddddddd`);
    //% fixedInstance
    export const dungeon_tiles_54 = image.ofBuffer(hex`e410100077777777c6cccccc77777777c6cccccc7777777767cccccc7777777776cccccc7777777777cccccc7755767766cccccc7777777777c6cccc77777777c6cccccc77777777c6cccccc77777777cccccccc5777777776cccccc7777777767cccccc77775577c7cccccc7777777766cccccc7777777777c6cccc7777777767cccccc`);
    //% fixedInstance
    export const dungeon_tiles_55 = image.ofBuffer(hex`e4101000cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`);
    //% fixedInstance
    export const dungeon_tiles_56 = image.ofBuffer(hex`e4101000cccccc7677777777cccccc7677777777cccccc7c77777777cccccc6c77777777cccccc6677777777cccccc7677776577cccccc6c77576577cccccccc77557677cccccc6c77777777cccccc7677777777cccccc6777777777cccccc7c77777777cccccc7657657777cccccc6c77777777cccccc7677777777cccccc6c77777777`);
    //% fixedInstance
    export const dungeon_tiles_57 = image.ofBuffer(hex`e4101000ddddddddcbcccccc1dddddddcbccccccddddddddbdccccccdddddddddbccccccddddbbddddccccccddddbbddbbccccccddddddddddcbccccddddddddcbccccccddddddddcbccccccddddddddccccccccdddddddddbcccccc1dddddddbdccccccddddddddcdccccccddddddddbbccccccdddd1dddddcbccccddddddddbdcccccc`);
    //% fixedInstance
    export const dungeon_tiles_58 = image.ofBuffer(hex`e4101000cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc`);
    //% fixedInstance
    export const dungeon_tiles_59 = image.ofBuffer(hex`e4101000ccccccdbddddddddccccccdbddddddddccccccdcddddddddccccccbcddddddddccccccbbdd1dddddccccccdbddddddddccccccbcddddddddccccccccddddddddccccccbcddddddddccccccdbddddddddccccccbc1dd1bdddccccccdc1dd1ddddccccccdbddddddddccccccbcddddddddccccccdbddddddddccccccbcdddddddd`);
    //% fixedInstance
    export const dungeon_tiles_60 = image.ofBuffer(hex`e41010007577777767cccccc7777777766cccccc75776777cccccccc77775576c6cccccc7777576567cccccc77577577c6cccc6c7777557767ccc67c777777557766677677775765777777777777577677777777777777777777777777777777775576777777757777657777777777777777777777777777777777777777777777777755`);
    //% fixedInstance
    export const dungeon_tiles_61 = image.ofBuffer(hex`e4101000cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6cccccccccc6cc667cc66cc666676c6776766c6777777777777777777777777777777777777777777777777777777765777777777777576577777777777767777777777777777777777777777777777777777777`);
    //% fixedInstance
    export const dungeon_tiles_62 = image.ofBuffer(hex`e4101000cccccc6c77777777cccccc6677777777cccccc7677777757cccccc7677777777cccccc6c77777777cccccc7677777777cc6c767777777777667776557777777777775765777777777777577677777777777777777757777777777777775576777777757777657777777777777777777777777777777777777777777777777755`);
    //% fixedInstance
    export const dungeon_tiles_63 = image.ofBuffer(hex`e4101000ddddddddbdccccccddddddddbbccccccddddddddccccccccddddddddcbccccccdd1dddbdbcccccccddddddddcbccccbcddddddddbdcccbdcddddddddddbbbddbdddddddddddddddddddddddddddddddd1dd1dddddd11dddd1dd1dddddd11ddddddddddbbddddddddddddddbbddddddddd1dddddddddddddddddddddddddddddd`);
    //% fixedInstance
    export const dungeon_tiles_64 = image.ofBuffer(hex`e4101000ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccbccbbdccbbccbbbbdbcbddbdbbcbddddddddddddddddddddddddddddddddd1dd1ddddddd1dddd1dd1dddddddddddddddddddddddddddddddddddbddddddddd1dddddddddddddddddddddddddddddd`);
    //% fixedInstance
    export const dungeon_tiles_65 = image.ofBuffer(hex`e4101000ccccccbcddddddddccccccbbddddddddccccccdbddddddddccccccdbdddbddddccccccbcddddddddccccccdbddddddddccbcdbddddddddddbbdddbddddddddddddddddddddddbddddddddddddddddddddd11dddddd1dd1dddd11dddddd1dd1ddddddddbddbddddddddddddbddbdddddd1ddddddddddddddddddddddddddddddd`);

    // export const tiles = [dungeon_tiles_0, dungeon_tiles_1, dungeon_tiles_2, dungeon_tiles_3, dungeon_tiles_4, dungeon_tiles_5, dungeon_tiles_6, dungeon_tiles_7, dungeon_tiles_8, dungeon_tiles_9, dungeon_tiles_10, dungeon_tiles_11, dungeon_tiles_12, dungeon_tiles_13, dungeon_tiles_14, dungeon_tiles_15, dungeon_tiles_16, dungeon_tiles_17, dungeon_tiles_18, dungeon_tiles_19, dungeon_tiles_20, dungeon_tiles_21, dungeon_tiles_22, dungeon_tiles_23, dungeon_tiles_24, dungeon_tiles_25, dungeon_tiles_26, dungeon_tiles_27, dungeon_tiles_28, dungeon_tiles_29, dungeon_tiles_30, dungeon_tiles_31, dungeon_tiles_32, dungeon_tiles_33, dungeon_tiles_34, dungeon_tiles_35, dungeon_tiles_36, dungeon_tiles_37, dungeon_tiles_38, dungeon_tiles_39, dungeon_tiles_40, dungeon_tiles_41, dungeon_tiles_42, dungeon_tiles_43, dungeon_tiles_44, dungeon_tiles_45, dungeon_tiles_46, dungeon_tiles_47, dungeon_tiles_48, dungeon_tiles_49, dungeon_tiles_50, dungeon_tiles_51, dungeon_tiles_52, dungeon_tiles_53, dungeon_tiles_54, dungeon_tiles_55, dungeon_tiles_56, dungeon_tiles_57, dungeon_tiles_58, dungeon_tiles_59, dungeon_tiles_60, dungeon_tiles_61, dungeon_tiles_62, dungeon_tiles_63, dungeon_tiles_64, dungeon_tiles_65,];


    export function init() {

    }
}



// let index = 0;
// let tile = sprites.create(image.create(16, 16));
// let label = sprites.create(image.create(16, 16));


// label.right = tile.left - 2;

// function update() {
//     label.image.fill(0)
//     label.image.print(index.toString(), 0, 0, 1)

//     tile.image.drawImage(projectImages.tiles[index], 0, 0);
// }

// controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
//     index = (index + 1) % projectImages.tiles.length;
//     update();
// })

// controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
//     index = (index + projectImages.tiles.length - 1) % projectImages.tiles.length;
//     update();
// })

// update();










