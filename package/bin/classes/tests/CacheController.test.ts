/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import CacheController from "../CacheController";

describe("CacheController class tests", () => {
    const key = "testNode",
        value = { value: "Hello world!" };

    const controller = new CacheController(localStorage);

    it("Storage read/write test", () => {
        controller.setItem(key, value);
        expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));

        const item = controller.getItem<typeof value>(key);
        expect(item).toEqual(value);

        expect(controller.getItem("notExist")).toBeFalsy();
    });

    it("Storage exist/remove item test", () => {
        expect(controller.exist(key)).toBeTruthy();
        expect(controller.exist(key + "not")).toBeFalsy();

        controller.removeItem(key);
        expect(localStorage.getItem(key)).toBeNull();
        expect(controller.exist(key)).toBeFalsy();
    });

    it("Storage non-json item decode test", () => {
        localStorage.setItem("nonJson", "\\@#NON-JSON");
        expect(controller.getItem("nonJson")).toBeFalsy();
    });
});
