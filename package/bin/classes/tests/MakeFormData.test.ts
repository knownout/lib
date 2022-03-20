/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import MakeFormData from "../MakeFormData";

it("MakeFormData class test", () => {
    const formData = new MakeFormData({ key: "Value", json: {} });

    expect(formData.entry.has("key")).toBeTruthy();
    expect(formData.entry.has("json")).toBeTruthy();

    expect(formData.entry.get("json")).not.toEqual("[object Object]");
    expect(formData.entry.get("key")).toEqual("Value");

    expect(formData.fetchObject).toEqual({ method: "POST", body: formData.entry });

    formData.remove("key");
    expect(formData.entry.has("key")).toBeFalsy();
});
