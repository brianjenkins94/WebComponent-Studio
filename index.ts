/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NodeTagNameMap } from "./nodes";
import type { ExtendedHTMLElementAttributesMap } from "./types/attributes";
import type { ExtendedTopLevelHTMLElement } from "./types/elements";

// SOURCE: https://www.w3.org/TR/selectors-3/#lex
const CSS_SELECTOR = /^(?:#|\.)-?(?:[_a-z]|[\240-\377]|[0-9a-f]{1,6})(?:[_a-z0-9-]|[\240-\377]|[0-9a-f]{1,6})*$/i;

// SOURCE: https://tools.ietf.org/html/rfc3986#appendix-B
const URL_PATHNAME = /(?:[^?#]*)(?:\\?(?:[^#]*))?(?:#(?:.*))?$/i;

// eslint-disable-next-line complexity
function createPrimitive(tagName: keyof ExtendedTopLevelHTMLElement) {
	switch (tagName) {

		/**
		 * Text-level
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, textContent: string): NodeTagNameMap[tagName]
		 * (selectors?: string, textContent?: string, extras: object): NodeTagNameMap[tagName]
		 */
		case "b":
		case "blockquote":
		case "code":
		case "del":
		case "em":
		case "h1":
		case "h2":
		case "h3":
		case "h4":
		case "h5":
		case "h6":
		case "i":
		case "ins":
		case "kbd":
		case "li":
		case "mark":
		case "p":
		case "pre":
		case "q":
		case "s":
		case "small":
		case "span":
		case "strong":
		case "sub":
		case "sup":
		case "u":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], textContent?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					textContent = selectors;
				}

				// textContent

				if (textContent !== undefined && typeof textContent !== "object") {
					return new NodeTagNameMap[tagName](textContent, extras);
				} else if (typeof textContent === "object") {
					extras = { ...textContent, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * Label
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors): NodeTagNameMap[tagName]
		 * (selectors?, for, textContent): NodeTagNameMap[tagName]
		 * (selectors?, for, textContent, extras: object): NodeTagNameMap[tagName]
		 */
		case "label":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], forValue?: string | ExtendedHTMLElementAttributesMap[typeof tagName], textContent?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					forValue = selectors;
					textContent = forValue;
				}

				// extras

				return new NodeTagNameMap[tagName](forValue, textContent, extras);
			};

		/**
		 * Embedded
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, sources: string | string[]): NodeTagNameMap[tagName]
		 * (selectors?: string, sources?: string | string[], extras: object): NodeTagNameMap[tagName]
		 */
		case "audio":
		case "img":
		case "picture":
		case "video":
			return function(selectors?: string | string[] | ExtendedHTMLElementAttributesMap[typeof tagName], sources?: string | string[] | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					// eslint-disable-next-line no-lonely-if
					if (Array.isArray(sources)) {
						sources = selectors;
					} else if (typeof selectors === "string") {
						sources = [selectors];
					}
				}

				// sources

				if (sources !== undefined && Array.isArray(sources)) {
					return new NodeTagNameMap[tagName](sources, extras);
				} else if (typeof sources === "object") {
					extras = { ...sources, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](undefined, extras);
			};

		/**
		 * Grouping (+Sectioning/Form-associated)
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, extras: object): NodeTagNameMap[tagName]
		 */
		case "article":
		case "aside":
		case "br":
		case "canvas":
		case "div":
		case "footer":
		case "header":
		case "hr":
		case "main":
		case "meter":
		case "nav":
		case "ol":
		case "progress":
		case "section":
		case "textarea":
		case "ul":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else if (typeof selectors === "object") {
					extras = { ...selectors, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * IFrame, Image
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, source: string[]): NodeTagNameMap[tagName]
		 * (selectors?: string, source?: string[], extras: object): NodeTagNameMap[tagName]
		 */
		case "iframe":
		case "image":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], source?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					source = selectors;
				}

				// source

				if (typeof source === "string" && URL_PATHNAME.test(source)) {
					extras.src = source;
				} else if (typeof source === "object") {
					extras = { ...source, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * Field Set
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, legend: string): NodeTagNameMap[tagName]
		 * (selectors?: string, legend?: string, extras: object): NodeTagNameMap[tagName]
		 */
		case "fieldset":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], legend?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					legend = selectors;
				}

				// source

				if (typeof legend === "string") {
					return new NodeTagNameMap[tagName](legend, extras);
				} else {
					extras = { ...legend, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * Form
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, method: string): NodeTagNameMap[tagName]
		 * (selectors?: string, method?: string, action: string): NodeTagNameMap[tagName]
		 * (selectors?: string, method?: string, action?: string, encoding: string): NodeTagNameMap[tagName]
		 * (selectors?: string, method?: string, action?: string, encoding?: string, extras: object): NodeTagNameMap[tagName]
		 */
		case "form":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], method?: string | ExtendedHTMLElementAttributesMap[typeof tagName], action?: string | ExtendedHTMLElementAttributesMap[typeof tagName], encoding?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					method = selectors;
				}

				// method

				if (method !== undefined && typeof method === "string" && /^post|get|dialog$/i.test(method)) {
					extras.method = method;
				} else {
					action = method;
				}

				// action

				if (action !== undefined && typeof action === "string" && URL_PATHNAME.test(action)) {
					extras.action = action;
				} else {
					action = encoding;
				}

				// encoding

				if (encoding !== undefined && typeof encoding === "string" && /^application\/x-www-form-urlencoded|multipart\/form-data|text\/plain$/i.test(encoding)) {
					extras.enctype = action;
				} else if (typeof encoding === "object") {
					extras = { ...encoding, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * Button-like
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, value: string): NodeTagNameMap[tagName]
		 * (selectors?: string, value?: string, extras: object): NodeTagNameMap[tagName]
		 */
		case "button[type=button]":
		case "button[type=reset]":
		case "button":
		case "button[type=submit]":
		case "submit":
		case "input[type=button]":
		case "input[type=reset]":
		case "reset":
		case "input[type=submit]":
		case "search":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], value?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					value = selectors;
				}

				// value

				if (value !== undefined && Array.isArray(value)) {
					return new NodeTagNameMap[tagName](value, extras);
				} else if (typeof value === "object") {
					extras = { ...value, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * File
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, name: string): NodeTagNameMap[tagName]
		 * (selectors?: string, name?: string, accept: string | string[]): NodeTagNameMap[tagName]
		 * (selectors?: string, name?: string, accept?: string | string[], required: boolean): NodeTagNameMap[tagName]
		 * (selectors?: string, name?: string, accept?: string | string[], required?: boolean, extras: object): NodeTagNameMap[tagName]
		 */
		case "file":
			return function(selectors?: string | boolean | ExtendedHTMLElementAttributesMap[typeof tagName], name?: string | boolean | ExtendedHTMLElementAttributesMap[typeof tagName], accept?: string | boolean | ExtendedHTMLElementAttributesMap[typeof tagName], required?: string | boolean | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}

					if (extras.id !== undefined) {
						extras.name = extras.id;
					}
				} else {
					name = selectors;
				}

				// name

				if (name !== undefined && typeof name === "string") {
					if (/\w+/i.test(name)) {
						extras.name = name;
					} else if (name.startsWith(".") || name.includes("/")) {
						accept = name;
					}
				} else if (typeof name === "boolean") {
					required = name;
				}

				// accept

				if (accept !== undefined && typeof accept === "string") {
					extras.accept = accept;
				} else {
					required = accept;
				}

				// required

				if (required !== undefined && typeof required === "boolean") {
					extras.required = required;
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * Input
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, name: string): NodeTagNameMap[tagName]
		 * (selectors?: string, name?: string, value: string): NodeTagNameMap[tagName]
		 * (selectors?: string, name?: string, value?: string, required: boolean): NodeTagNameMap[tagName]
		 * (selectors?: string, name?: string, value?: string, required?: boolean, extras: object): NodeTagNameMap[tagName]
		 */
		case "checkbox":
		case "color":
		case "date":
		case "datetime":
		case "email":
		case "hidden":
		case "month":
		case "number":
		case "password":
		case "radio":
		case "range":
		case "tel":
		case "text":
		case "time":
		case "url":
		case "week":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], name?: string | ExtendedHTMLElementAttributesMap[typeof tagName], value?: string | ExtendedHTMLElementAttributesMap[typeof tagName], required?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}

					if (extras.id !== undefined) {
						extras.name = extras.id;
					}
				} else {
					name = selectors;
				}

				// name

				if (name !== undefined && typeof name === "string" && typeof value !== "string") {
					extras.name = name;
				} else if (typeof name === "boolean") {
					value = name;
				}

				// value

				if (value !== undefined && typeof value === "string") {
					extras.value = value;
				} else {
					required = value;
				}

				// required

				if (required !== undefined && typeof required === "boolean") {
					extras.required = required;
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * Select
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, options: object[]): NodeTagNameMap[tagName]
		 * (selectors?: string, options?: object[], extras: object): NodeTagNameMap[tagName]
		 */
		case "select":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], options?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					options = selectors;
				}

				// method

				if (options !== undefined && Array.isArray(options)) {
					return new NodeTagNameMap[tagName](extras).push(options);
				} else if (typeof options === "object") {
					extras = { ...options, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * Figure
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors): NodeTagNameMap[tagName]
		 * (selectors?: string, figcaption: string): NodeTagNameMap[tagName]
		 * (selectors?: string, figcaption?: string, extras: object): NodeTagNameMap[tagName]
		 */
		case "figure":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], figcaption?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					figcaption = selectors;
				}

				// figcaption

				if (figcaption !== undefined && typeof figcaption === "string") {
					return new NodeTagNameMap[tagName](figcaption, extras);
				} else if (typeof figcaption === "object") {
					extras = { ...figcaption, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * Details
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, summary: string): NodeTagNameMap[tagName]
		 * (selectors?: string, summary?: string, extras: object): NodeTagNameMap[tagName]
		 */
		case "details":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], summary?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}

					return new NodeTagNameMap[tagName]();
				} else {
					summary = selectors;
				}

				// summary

				if (summary !== undefined && typeof summary === "string") {
					return new NodeTagNameMap[tagName](summary, extras);
				} else if (typeof summary === "object") {
					extras = { ...summary, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * Table
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, caption: string): NodeTagNameMap[tagName]
		 * (selectors?: string, caption?: string, extras: object): NodeTagNameMap[tagName]
		 */
		case "table":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], caption?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					caption = selectors;
				}

				// caption

				if (caption !== undefined && typeof caption === "string") {
					return new NodeTagNameMap[tagName](caption, extras);
				} else if (typeof caption === "object") {
					extras = { ...caption, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};

		/**
		 * Anchor
		 *
		 * (): NodeTagNameMap[tagName]
		 * (selectors: string): NodeTagNameMap[tagName]
		 * (selectors?: string, href): NodeTagNameMap[tagName]
		 * (selectors?: string, textContent?: string, href: string): NodeTagNameMap[tagName]
		 * (selectors?: string, textContent?: string, href?: string, extras: object): NodeTagNameMap[tagName]
		 */
		case "a":
			return function(selectors?: string | ExtendedHTMLElementAttributesMap[typeof tagName], textContent?: string | ExtendedHTMLElementAttributesMap[typeof tagName], href?: string | ExtendedHTMLElementAttributesMap[typeof tagName], extras: ExtendedHTMLElementAttributesMap[typeof tagName] = {}) {
				if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|\./g)) {
						if (selector.startsWith("#")) {
							extras.id = selector;
						} else if (selector.startsWith(".")) {
							if (extras.class === undefined) {
								extras.class = "";
							}

							extras.class += " " + selector;
						}
					}
				} else {
					textContent = selectors;
				}

				// textContent

				if (textContent !== undefined && typeof textContent === "string") {
					return new NodeTagNameMap[tagName](textContent, href, extras);
				} else {
					href = textContent;
				}

				// href

				if (href !== undefined && typeof href === "string" && isUrl(href)) {
					return new NodeTagNameMap[tagName](href, href, extras);
				} else if (typeof textContent === "object") {
					extras = { ...textContent, ...extras };
				}

				// extras

				return new NodeTagNameMap[tagName](extras);
			};
		default:
			throw new Error("Unrecognized element `" + tagName + "`.");
	}
}

export const b = createPrimitive("b");
globalThis.b = b;
export const blockquote = createPrimitive("blockquote");
globalThis.blockquote = blockquote;
export const code = createPrimitive("code");
globalThis.code = code;
export const del = createPrimitive("del");
globalThis.del = del;
export const em = createPrimitive("em");
globalThis.em = em;
export const h1 = createPrimitive("h1");
globalThis.h1 = h1;
export const h2 = createPrimitive("h2");
globalThis.h2 = h2;
export const h3 = createPrimitive("h3");
globalThis.h3 = h3;
export const h4 = createPrimitive("h4");
globalThis.h4 = h4;
export const h5 = createPrimitive("h5");
globalThis.h5 = h5;
export const h6 = createPrimitive("h6");
globalThis.h6 = h6;
export const i = createPrimitive("i");
globalThis.i = i;
export const ins = createPrimitive("ins");
globalThis.ins = ins;
export const kbd = createPrimitive("kbd");
globalThis.kbd = kbd;
export const li = createPrimitive("li");
globalThis.li = li;
export const mark = createPrimitive("mark");
globalThis.mark = mark;
export const p = createPrimitive("p");
globalThis.p = p;
export const pre = createPrimitive("pre");
globalThis.pre = pre;
export const q = createPrimitive("q");
globalThis.q = q;
export const s = createPrimitive("s");
globalThis.s = s;
export const small = createPrimitive("small");
globalThis.small = small;
export const span = createPrimitive("span");
globalThis.span = span;
export const strong = createPrimitive("strong");
globalThis.strong = strong;
export const sub = createPrimitive("sub");
globalThis.sub = sub;
export const sup = createPrimitive("sup");
globalThis.sup = sup;
export const u = createPrimitive("u");
globalThis.u = u;

export const label = createPrimitive("label");
globalThis.label = label;

export const audio = createPrimitive("audio");
globalThis.audio = audio;
export const img = createPrimitive("img");
globalThis.img = img;
export const picture = createPrimitive("picture");
globalThis.picture = picture;
export const video = createPrimitive("video");
globalThis.video = video;

export const article = createPrimitive("article");
globalThis.article = article;
export const aside = createPrimitive("aside");
globalThis.aside = aside;
export const br = createPrimitive("br");
globalThis.br = br;
export const canvas = createPrimitive("canvas");
globalThis.canvas = canvas;
export const div = createPrimitive("div");
globalThis.div = div;
export const footer = createPrimitive("footer");
globalThis.footer = footer;
export const header = createPrimitive("header");
globalThis.header = header;
export const hr = createPrimitive("hr");
globalThis.hr = hr;
export const main = createPrimitive("main");
globalThis.main = main;
export const meter = createPrimitive("meter");
globalThis.meter = meter;
export const nav = createPrimitive("nav");
globalThis.nav = nav;
export const ol = createPrimitive("ol");
globalThis.ol = ol;
export const progress = createPrimitive("progress");
globalThis.progress = progress;
export const section = createPrimitive("section");
globalThis.section = section;
export const textarea = createPrimitive("textarea");
globalThis.textarea = textarea;
export const ul = createPrimitive("ul");
globalThis.ul = ul;

export const iframe = createPrimitive("iframe");
globalThis.iframe = iframe;

export const fieldset = createPrimitive("fieldset");
globalThis.fieldset = fieldset;

export const form = createPrimitive("form");
globalThis.form = form;

export const button = createPrimitive("button[type=button]");
globalThis.button = button;
export const reset = createPrimitive("button[type=reset]");
globalThis.reset = reset;
export const submit = createPrimitive("button[type=submit]");
globalThis.submit = submit;
export const buttonInput = createPrimitive("input[type=button]");
globalThis.buttonInput = buttonInput;
export const resetInput = createPrimitive("input[type=reset]");
globalThis.resetInput = resetInput;
export const submitInput = createPrimitive("input[type=submit]");
globalThis.submitInput = submitInput;
export const search = createPrimitive("search");
globalThis.search = search;

export const file = createPrimitive("file");
globalThis.file = file;

export const checkbox = createPrimitive("checkbox");
globalThis.checkbox = checkbox;
export const color = createPrimitive("color");
globalThis.color = color;
export const date = createPrimitive("date");
globalThis.date = date;
export const datetime = createPrimitive("datetime");
globalThis.datetime = datetime;
export const email = createPrimitive("email");
globalThis.email = email;
export const hidden = createPrimitive("hidden");
globalThis.hidden = hidden;
export const month = createPrimitive("month");
globalThis.month = month;
export const number = createPrimitive("number");
globalThis.number = number;
export const password = createPrimitive("password");
globalThis.password = password;
export const radio = createPrimitive("radio");
globalThis.radio = radio;
export const range = createPrimitive("range");
globalThis.range = range;
export const tel = createPrimitive("tel");
globalThis.tel = tel;
export const text = createPrimitive("text");
globalThis.text = text;
export const time = createPrimitive("time");
globalThis.time = time;
export const url = createPrimitive("url");
globalThis.url = url;
export const week = createPrimitive("week");
globalThis.week = week;

export const select = createPrimitive("select");
globalThis.select = select;

export const figure = createPrimitive("figure");
globalThis.figure = figure;

export const details = createPrimitive("details");
globalThis.details = details;

export const table = createPrimitive("table");
globalThis.table = table;

export const a = createPrimitive("a");
globalThis.a = a;

//

function createTemplate(tagName) {
	tagName.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

	customElements.define(tagName, target);

	return customElements.get(tagName);
}
