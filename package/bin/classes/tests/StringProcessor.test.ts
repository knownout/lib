/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import StringProcessor from "../StringProcessor";

describe("StringProcessor class tests", () => {
    const entry = "Hello  +world, this is my short text about...",
        trim = entry.replace(/\s{2,}/g, " ").trim();

    const processor = new StringProcessor(entry);

    it("Entry processing and splitting test", () => {
        expect(processor.entry).toEqual(trim);
        expect(processor.wordsList).toEqual(trim.split(" "));
    });

    it("Words limiting test", () => {
        processor.limitWordsCount(2);
        expect(processor.entry).toEqual("Hello +world...");
    });

    it("Attach new filters after extraction test", () => {
        processor.filter("world");
        expect(processor.entry).toEqual("Hello");
    });

    it("Duplicates removing test", () => {
        expect(new StringProcessor("Hello world world").removeDuplicates.entry)
            .toEqual("Hello world");
    });

    it("Extractor functionality test", () => {
        const processor = new StringProcessor("Hello +world");
        processor.extractor.attach(/\+[a-z]+/g);

        // @ts-ignore
        expect(processor.extractor.extract.extracted["+"][0]).toEqual("world");
    });

    it("Integration with external package functions test", () => {
        const processor = new StringProcessor("Hello  world");

        expect(processor.compare("henlo world").result).toBeTruthy();
        expect(processor.compare("not he he").result).toBeFalsy();

        expect(processor.clean.entry).toEqual("Hello world");
    });
});
