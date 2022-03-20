/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import classNames from "../classNames";

it("classNames function test", () => {
    const classList = classNames("hel  lo", { "world ": true, "woods": "" }, undefined, null, NaN);
    expect(classList).toEqual("hel lo world");
});
