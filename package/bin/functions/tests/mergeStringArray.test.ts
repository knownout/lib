/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import mergeStringArray from "../mergeStringArray";

it("margeStringArray function test", () => {
    const merged = mergeStringArray([
        "hello",
        "hello",
        "world",
        "repeating",
        "repeating"
    ]);

    expect(mergeStringArray(merged)).toEqual(
        [ [ "hello", "hello" ], "world", [ "repeating", "repeating" ] ]
    );
});
