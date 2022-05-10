/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import mergeObjects, { TObject } from "./mergeObjects";

/**
 * Utility function to merge array entries that go sequentially.
 *
 *
 * _This is not a standalone function, it is just an add-on to the mergeObject function,
 * so it may be slower than the standalone version
 * (maybe I'll rewrite this function later, now I too lazy)._
 *
 * _This function does not affect the original object._
 * @param {string[]} array strings array.
 * @param {number} minMergeLimit minimum objects in sequence to be merged.
 * @return {string[]} generated array with merged entities.
 */
export default function mergeStringArray (array: string[], minMergeLimit: number = 2): string[] {
    // Converting array elements to objects.
    let generated: (TObject | TObject[])[] = array.map(item => ({ value: item }));

    // Merging each unique sequence of entities (this can be slow).
    Array.from(new Set(array)).forEach(entry =>
        generated = mergeObjects(generated, { value: entry }, minMergeLimit));

    return generated.map(item => Array.isArray(item)
        ? item.map(e => e.value) : item.value) as string[];
}
