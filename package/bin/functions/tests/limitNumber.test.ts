/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import limitNumber from "../limitNumber";

it("limitNumber function test", () => {
    expect(limitNumber(-12, { bottom: 0, top: 1 })).toEqual(0);
    expect(limitNumber(12, { bottom: 2, top: 10 })).toEqual(10);

    expect(limitNumber(10, { bottom: 2, top: 1 })).toEqual(1);
});
