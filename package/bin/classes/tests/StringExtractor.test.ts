/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import StringExtractor from "../StringExtractor";

describe("StringExtractor class tests", () => {
    it("Plain extraction test", () => {
        const extractor = new StringExtractor("Hello #weird world!");
        const { extracted, entry } = extractor.attach(/#[a-z]+/g).extract;

        expect(Object.keys(extracted)).toContain("#");

        // @ts-ignore
        expect(extracted["#"][0]).toEqual("weird");
        expect(entry).toEqual("Hello world!");
    });

    it("Attach new extractor after extract", () => {
        const extractor = new StringExtractor("Hello #weird +very +world!");
        extractor.attach(/#[a-z]+/g).extract;

        // @ts-ignore
        expect(Object.assign({}, extractor.extracted)["#"][0]).toEqual("weird");
        expect(extractor.entry).toEqual("Hello +very +world!");

        extractor.attach(/\+[a-z]+/g).extract;

        // @ts-ignore
        expect(extractor.extracted["+"][0]).toEqual("very");
        // @ts-ignore
        expect(extractor.extracted["+"][1]).toEqual("world");

        // @ts-ignore
        expect(extractor.extracted["#"][0]).toEqual("weird");
        expect(extractor.entry).toEqual("Hello !");
    });
});
