/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import cleanString from "./cleanString";

/**
 * Utility function for hard or soft
 * comparison of two strings.
 *
 * @param {string} a first string.
 * @param {string} b second string.
 * @param {boolean} hard comparison type.
 * @param {RegExp} cleanRegex regular expression to clean up strings.
 * @return {boolean} comparison result.
 */
function compareStrings (a: string, b: string, hard = false, cleanRegex = /[^A-zА-яЁё0-9]/g): boolean {
    const _a = cleanString(a).toLocaleLowerCase(), _b = cleanString(b).toLocaleLowerCase();

    if (!hard) return _a == _b;
    return cleanString(_a, cleanRegex) == cleanString(_b, cleanRegex);
}

export default compareStrings;
