/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import computeProgress from "../computeProgress";

it("computeProgress function test", () => {
   expect(computeProgress(10, 200, 100)).toEqual(10);
   expect(computeProgress(10, 200, 0)).toEqual(5);
});
