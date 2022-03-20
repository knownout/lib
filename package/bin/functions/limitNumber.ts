/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility function to limit a certain number to an upper and lower bound.
 * @param {number} value certain number.
 * @param {{top?: number, bottom?: number}} options set lower or upper bound.
 * @return {number} generated number.
 */
function limitNumber (value: number, options: { top?: number, bottom?: number }): number {
    // Show warning if upper and lower bounds are the same
    if (options.top === options.bottom) console.warn("It makes no sense to "
        + "set the value of the lower and upper limits, in this case the function will not "
        + "work correctly");

    let result = value;

    // @ts-ignore
    if (Number.isInteger(options.bottom) && result < options.bottom) result = options.bottom;
    // @ts-ignore
    if (Number.isInteger(options.top) && result > options.top) result = options.top;

    return result;
}

export default limitNumber;
