/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility class for generating random values
 */
export default class Random
{
    /**
     * Memorized pattern compilation result.
     * @internal
     * @type {{pattern: string, entries: string[]}}
     * @private
     */
    private static compiledPattern?: {
        pattern: string,
        entries: string[]
    } = undefined;
    /**
     * List of generated values.
     * Used by the unique value generator.
     * @internal
     * @type {Set<string>}
     * @private
     */
    private readonly randomGeneratedList: Set<string> = new Set<string>();

    /**
     * Fixed length random string generator.
     *
     * _The pattern must pass as a string containing values
     * (not longer than two characters) separated by a comma. Each value will either
     * convert to an array of characters (if the length equal 2) or simply passed
     * to the generated array (if the length equal 1)._
     *
     * Pattern conversion examples:
     * - `AD` → `[A, B, C, D]`
     * - `AC,ac` → `[A, B, C, a, b, c]`
     * - `02,AB,@,#` → `[0, 1, 2, A, B, @, #]`
     *
     * @param {number} length generated string length.
     * @param {string} pattern string generation pattern.
     * @returns {string} generated string.
     */
    public static string (length: number, pattern: string = "AZ,az,09"): string {
        const entries = Random.generateEntriesFromPattern(pattern);

        return Array(length).fill(String()).map(() => Random.arrayElement(entries))
            .join("");
    }

    /**
     * Random array element picker.
     * @param {any[]} array source array.
     * @returns {any} random element.
     */
    public static arrayElement<T = unknown> (array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Random number generator with upper and lower bounds.
     * @param {number} min lower bound.
     * @param {number} max upper bound.
     * @returns {number} generated number.
     */
    public static number (min: number, max: number): number {
        const out = Math.random() * (max - min) + min;
        if (Number.isInteger(min) && Number.isInteger(max))
            return Math.round(out);

        return out;
    }

    /**
     * Generate groups of character codes from the provided template and then convert
     * these groups into an array of strings based on character code.
     * @internal
     * @param {string} pattern string pattern.
     * @returns {string[]} generated entries list.
     * @private
     */
    private static generateEntriesFromPattern (pattern: string): string[] {
        // Return memorized value if exists.
        if (this.compiledPattern && this.compiledPattern.pattern == pattern)
            return this.compiledPattern.entries;

        // Split pattern by groups.
        const groups = pattern.split(",").map(item => {
            // If length equal 2, count as characters range ...
            if (item.length == 2) return [ item.charCodeAt(0), item.charCodeAt(1) ]
                .sort((a, b) => a - b);

            // ... otherwise, count just as single character.
            else if (item.length == 1) return [ item.charCodeAt(0) ];

            return null;
        }).filter(Array.isArray);

        const entriesList: string[] = [];

        // Generate symbols from groups.
        groups.forEach(group => {
            // Just generate symbol from character code.
            if (group.length == 1) entriesList.push(String.fromCharCode(group[0]));

            // Generate characters sequence from codes group.
            else for (let i = group[0]; i <= group[1]; i++)
                entriesList.push(String.fromCharCode(i));
        });

        // Memorize compilation result.
        this.compiledPattern = { pattern, entries: entriesList };
        return entriesList;
    }

    /**
     * Unique values generator.
     *
     * Generate unique random values for each instance of the class (so far in one instance
     * unique values will be generated each time)
     *
     * @param {number} count generated elements count.
     * @param {Function} generator random value generator.
     * @returns {Set<any>} generated values set.
     */
    public uniqueValues<T = any> (count: number, generator: Function): Set<T> {
        // List of generated values to return.
        const uniqueValuesList = new Set<T>();

        for (let i = 0; i < count; i++) {
            // Generate random value with provided generator.
            let value = generator();

            // Single value generation attempts counter.
            let attempts = 0;
            while (this.randomGeneratedList.has(value)) {
                // If more than 10k attempts for single value generation, throw error.
                if (attempts > 10000) throw new Error("Cannot generate unique random number after 10000 attempts, " +
                    "try to change function options or increase generated value length");

                attempts++;
                value = generator();
            }

            // Update global values list
            this.randomGeneratedList.add(value);
            uniqueValuesList.add(value);
        }

        return uniqueValuesList;
    }

    /**
     * Fixed length random string generator.
     *
     * _The pattern must pass as a string containing values
     * (not longer than two characters) separated by a comma. Each value will either
     * convert to an array of characters (if the length equal 2) or simply passed
     * to the generated array (if the length equal 1)._
     *
     * Pattern conversion examples:
     * - `AD` → `[A, B, C, D]`
     * - `AC,ac` → `[A, B, C, a, b, c]`
     * - `02,AB,@,#` → `[0, 1, 2, A, B, @, #]`
     *
     * @param {number} length generated string length.
     * @param {string} pattern string generation pattern.
     * @returns {string} generated string.
     */
    public string (length: number, pattern: string = "AZ,az,09"): string {
        return Random.string(length, pattern);
    }

    /**
     * Random array element picker.
     * @param {any[]} array source array.
     * @returns {any} random element.
     */
    public arrayElement<T = unknown> (array: T[]): T {
        return Random.arrayElement(array);
    }

    /**
     * Random number generator with upper and lower bounds.
     * @param {number} min lower bound.
     * @param {number} max upper bound.
     * @returns {number} generated number.
     */
    public number (min: number, max: number): number {
        return Random.number(min, max);
    }
}
