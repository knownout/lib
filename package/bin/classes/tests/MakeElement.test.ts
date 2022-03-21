/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */


import MakeElement from "../MakeElement";

describe("MakeElement class tests", () => {
    const element = new MakeElement("div");

    it("Attribute method test", () => {
        element.attr("attr", "value-1");

        expect(element.native.getAttribute("attr")).toEqual("value-1");
        expect(element.attr("attr")).toEqual("value-1");
    });

    it("Setters test", () => {
        element.setInnerText("Hello world!");
        expect(element.native.innerText).toEqual("Hello world!");

        element.setInnerHTML("<b>Hello world!</b>");
        expect(element.native.innerHTML).toEqual("<b>Hello world!</b>");

        element.setInnerText("Hello world!");
        expect(element.native.textContent).toEqual("Hello world!");
    });

    it("Special attributes test", () => {
        element.setInnerHTML("<b>Hello world!</b>");

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
        element.remove("attr");

        expect(element.attr("attr")).toEqual(String());
        element.remove(element.native);

        expect(element.native).not.toBeUndefined();
    });
});
