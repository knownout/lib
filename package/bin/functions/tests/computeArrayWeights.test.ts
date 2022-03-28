/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import computeArrayWeights from "../computeArrayWeights";

it("computeArrayWeights function test", () => {
    const weights = computeArrayWeights("hello", [ "henlo", "world" ]);

    // @ts-ignore
    expect(weights[0] < weights[1]).toBeTruthy();
});
