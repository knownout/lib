/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import compareStrings from "./compareStrings";

/**
 * Compute weights for each array element based on a query.
 * @param {string} query string to compare with.
 * @param {string[]} array values list.
 * @return {number[]} weights list.
 */
function computeArrayWeights (query: string, array: string[]) {
    return Array(array.length).fill(0)
        .map((item, index) => compareStrings(array[index], query).weight);
}

export default computeArrayWeights;
