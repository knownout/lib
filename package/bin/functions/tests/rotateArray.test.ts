/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import rotateArray from "../rotateArray";

it("rotateArray function test", () => {
    expect(rotateArray([ 1, 2, 3, 4, 5 ])).toStrictEqual([ 5, 1, 2, 3, 4 ]);
    expect(rotateArray([ 1, 2, 3, 4, 5 ], false)).toStrictEqual([ 2, 3, 4, 5, 1 ]);

    expect(rotateArray([ 1, 2, 3, 4, 5 ], true, 3)).toStrictEqual([ 3, 4, 5, 1, 2 ]);
    expect(rotateArray([ 1, 2, 3, 4, 5 ], false, 3))
        .toStrictEqual([ 4, 5, 1, 2, 3 ]);
});
