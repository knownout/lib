/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import computeProgress from "../computeProgress";

it("computeProgress function test", () => {
   expect(computeProgress(1000, 1500, 500)).toEqual(50);
});
