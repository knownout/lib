/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import mergeStringArray from "../functions/mergeStringArray";
import StringExtractor from "./StringExtractor";

/**
 * Utility class for modifying strings with special properties.
 */
export default class StringProcessor
{
    private extractorInstance?: StringExtractor;

    /**
     * Utility class for modifying strings with special properties.
     * @param {string} entry string to be processed.
     */
    public constructor (public entry: string) {
        this.entry = entry.replace(/\s{2,}/g, " ").trim();
    }

    /**
     * Get StringExtractor instance from current entry.
     * @return {StringExtractor} StringExtractor instance.
     */
    public get extractor (): StringExtractor {
        if (!this.extractorInstance) this.extractorInstance = new StringExtractor(this.entry);
        return this.extractorInstance;
    }

    /**
     * Generate words list from current entry.
     * @return {string[]} generated words list.
     */
    public get wordsList (): string[] {
        return this.entry.split(" ")
            .map(word => word.replace(/\s{2, }/g, " ").trim())
            .filter(word => word.length > 0);
    }

    /**
     * Remove duplicate words from entry using
     * `mergeStringArray` utility function.
     *
     * _This method will return class instance, result can be
     * accessed from `entry` field._
     *
     * _This method uses the slow (currently) mergeStringArray function
     * and should not be used with large datasets._
     *
     * @return {this} StringProcessor instance.
     */
    public get removeDuplicates (): StringProcessor {
        this.entry = mergeStringArray(this.wordsList).map(word => {
            if (Array.isArray(word)) return word[0];
            else return word;
        }).join(" ");

        return this;
    }

    /**
     * Limit words count in current entry.
     *
     * _This method will return class instance, result can be
     * accessed from `entry` field._
     *
     * @param {number} limit max words count.
     * @param {boolean} ellipsis add ellipsis if words count exceed limit.
     * @param numbers count numbers as words.
     * @return {this} StringProcessor instance.
     */
    public limitWordsCount (limit: number, ellipsis: boolean = true, numbers = true): StringProcessor {
        // Get words array from current entry.
        let wordsArray = !numbers
            ? this.wordsList.filter(word => word.replace(/[0-9]/g, "").length > 0)
            : this.wordsList;

        // Converting limited words array to string.
        let limited = wordsArray.slice(0, limit).join(" ");

        // Removing trailing characters.
        if ([ ",", "." ].includes(limited.slice(-1)))
            limited = limited.slice(0, limited.length - 1);

        // If the limit is exceeded, add an ellipsis
        if (wordsArray.length > limit) {
            if (ellipsis) limited += "...";
            while (limited.slice(-4) == "....")
                limited = limited.slice(0, limited.length - 1);
        }

        this.entry = limited;
        return this;
    }

    /**
     * Apply regular expressions or strings as filters (like word filter) to the
     * current entry.
     *
     * _This method will return class instance, result can be
     * accessed from `entry` field._
     *
     * @param {RegExp | string} filters list of filters to apply.
     * @return {this} StringProcessor instance.
     */
    public filter (...filters: (RegExp | string)[]): StringProcessor {
        filters.forEach(filter => {
            const clean = typeof filter === "string"
                ? this.wordsList.filter(word => this.hardClean(word) != this.hardClean(filter))
                : this.wordsList.filter(word => word.replace(filter, "").length > 0);

            this.entry = clean.join(" ").replace(/\s{2,}/g, "").trim();
        });

        return this;
    }

    /**
     * Internal hard cleaning words utility function
     * for better comparison.
     *
     * @internal
     * @param {string} word string to process.
     * @return {string} cleaned string.
     */
    private readonly hardClean = (word: string) => word
        .replace(/[^A-zА-я0-9]/gi, " ")
        .trim().toLocaleLowerCase();
}
