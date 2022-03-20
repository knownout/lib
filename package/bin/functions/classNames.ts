/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility function to generate strings of classnames from any objects.
 * @param entries class list entries.
 * @return {string} generated classname string.
 */
function classNames (...entries: any[]): string {
    let classNamesList: string[] = [];
    entries.forEach(entry => {
        if (!entry) return;
        if (typeof entry === "object") {
            // If entry is array, recursively iterate.
            if (Array.isArray(entry)) classNamesList.push(classNames(...entry));

                // If entry is object, add keys to class list only if value can be
            // interpreted as boolean true.
            else Object.entries(entry).forEach(([ key, value ]) =>
                Boolean(value) && classNamesList.push(String(key)));
        } else classNamesList.push(String(entry));
    });

    // Clean class list and return as string
    return classNamesList.map(e => e.replace(/\s{2,}/g, " ").trim())
        .filter(e => e.length > 0).join(" ");
}

export default classNames;
