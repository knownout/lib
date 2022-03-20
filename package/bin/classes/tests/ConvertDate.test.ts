/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import DateConverter from "../DateConverter";

describe("DateConverter class complex test", () => {
    const dateObject = new Date();

    const fromDate = new DateConverter(dateObject),
        fromTimestamp = new DateConverter(1647464631);

    it("Date object creation test", () => {
        expect(fromDate.entry.getTime()).toEqual(dateObject.getTime());
        expect(Number.parseInt(String(fromTimestamp.entry.getTime() / 1000)))
            .toEqual(1647464631);
    });

    it("Date conversion to readable format test", () => {
        expect(fromTimestamp.toReadable()).toEqual("16 марта 2022");
    });

    it("Timestamp conversion test", () => {
        expect(Number.parseInt(String(new DateConverter(1647464631).entry.getTime() / 1000))).toEqual(
            Number.parseInt(String(new DateConverter(1647464631947, false).entry.getTime() / 1000))
        );

        expect(fromTimestamp.toUnixTimestamp).toEqual(1647464631);
    });
});
