/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility function to convert date, javascript or unix
 * timestamps to specific forms.
 */
export default class DateConverter
{
    public readonly entry: Date;

    /**
     * Default readable date format with variables
     *
     * _The format argument can handle certain variables, which must
     * be written within curly braces._
     *
     * Available variables: `{day}`, `{year}`, `{month}`, `{hours}`, `{minutes}`, `{seconds}`.
     *
     * @type {string}
     */
    public defaultReadableFormat: string = "{day} {month} {year}";

    /**
     * Utility function to convert date, javascript or unix
     * timestamps to specific forms.
     *
     * @param {Date | string | number} entry timestamp or date object
     * @param {boolean} unix timestamp type
     */
    public constructor (entry: Date | string | number, unix = true) {
        if (entry instanceof Date) this.entry = entry;
        else this.entry = new Date(Number.parseInt(String(entry)) * (unix ? 1000 : 1));
    }

    /**
     * Get generated date object as unix timestamp
     * @return {number}
     */
    public get toUnixTimestamp (): number {
        return Number.parseInt(String(this.entry.getTime() / 1000));
    }

    /**
     * Get generated date object as readable date string.
     *
     * The default date format can be set either by changing the `defaultReadableFormat`
     * variable or by using the `format` argument (the format argument takes precedence).
     *
     * Information about format variables con be found in `defaultReadableFormat` field documentation.
     *
     * @param {TMonthMappings} mappings month name mappings and casing properties.
     * @param {string} format default date format.
     * @return {string} generated readable string.
     */
    public toReadable (mappings: TMonthMappings = russianMonths, format: string = this.defaultReadableFormat): string {
        let readableDateString = format || this.defaultReadableFormat;

        // Get localized month name
        let monthName = mappings.months[this.entry.getMonth()] as string;

        // Changing the ending to case specific
        if (mappings.casing) Object.entries(mappings.casing).forEach(([ literal, replacer ]) =>
            monthName = monthName.replace(new RegExp(literal, "g"), replacer));

        // Shortcut for adding leading zeros
        const padStart = (value: number) => String(value).padStart(2, "0");

        const variables = {
            "day": this.entry.getDate(),
            "year": this.entry.getFullYear(),
            "month": monthName,

            "hours": padStart(this.entry.getHours()),
            "minutes": padStart(this.entry.getMinutes()),
            "seconds": padStart(this.entry.getSeconds())
        };

        Object.entries(variables).forEach(([ variable, replacer ]) =>
            readableDateString = readableDateString.replace(new RegExp(`{${ variable }}`, "g"),
                String(replacer))
        );

        return readableDateString.trim();
    }
}

/**
 * Moths mapping object type
 */
export type TMonthMappings = {
    casing?: { [key: string]: string },
    months: string[]
}

/**
 * ru_RU month name mappings and casing.
 * @type {TMonthMappings}
 */
export const russianMonths: TMonthMappings = {
    casing: {
        "ь": "я",
        "й": "я",
        "т": "та"
    },
    months: [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь"
    ]
};
