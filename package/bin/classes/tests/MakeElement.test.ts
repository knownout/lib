/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */


import MakeElement from "../MakeElement";

describe("MakeElement class tests", () => {
    const element = new MakeElement("div");

    it("Attribute method test", () => {
        element.attribute("attr", "value-1");

        expect(element.native.getAttribute("attr")).toEqual("value-1");
        expect(element.attribute("attr")).toEqual("value-1");
    });

    it("Setters test", () => {
        element.set.text("Hello world!");
        expect(element.native.innerText).toEqual("Hello world!");

        element.set.html("<b>Hello world!</b>");
        expect(element.native.innerHTML).toEqual("<b>Hello world!</b>");

        element.set.textContent("Hello world!");
        expect(element.native.textContent).toEqual("Hello world!");
    });

    it("Special attributes test", () => {
        element.set.html("<b>Hello world!</b>");

        expect(element.html).toEqual("<b>Hello world!</b>");
        expect(element.text).toEqual("Hello world!");
        expect(element.textContent).toEqual("Hello world!");

        element.html = "<i>Hello!</i>";
        expect(element.html).toEqual("<i>Hello!</i>");

        element.text = "Hello";
        expect(element.text).toEqual("Hello");

        element.textContent = "Hello";
        expect(element.textContent).toEqual("Hello");
    });

    it("Removing functions test", () => {
        element.remove.attribute("attr");

        expect(element.attribute("attr")).toEqual(String());
        element.remove.element();

        expect(element.native).not.toBeUndefined();
    });
});
