/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility function to clean up a string with or
 * without a regular expression.
 *
 * @param {string} entry string to process.
 * @param {RegExp} cleanRegexp regular expression.
 * @return {string} clean string.
 */
function cleanString (entry: string, cleanRegexp?: RegExp): string {
    let result = entry.trim().replace(/\s{2,}/g, " ");

    if (cleanRegexp) result = result.replace(cleanRegexp, "");
    return result;
}

export default cleanString;
