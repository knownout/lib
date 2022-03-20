/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility class for easily creating and
 * manipulating HTML elements.
 */
export default class MakeElement<K extends keyof HTMLElementTagNameMap>
{
    /**
     * Native HTML element
     */
    public readonly native: HTMLElementTagNameMap[K];

    /**
     * Utility class for easily creating and
     * manipulating HTML elements.
     * @param tag element tag.
     */
    public constructor (tag: K) {
        this.native = document.createElement(tag);
    }

    /**
     * Get element innerText attribute value.
     * @return {string} element innerText.
     */
    public get text () { return this.native.innerText; }

    /**
     * Set element innerText attribute value.
     * @param {string} value new innerText value.
     */
    public set text (value: string) { this.native.innerText = value; }

    /**
     * Get element innerHTML attribute value.
     * @return {string} element innerHTML.
     */
    public get html () { return this.native.innerHTML; }

    /**
     * Set element innerHTML attribute value.
     * @param {string} value new innerHTML value.
     */
    public set html (value: string) { this.native.innerHTML = value; }

    /**
     * Get element textContent attribute value.
     * @return {string} element textContent.
     */
    public get textContent () { return this.native.textContent || ""; }

    /**
     * Set element textContent attribute value.
     * @param {string} value new textContent value.
     */
    public set textContent (value: string) { this.native.textContent = value; }

    /**
     * Access to element setter functions.
     * @return {
     *  {
     *      html: (value: string) => MakeElement,
     *      textContent: (value: string) => MakeElement,
     *      text: (value: string) => MakeElement}
     *  } element setters.
     */
    public get set () {
        const self = this;
        const fn = (cb: Function) => {
            cb();
            return self;
        };

        return {
            /**
             * Set element innerText attribute value
             * @param {string} value new innerText value
             */
            text: (value: string) => fn(() => self.native.innerText = value),

            /**
             * Set element innerHTML attribute value
             * @param {string} value new innerHTML value
             */
            html: (value: string) => fn(() => self.native.innerHTML = value),

            /**
             * Set element textContent attribute value
             * @param {string} value new innerHTML value
             */
            textContent: (value: string) => fn(() => self.native.textContent = value)
        };
    }

    /**
     * Access to removing functions.
     * @return {{attribute: (key: string) => MakeElement, element: () => void}} removing functions.
     */
    public get remove () {
        const self = this;
        const fn = (cb: Function) => {
            cb();
            return self;
        };

        return {
            /**
             * Remove element attribute by its name.
             * @param {string} key attribute name.
             * @return {MakeElement}
             */
            attribute: (key: string) => fn(() => self.native.removeAttribute(key)),

            /**
             * Delete the element itself
             */
            element: () => self.native.remove()
        };
    }

    /**
     * Get element attribute value by attribute name.
     * @param {string} key attribute name.
     * @return {string} attribute value.
     */
    public attribute (key: string): string

    /**
     * Set element attribute value by attribute name.
     * @param {string} key attribute name.
     * @param {string} value new attribute value.
     * @return {MakeElement}
     */
    public attribute (key: string, value: string): MakeElement<K>;

    public attribute (key: string, value?: string): MakeElement<K> | string {
        if (value) this.native.setAttribute(key, value);
        else return this.native.getAttribute(key) || String();

        return this;
    }
}
