/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * An add-on over the native browser storage. Provides simplified
 * interaction interface (slower than native due to JSON transformations).
 */
export default class CacheController
{
    /**
     * An add-on over the native browser storage. Provides simplified
     * interaction interface (slower than native due to JSON transformations).
     * @param {Storage} storage browser storage entity.
     */
    public constructor (public readonly storage: Storage) {}

    /**
     * Get item from defined browser storage by a specific key and parse
     * item data like JSON content.
     *
     * @param key storage key (cacheKeysList).
     */
    public getItem<T = any> (key: string): false | T {
        if (!this.exist(key)) return false;
        try {
            return JSON.parse(this.storage.getItem(key) as string);
        } catch { return false; }
    }

    /**
     * Stringify provided value and write it to the
     * defined browser storage.
     *
     * @param key storage key (cacheKeysList).
     * @param value storage value.
     * @return {this} CacheController instance.
     */
    public setItem<T = any> (key: string, value: T): this {
        this.storage.setItem(key, JSON.stringify(value));
        return this;
    }

    /**
     * Remove item from defined browser storage.
     * @param key storage key.
     * @return {this} CacheController instance.
     */
    public removeItem (key: string): this {
        this.storage.removeItem(key);
        return this;
    }

    /**
     * Check if specific key exists in the defined storage.
     * @param key storage key.
     * @return {boolean} key existing state.
     */
    public exist (key: string): boolean { return Boolean(this.storage.getItem(key)); }
}
