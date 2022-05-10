/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility function to calculate progress from current, min and max values.
 *
 * `Let A — current value`,
 * `B — maximum for current number`,
 * `C — minimum for current number`,
 *
 * **`Then X = ((A — C) * 100) / (B — C)`**
 *
 * @param {number} value current value
 * @param {number} max maximum for current value (default - 100)
 * @param {number} min minimum for current value (default - 0)
 * @return {number} computed progress
 */
function computeProgress (value: number, max = 100, min = 0): number {
    // A - current value
    // B - maximum (for current value)
    // C - minimum (for current value)
    // X = (A * 100) / (B - C)
    return (value * 100) / (max - min);
}

export default computeProgress;
