/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import limitNumber from "../limitNumber";

it("limitNumber function test", () => {
    expect(limitNumber(-12, 1, 0)).toEqual(0);
    expect(limitNumber(12, 10, 2)).toEqual(10);

    expect(limitNumber(10, 1, 2)).toEqual(1);

    expect(limitNumber(-3, null, -2)).toEqual(-2);
    expect(limitNumber(12, null, -2)).toEqual(12);
});
