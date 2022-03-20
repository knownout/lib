/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility class for retrieving specific entries defined as regular
 * expressions from the provided string.
 */
export default class StringExtractor
{
    /**
     * Extracted from entry string entities
     * @type {{[p: string]: Set<string>}}
     */
    public extracted: { [key: string]: string[] } = {};

    // List of defined extractors with key name
    private readonly extractors: [ RegExp, string ][] = [];

    /**
     * Utility class for retrieving specific entries defined as regular
     * expressions from the provided string.
     *
     * @param {string} entry string to be processed.
     */
    public constructor (public entry: string) {
        this.entry = entry.replace(/\s{2,}/g, " ")
            .trim();
    }

    /**
     * Extract specific entities from string using defined extractors.
     *
     * _Extracted entities and resulting string can be accessed both from
     * this getter response and from class fields (`extracted`, `entry`)._
     *
     * @return {{entry: string, extracted: {[p: string]: string[]}}} object with
     * extracted entities and resulting string.
     */
    public get extract (): { entry: string; extracted: { [p: string]: string[]; }; } {
        // Iterate over defined extractors.
        this.extractors.forEach(extractor => {
            // Create new set for extracted object of the current extractor.
            const extracted = new Set<string>();

            // A custom matcher for string.replace function.
            const matcher = (entry: string) => {
                let entryName = entry.replace(extractor[1], "");
                if (entryName[0] == ":") entryName = entryName.slice(1);

                extracted.add(entryName);
                return "";
            };

            // Remove entity from entry string and add it to the extracted entities object.
            this.entry = this.entry.replace(extractor[0], matcher);

            // If extracted at least one entity, add extracted objects to global variable.
            if (extracted.size) this.extracted[extractor[1]] = Array.from(extracted);
        });

        // Clean resulting entry string.
        this.entry = this.entry.replace(/\s{2,}/g, " ").trim();
        return { entry: this.entry, extracted: this.extracted };
    }

    /**
     * Attach regular expression extractor to current instance.
     * @param {RegExp | [RegExp, string]} extractors list of extractors
     * to be attached.
     * @return {this} StringExtractor instance.
     */
    public attach (...extractors: (RegExp | [ RegExp, string ])[]): this {
        // Iterate over provided extractors
        extractors.forEach(extractor => {
            // Get regular expression name from first symbol
            if (!Array.isArray(extractor)) this.extractors.push([
                extractor, String(extractor).replace(/[\\]/g, "")[1] as string
            ]);
            else this.extractors.push(extractor);
        });

        return this;
    }
}
