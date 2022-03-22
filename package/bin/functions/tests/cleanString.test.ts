/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import cleanString from "../cleanString";

it("cleanString function test", () => {
    expect(cleanString("Hello  world")).toEqual("Hello world");
    expect(cleanString("Hello world", /[^A-Z]/g)).toEqual("H");
});
