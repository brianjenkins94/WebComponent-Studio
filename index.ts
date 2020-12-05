import { NodeTagNameMap } from "./nodes";
import type { HTMLElementAttributesMap } from "./types/attributes";

// SOURCE: https://www.w3.org/TR/selectors-3/#lex
const CSS_SELECTOR = /^(?:#|\.)-?(?:[_a-z]|[\240-\377]|[0-9a-f]{1,6})(?:[_a-z0-9-]|[\240-\377]|[0-9a-f]{1,6})*$/i;

// SOURCE: https://tools.ietf.org/html/rfc3986#appendix-B
const URL_PATHNAME = /(?:[^?#]*)(?:\\?(?:[^#]*))?(?:#(?:.*))?$/i;

// eslint-disable-next-line complexity, no-underscore-dangle
function createPrimitive<NodeTagName extends keyof typeof NodeTagNameMap>(tagName: NodeTagName): typeof NodeTagNameMap[NodeTagName] {
	switch (tagName) {

		/**
		 * Text-level
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, textContent: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, textContent?: string, extras: object): NodeTagNameMap[NodeTagName]
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
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], textContent?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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
					return NodeTagNameMap[tagName](textContent, extras);
				} else if (typeof textContent === "object") {
					extras = { ...textContent, ...extras };
				}

				// extras

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * Label
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors): NodeTagNameMap[NodeTagName]
		 * (selectors?, for, textContent): NodeTagNameMap[NodeTagName]
		 * (selectors?, for, textContent, extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "label":
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], forValue?: string | HTMLElementAttributesMap[NodeTagName], textContent?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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

				return NodeTagNameMap[tagName](forValue, textContent, extras);
			};

		/**
		 * Embedded
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, sources: string | string[]): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, sources?: string | string[], extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "audio":
		case "img":
		case "picture":
		case "video":
			return function(selectors?: string | string[] | HTMLElementAttributesMap[NodeTagName], sources?: string | string[] | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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
					return NodeTagNameMap[tagName](sources, extras);
				} else if (typeof sources === "object") {
					extras = { ...sources, ...extras };
				}

				// extras

				return NodeTagNameMap[tagName](undefined, extras);
			};

		/**
		 * Grouping (+Sectioning/Form-associated)
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, extras: object): NodeTagNameMap[NodeTagName]
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
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * IFrame, Image
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, source: string[]): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, source?: string[], extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "iframe":
		case "image":
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], source?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * Field Set
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, legend: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, legend?: string, extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "fieldset":
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], legend?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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
					return NodeTagNameMap[tagName](legend, extras);
				} else {
					extras = { ...legend, ...extras };
				}

				// extras

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * Form
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, method: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, method?: string, action: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, method?: string, action?: string, encoding: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, method?: string, action?: string, encoding?: string, extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "form":
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], method?: string | HTMLElementAttributesMap[NodeTagName], action?: string | HTMLElementAttributesMap[NodeTagName], encoding?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * Button-like
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, value: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, value?: string, extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "button[type=button]":
			if (tagName === "button[type=button]") {
				tagName = "button";
			}
		case "button[type=reset]":
			if (tagName === "button[type=reset]") {
				tagName = "reset";
			}
		case "button":
		case "button[type=submit]":
			if (tagName === "button[type=submit]") {
				tagName = "submit";
			}
		case "submit":
		case "input[type=button]":
			if (tagName === "input[type=button]") {
				tagName = "inputButton";
			}
		case "input[type=reset]":
			if (tagName === "input[type=reset]") {
				tagName = "inputReset";
			}
		case "reset":
		case "input[type=submit]":
			if (tagName === "input[type=submit]") {
				tagName = "inputSubmit";
			}
		case "search":
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], value?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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
					return NodeTagNameMap[tagName](value, extras);
				} else if (typeof value === "object") {
					extras = { ...value, ...extras };
				}

				// extras

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * File
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, name: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, name?: string, accept: string | string[]): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, name?: string, accept?: string | string[], required: boolean): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, name?: string, accept?: string | string[], required?: boolean, extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "file":
			return function(selectors?: string | boolean | HTMLElementAttributesMap[NodeTagName], name?: string | boolean | HTMLElementAttributesMap[NodeTagName], accept?: string | boolean | HTMLElementAttributesMap[NodeTagName], required?: string | boolean | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * Input
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, name: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, name?: string, value: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, name?: string, value?: string, required: boolean): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, name?: string, value?: string, required?: boolean, extras: object): NodeTagNameMap[NodeTagName]
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
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], name?: string | HTMLElementAttributesMap[NodeTagName], value?: string | HTMLElementAttributesMap[NodeTagName], required?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * Select
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, options: object[]): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, options?: object[], extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "select":
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], options?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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
					return NodeTagNameMap[tagName](extras).push(options);
				} else if (typeof options === "object") {
					extras = { ...options, ...extras };
				}

				// extras

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * Figure
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, figcaption: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, figcaption?: string, extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "figure":
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], figcaption?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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
					return NodeTagNameMap[tagName](figcaption, extras);
				} else if (typeof figcaption === "object") {
					extras = { ...figcaption, ...extras };
				}

				// extras

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * Details
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, summary: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, summary?: string, extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "details":
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], summary?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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

					return NodeTagNameMap[tagName]();
				} else {
					summary = selectors;
				}

				// summary

				if (summary !== undefined && typeof summary === "string") {
					return NodeTagNameMap[tagName](summary, extras);
				} else if (typeof summary === "object") {
					extras = { ...summary, ...extras };
				}

				// extras

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * Table
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, caption: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, caption?: string, extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "table":
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], caption?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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
					return NodeTagNameMap[tagName](caption, extras);
				} else if (typeof caption === "object") {
					extras = { ...caption, ...extras };
				}

				// extras

				return NodeTagNameMap[tagName](extras);
			};

		/**
		 * Anchor
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selectors: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, href): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, textContent?: string, href: string): NodeTagNameMap[NodeTagName]
		 * (selectors?: string, textContent?: string, href?: string, extras: object): NodeTagNameMap[NodeTagName]
		 */
		case "a":
			return function(selectors?: string | HTMLElementAttributesMap[NodeTagName], textContent?: string | HTMLElementAttributesMap[NodeTagName], href?: string | HTMLElementAttributesMap[NodeTagName], extras: HTMLElementAttributesMap[NodeTagName] = {}) {
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
					return NodeTagNameMap[tagName](textContent, href, extras);
				} else {
					href = textContent;
				}

				// href

				if (href !== undefined && typeof href === "string" && URL_PATHNAME.test(href)) {
					return NodeTagNameMap[tagName](href, href, extras);
				} else if (typeof textContent === "object") {
					extras = { ...textContent, ...extras };
				}

				// extras

				return NodeTagNameMap[tagName](extras);
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

export const button = createPrimitive("button");
globalThis.button = button;
export const reset = createPrimitive("reset");
globalThis.reset = reset;
export const submit = createPrimitive("submit");
globalThis.submit = submit;
export const inputButton = createPrimitive("inputButton");
globalThis.inputButton = inputButton;
export const inputReset = createPrimitive("inputReset");
globalThis.inputReset = inputReset;
export const inputSubmit = createPrimitive("inputSubmit");
globalThis.inputSubmit = inputSubmit;
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
