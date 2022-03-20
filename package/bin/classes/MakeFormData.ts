/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility class for creating FormData objects
 * that can be chained.
 */
export default class MakeFormData
{
    /**
     * Native FormData object.
     */
    public readonly entry = new FormData();

    /**
     * Utility class for creating FormData objects
     * that can be chained.
     *
     * @param items items list to be applied to the FormData.
     */
    public constructor (items?: { [key: string]: any }) { if (items) this.add(items); }

    /**
     * Get native FormData object as object suitable for the fetch function.
     */
    public get fetchObject () { return { method: "POST", body: this.entry }; }

    /**
     * An add-on over the native method for adding a FormData object, allows
     * simultaneous application of several elements.
     *
     * @param items items list to be applied.
     * @param forceJson force non-file entries conversion as JSON objects.
     */
    public add (items: { [key: string]: any }, forceJson: boolean = false): MakeFormData {
        // Iterate over provided items
        Object.entries(items).forEach(([ key, value ]) => {
            if (!value || typeof value === "string" && value.trim().length == 0)
                return;

            if (value instanceof File) this.entry.append(key, value);
            else {
                // Stringify element as string or as JSON object
                let stringify = String(value);
                if (stringify == "[object Object]" || forceJson)
                    stringify = JSON.stringify(value);

                this.entry.append(key, stringify);
            }
        });

        return this;
    }

    /**
     * An add-on over the native remove method of the FormData object allows
     * deleting multiple items at the same time.
     * @param items list of items to remove.
     */
    public remove (...items: string[]): MakeFormData {
        items.forEach(item => { if (this.entry.has(item)) this.entry.delete(item); });
        return this;
    }
}
