/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import Random from "../Random";

const repeat = (times: number, callback: Function) => { for (let i = 0; i < 10; i++) callback(); };
describe("Random class tests", () => {
    it("String generation test", () => repeat(5, () => {
        expect(Random.string(10).length).toEqual(10);
        expect(Random.string(10).replace(/[A-z0-9]/g, "")).toEqual("");
    }));

    it("Number generation test", () => repeat(10, () => {
        const number = Random.number(8, 10);

        expect(number).toBeGreaterThanOrEqual(8);
        expect(number).toBeLessThanOrEqual(10);
    }));

    it("Array element picker test", () => {
        const array = [ 1, 2, 3, 4, 5, 6 ];

        repeat(10, () => expect(array).toContain(Random.arrayElement(array)));
    });

    it("Instance stubs access test", () => {
        const random = new Random();

        const string = random.string(10),
            number = random.number(8, 10),
            element = random.arrayElement([ 1 ]);

        expect(string.length).toEqual(10);
        expect(number).toBeGreaterThanOrEqual(8);
        expect(number).toBeLessThan(10);
        expect(element).toEqual(1);
    });

    it("Unique values generation test", () => {
        const random = new Random();

        const firstAttempt = random.uniqueValues(1000, () => Random.string(2));
        const secondAttempt = random.uniqueValues(1000, () => Random.string(2));
        const thirdAttempt = random.uniqueValues(1000, () => Random.string(2));

        const container = [
            ...firstAttempt,
            ...secondAttempt,
            ...thirdAttempt
        ];

        expect(container.length).toEqual(new Set(container).size);
    });
});
