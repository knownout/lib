/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

type TLimitNumberOptions = Partial<{
    top: number;
    bottom: number;
}>

function limitNumber (value: number, top: TLimitNumberOptions): number

function limitNumber (value: number, top: number, bottom?: number): number

function limitNumber (value: number, top?: number | null, bottom?: number): number

/**
 * Utility function to limit a certain number to an upper and lower bound.
 * @param {number} value certain number.
 * @param top upper bound.
 * @param bottom lower bound.
 * @return {number} generated number.
 */
function limitNumber (value: number, top?: number | TLimitNumberOptions | null, bottom?: number | null): number {
    const isNumber = (value: any) => Number.isInteger(value) || Number.isFinite(value)

    const bounds = {
        top: top && !isNumber(top) ? (top as TLimitNumberOptions).top : (top as number | null),
        bottom: top && !isNumber(top) ? (top as TLimitNumberOptions).bottom : (bottom as number | null)
    }

    // Show warning if upper and lower bounds are the same
    if (bounds.top && bounds.top === bounds.bottom) console.warn("It makes no sense to "
        + "set the value of the lower and upper limits, in this case the function will not "
        + "work correctly")

    let result = value

    if (isNumber(bounds.bottom) && result < bounds.bottom) result = bounds.bottom
    if (isNumber(bounds.top) && result > bounds.top) result = bounds.top

    return result
}

export default limitNumber
