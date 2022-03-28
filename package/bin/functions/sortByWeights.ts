/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import computeArrayWeights from "./computeArrayWeights";

/**
 * Sort strings array by items weight based on a query
 * (using computeArrayWeights function)
 * @param {string} query string to compare with.
 * @param {string[]} array string array to be sorted.
 * @return {string[]} sorted array.
 */
function sortByWeights (query: string, array: string[]): string[] {
    const weights = computeArrayWeights(query, array);

    return array.sort((a, b) => {
        const weightA = weights[array.indexOf(a)] as number,
            weightB = weights[array.indexOf(b)] as number;

        return weightA > weightB ? 1 : weightA == weightB ? 0 : -1;
    });
}

export default sortByWeights;
