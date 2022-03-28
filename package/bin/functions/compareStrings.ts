/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import cleanString from "./cleanString";
import computeProgress from "./computeProgress";

/**
 * Utility function for hard or soft
 * comparison of two strings.
 *
 * @param {string} a first string.
 * @param {string} b second string.
 * @return {{result: boolean, weight: number}} comparison result and weight.
 */
function compareStrings (a: string, b: string): { result: boolean, weight: number } {
    let _a = cleanString(a).toLocaleLowerCase().replace(/[^A-z0-9 ]/g, ""),
        _b = cleanString(b).toLocaleLowerCase().replace(/[^A-z0-9 ]/g, "");

    const minLength = Math.min(_a.length, _b.length);
    const charCodes: [ number[], number[] ] = [
        _a.slice(0, minLength).split("").map(e => e.charCodeAt(0)),
        _b.slice(0, minLength).split("").map(e => e.charCodeAt(0))
    ];

    let difference = charCodes.reduce((a, b) =>
        a.map((e, i) => Math.abs(e - (b as any)[i])));

    const weight = computeProgress(difference.reduce((a, b) => a + b) / difference.length,
        charCodes.map(e => e.reduce((a, b) => a + b)).reduce((a, b) => a + b));

    return {
        result: weight < 0.155,
        weight
    };
}

export default compareStrings;
