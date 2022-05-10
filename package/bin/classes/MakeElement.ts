/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

/**
 * Utility class for easily creating and
 * manipulating HTML elements.
 *
 * @deprecated
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
     * Update element innerText attribute.
     * @param {string} value innerText attribute value.
     * @return {MakeElement}
     */
    public setInnerText (value: string): this {
        this.native.innerText = value;
        return this;
    }

    /**
     * Update element innerHTML attribute.
     * @param {string} value innerHTML attribute value.
     * @return {MakeElement}
     */
    public setInnerHTML (value: string): this {
        this.native.innerHTML = value;
        return this;
    }

    /**
     * Update element textContent attribute.
     * @param {string} value textContent attribute value.
     * @return {MakeElement}
     */
    public setTextContent (value: string): this {
        this.native.textContent = value;
        return this;
    }

    /**
     * Remove native element attribute or element itself.
     * @param {Element | string} object attribute name or element.
     */
    public remove (object: Element | string): void {
        if (typeof object === "string") this.native.removeAttribute(object);
        else object.remove();
    }

    /**
     * Get element attribute value by attribute name.
     * @param {string} key attribute name.
     * @return {string} attribute value.
     */
    public attr (key: string): string

    /**
     * Set element attribute value by attribute name.
     * @param {string} key attribute name.
     * @param {string} value new attribute value.
     * @return {MakeElement}
     */
    public attr (key: string, value: string): MakeElement<K>;

    public attr (key: string, value?: string): MakeElement<K> | string {
        if (value) this.native.setAttribute(key, value);
        else return this.native.getAttribute(key) || String();

        return this;
    }
}
