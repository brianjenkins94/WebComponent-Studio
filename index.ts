import { NodeTagNameMap } from "./nodes";
import type { EventEmitter } from "./abstract/EventEmitter";
import type { HTMLElementAttributesMap } from "./types/attributes";

// SOURCE: https://www.w3.org/TR/selector-3/#lex
const CSS_SELECTOR = /^(?:(?:#|\.)-?(?:[_a-z]|[\240-\377]|[0-9a-f]{1,6})(?:[_a-z0-9-]|[\240-\377]|[0-9a-f]{1,6})*)+$/i;

// SOURCE: https://tools.ietf.org/html/rfc3986#appendix-B
const URL_PATHNAME = /(?:[^?#]*)(?:\\?(?:[^#]*))?(?:#(?:.*))?$/i;

function parseSelector(selector) {
	let id;
	const classes = [];

	for (const match of selector.split(/(?=#|\.)/)) {
		if (match.startsWith("#")) {
			id = match.substring(1);
		} else if (match.startsWith(".")) {
			classes.push(match.substring(1));
		}
	}

	return {
		"id": id,
		"classes": classes
	};
}

// eslint-disable-next-line complexity
function createPrimitive<NodeTagName extends keyof typeof NodeTagNameMap>(tagName: NodeTagName) /* : typeof NodeTagNameMap[NodeTagName] */ {
	switch (tagName) {

		/**
		 * Text-level
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, textContent: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, textContent?: string, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "b":
		case "blockquote":
		case "button":
		case "button[type=button]":
			if (tagName === "button[type=button]") {
				tagName = "button";
			}
		case "reset":
		case "button[type=reset]":
			if (tagName === "button[type=reset]") {
				tagName = "reset";
			}
		case "submit":
		case "button[type=submit]":
			if (tagName === "button[type=submit]") {
				tagName = "submit";
			}
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
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], textContent?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					textContent = selector;
				}

				// textContent

				if (textContent !== undefined && typeof textContent !== "object") {
					return NodeTagNameMap[tagName](textContent, attributes);
				} else if (typeof textContent === "object") {
					attributes = { ...textContent, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName](attributes);
			};

		/**
		 * Label
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector): NodeTagNameMap[NodeTagName]
		 * (selector?, forValue: string, textContent): NodeTagNameMap[NodeTagName]
		 * (selector?, forValue: string, textContent, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "label":
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], forValue?: string | HTMLElementAttributesMap[NodeTagName], textContent?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					forValue = selector;
					textContent = forValue;
				}

				// extras

				return NodeTagNameMap[tagName](forValue, textContent, attributes);
			};

		/**
		 * Embedded
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, sources: string | string[]): NodeTagNameMap[NodeTagName]
		 * (selector?: string, sources?: string | string[], attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "audio":
		case "img":
		case "picture":
		case "video":
			return function(selector?: string | string[] | HTMLElementAttributesMap[NodeTagName], sources?: string | string[] | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					// eslint-disable-next-line no-lonely-if
					if (Array.isArray(sources)) {
						sources = selector;
					} else if (typeof selector === "string") {
						sources = [selector];
					}
				}

				// sources

				if (sources !== undefined && Array.isArray(sources)) {
					//sources = sources;
				} else if (typeof sources === "object") {
					attributes = { ...sources, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName](sources, attributes);
			};

		/**
		 * Grouping (+Sectioning/Form-associated)
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, attributes: object): NodeTagNameMap[NodeTagName]
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
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else if (typeof selector === "object") {
					attributes = { ...selector, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName](attributes);
			};

		/**
		 * IFrame
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, source: string[]): NodeTagNameMap[NodeTagName]
		 * (selector?: string, source?: string[], attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "iframe":
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], source?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					source = selector;
				}

				// source

				if (typeof source === "string" && URL_PATHNAME.test(source)) {
					attributes.src = source;
				} else if (typeof source === "object") {
					attributes = { ...source, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName](attributes);
			};

		/**
		 * Field Set
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, legend: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, legend?: string, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "fieldset":
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], legend?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					legend = selector;
				}

				// source

				if (typeof legend === "string") {
					return NodeTagNameMap[tagName](legend, attributes);
				} else {
					attributes = { ...legend, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName](attributes);
			};

		/**
		 * Form
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, method: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, method?: string, action: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, method?: string, action?: string, encoding: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, method?: string, action?: string, encoding?: string, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "form":
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], method?: string | HTMLElementAttributesMap[NodeTagName], action?: string | HTMLElementAttributesMap[NodeTagName], encoding?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					method = selector;
				}

				// method

				if (method !== undefined && typeof method === "string" && /^post|get|dialog$/i.test(method)) {
					attributes.method = method;
				} else {
					action = method;
				}

				// action

				if (action !== undefined && typeof action === "string" && URL_PATHNAME.test(action)) {
					attributes.action = action;
				} else {
					action = encoding;
				}

				// encoding

				if (encoding !== undefined && typeof encoding === "string" && /^application\/x-www-form-urlencoded|multipart\/form-data|text\/plain$/i.test(encoding)) {
					attributes.enctype = action;
				} else if (typeof encoding === "object") {
					attributes = { ...encoding, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName](attributes);
			};

		/**
		 * Button-like
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, value: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, value?: string, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "input[type=button]":
			if (tagName === "input[type=button]") {
				tagName = "inputButton";
			}
		case "input[type=reset]":
			if (tagName === "input[type=reset]") {
				tagName = "inputReset";
			}
		case "input[type=submit]":
			if (tagName === "input[type=submit]") {
				tagName = "inputSubmit";
			}
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], value?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					value = selector;
				}

				// value

				if (value !== undefined && typeof value === "string") {
					attributes.value = value;
				} else if (typeof value === "object") {
					attributes = { ...value, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName]({ ...attributes, "type": tagName.substring("input".length).toLowerCase() });
			};

		/**
		 * Search
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, value: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, value?: string, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "search":
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], value?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					value = selector;
				}

				// value

				if (value !== undefined && typeof value === "string") {
					attributes.value = value;
				} else if (typeof value === "object") {
					attributes = { ...value, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName]({ ...attributes, "type": tagName });
			};

		/**
		 * File
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name?: string, accept: string | string[]): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name?: string, accept?: string | string[], required: boolean): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name?: string, accept?: string | string[], required?: boolean, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "file":
			return function(selector?: string | boolean | HTMLElementAttributesMap[NodeTagName], name?: string | boolean | HTMLElementAttributesMap[NodeTagName], accept?: string | boolean | HTMLElementAttributesMap[NodeTagName], required?: string | boolean | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");

					if (attributes.id !== undefined) {
						attributes.name = attributes.id;
					}
				} else {
					name = selector;
				}

				// name

				if (name !== undefined && typeof name === "string") {
					if (/\w+/i.test(name)) {
						attributes.name = name;
					} else if (name.startsWith(".") || name.includes("/")) {
						accept = name;
					}
				} else if (typeof name === "boolean") {
					required = name;
				}

				// accept

				if (accept !== undefined && typeof accept === "string") {
					attributes.accept = accept;
				} else {
					required = accept;
				}

				// required

				if (required !== undefined && typeof required === "boolean") {
					attributes.required = required;
				}

				// extras

				return NodeTagNameMap[tagName]({ ...attributes, "type": tagName });
			};

		/**
		 * Input
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name?: string, value: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name?: string, value?: string, required: boolean): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name?: string, value?: string, required?: boolean, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "checkbox":
		case "color":
		case "date":
		case "datetime":
			if (tagName === "datetime") {
				tagName = "datetime-local";
			}
		case "datetime-local":
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
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], name?: string | HTMLElementAttributesMap[NodeTagName], value?: string | HTMLElementAttributesMap[NodeTagName], required?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");

					if (attributes.id !== undefined) {
						attributes.name = attributes.id;
					}
				} else {
					name = selector;
				}

				// name

				if (name !== undefined && typeof name === "string" && typeof value !== "string") {
					attributes.name = name;
				} else if (typeof name === "boolean") {
					value = name;
				}

				// value

				if (value !== undefined && typeof value === "string" || !isNaN(Number(value))) {
					attributes.value = value;
				} else {
					required = value;
				}

				// required

				if (required !== undefined && typeof required === "boolean") {
					attributes.required = required;
				}

				// extras

				return NodeTagNameMap[tagName]({ ...attributes, "type": tagName });
			};

		/**
		 * Image Input
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, source: string[]): NodeTagNameMap[NodeTagName]
		 * (selector?: string, source?: string[], attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "image":
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], source?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					source = selector;
				}

				// source

				if (typeof source === "string" && URL_PATHNAME.test(source)) {
					attributes.src = source;
				} else if (typeof source === "object") {
					attributes = { ...source, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName]({ ...attributes, "type": tagName });
			};

		/**
		 * Select
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector: string, name: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name?: string, options: object[]): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name?: string, options?: object[], required: boolean): NodeTagNameMap[NodeTagName]
		 * (selector?: string, name?: string, options?: object[], required?: boolean, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "select":
			return function(selector?: string | string[] | boolean | HTMLElementAttributesMap[NodeTagName], name?: string | string[] | boolean | HTMLElementAttributesMap[NodeTagName], options?: string[] | boolean | HTMLElementAttributesMap[NodeTagName], required?: boolean | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					options = selector;
				}

				// name

				if (name !== undefined && typeof name === "string" && typeof options !== "string") {
					attributes.name = name;
				} else if (Array.isArray(name)) {
					options = name;
				}

				// options

				if (options !== undefined && Array.isArray(options)) {
					//options = options;
				} else if (typeof options === "boolean") {
					required = options;
				}

				// required

				if (required !== undefined && typeof required === "boolean") {
					attributes.required = required;
				}

				// extras

				return NodeTagNameMap[tagName](options, { ...attributes, "type": tagName });
			};

		/**
		 * Figure
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector): NodeTagNameMap[NodeTagName]
		 * (selector?: string, figcaption: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, figcaption?: string, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "figure":
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], figcaption?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					figcaption = selector;
				}

				// figcaption

				if (figcaption !== undefined && typeof figcaption === "string") {
					return NodeTagNameMap[tagName](figcaption, attributes);
				} else if (typeof figcaption === "object") {
					attributes = { ...figcaption, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName](attributes);
			};

		/**
		 * Details
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, summary: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, summary?: string, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "details":
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], summary?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");

					if (summary !== undefined && typeof summary === "string") {
						return NodeTagNameMap[tagName](summary, attributes);
					} else if (typeof summary === "object") {
						summary = attributes;
					}

					return NodeTagNameMap[tagName](attributes);
				} else {
					summary = selector;
				}

				// summary

				if (summary !== undefined && typeof summary === "string") {
					return NodeTagNameMap[tagName](summary, attributes);
				} else if (typeof summary === "object") {
					attributes = { ...summary, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName](undefined, attributes);
			};

		/**
		 * Table
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, caption: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, caption?: string, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "table":
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], caption?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					caption = selector;
				}

				// caption

				if (caption !== undefined && typeof caption === "string") {
					return NodeTagNameMap[tagName](caption, attributes);
				} else if (typeof caption === "object") {
					attributes = { ...caption, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName](attributes);
			};

		/**
		 * Anchor
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, href): NodeTagNameMap[NodeTagName]
		 * (selector?: string, textContent?: string, href: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, textContent?: string, href?: string, attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "a":
			return function(selector?: string | HTMLElementAttributesMap[NodeTagName], textContent?: string | HTMLElementAttributesMap[NodeTagName], href?: string | HTMLElementAttributesMap[NodeTagName], attributes: HTMLElementAttributesMap[NodeTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					const { id, classes } = parseSelector(selector);

					attributes.id = id;
					attributes.class = classes && classes.join(" ");
				} else {
					textContent = selector;
				}

				// textContent

				if (textContent !== undefined && typeof textContent === "string") {
					return NodeTagNameMap[tagName](textContent, href, attributes);
				} else {
					href = textContent;
				}

				// href

				if (href !== undefined && typeof href === "string" && URL_PATHNAME.test(href)) {
					return NodeTagNameMap[tagName](href, href, attributes);
				} else if (typeof textContent === "object") {
					attributes = { ...textContent, ...attributes };
				}

				// extras

				return NodeTagNameMap[tagName](attributes);
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
export const inputButton = createPrimitive("input[type=button]");
globalThis.inputButton = inputButton;
export const inputReset = createPrimitive("input[type=reset]");
globalThis.inputReset = inputReset;
export const inputSubmit = createPrimitive("input[type=submit]");
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
export const datetime = createPrimitive("datetime-local");
globalThis.datetime = datetime;
export const email = createPrimitive("email");
globalThis.email = email;
export const hidden = createPrimitive("hidden");
globalThis.hidden = hidden;
export const image = createPrimitive("image");
globalThis.image = image;
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

class FventFmitter {
	private foobar = [];
}

export function createTemplate(tagName: string, options: ElementDefinitionOptions) {
	if (!tagName.includes("-")) {
		tagName += "-component";
	}

	customElements.define(tagName, class extends HTMLElement implements EventEmitter {
		public constructor() {
			super();
		}

		public on(event: string, listener: () => void): () => void {
			throw new Error("Method not implemented.");
		}

		public off(event?: string, listener?: () => void): void {
			throw new Error("Method not implemented.");
		}

		public emit(event: string, ...args: unknown[]): void {
			throw new Error("Method not implemented.");
		}

		public once(event: string, listener: () => void): () => void {
			throw new Error("Method not implemented.");
		}

		public connectedCallback() {

		}

		public disconnectedCallback() {

		}

		public adoptedCallback() {

		}

		public attributeChangedCallback() {

		}
	}, options);

	return function(...args) {
		return new (customElements.get(tagName))(...args);
	};
}
globalThis.createTemplate = createTemplate;
