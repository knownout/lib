/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import sortByWeights from "../sortByWeights";

it("sortByWeights function test", () => {
    const array = sortByWeights("Hello", [ "world", "henlo", "hello" ]);

    expect(array[0]).toEqual("hello");
    expect(array[1]).toEqual("henlo");
});
