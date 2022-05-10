/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility function to limit a certain number to an upper and lower bound.
 * @param {number} value certain number.
 * @param top upper bound.
 * @param bottom lower bound.
 * @return {number} generated number.
 */
function limitNumber (value: number, top?: number | null, bottom?: number | null): number {
    const isNumber = (value: any) => Number.isInteger(value) || Number.isFinite(value);

    // Show warning if upper and lower bounds are the same
    if (isNumber(top) && top === bottom) console.warn("It makes no sense to "
        + "set the value of the lower and upper limits, in this case the function will not "
        + "work correctly");

    let result = value;

    if (isNumber(bottom) && result < bottom) result = bottom;
    if (isNumber(top) && result > top) result = top;

    return result;
}

export default limitNumber;
