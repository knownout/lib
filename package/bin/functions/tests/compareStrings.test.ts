/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import compareStrings from "../compareStrings";

it("compareStrings function test", () => {
    expect(compareStrings("Hello", "hello").result).toBeTruthy();
    expect(compareStrings("", "").result).toBeFalsy();
    expect(compareStrings("", "").weight).toEqual(-1);
    expect(compareStrings("Hello", "").result).toBeFalsy();
    expect(compareStrings("Hello, world", "hello world").result).toBeTruthy();
    expect(compareStrings("Hello", "henlow").result).toBeTruthy();
    expect(compareStrings("Hello", "Not he he").result).toBeFalsy();
});
