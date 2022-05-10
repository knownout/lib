/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility function to rotate array entries.
 *
 * _This function does not affect the original array._
 *
 * @param {any[]} array entry array (stay the same).
 * @param right
 * @param steps rotations count.
 * @return {any[]} rotated array.
 */
export default function rotateArray<T = unknown[]> (array: T, right = true, steps = 1): T {
    const rotate = (array: any[], right: boolean) => {
        if (right) return [
            array.slice(-1)[0],
            ...array.slice(0, -1)
        ];

        return [
            ...array.slice(1),
            array[0]
        ];
    };

    let rotated = rotate(array as any, right);
    if (steps - 1 > 0) for (let i = 0; i < steps - 1; i++)
        rotated = rotate(rotated, right);

    return rotated as any as T;
}
