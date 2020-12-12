/* eslint-disable complexity */

import { ElementTagNameMap } from "./elements";
import { Element } from "./abstract/Element";
import type { ElementAttributesMap } from "./types/attributes";
import type { EventEmitter } from "./abstract/EventEmitter";

const CSS_SELECTOR = /^(?:(?:#|\.)-?(?:[_a-z]|[\240-\377]|[0-9a-f]{1,6})(?:[_a-z0-9-]|[\240-\377]|[0-9a-f]{1,6})*)+$/i;

const URL_PATHNAME = /(?:[^?#]*)(?:\\?(?:[^#]*))?(?:#(?:.*))?$/i;

function parseSelector(selector) {
	const selectors = {};

	for (const match of selector.split(/(?=#|\.)/)) {
		if (match.startsWith("#")) {
			selectors["id"] = match.substring(1);
		} else if (match.startsWith(".")) {
			if (selectors["class"] === undefined) {
				selectors["class"] = match.substring(1);
			} else {
				selectors["class"] += " " + match.substring(1);
			}
		}
	}

	return selectors;
}

function createPrimitive<ElementTagName extends keyof typeof ElementTagNameMap>(tagName: ElementTagName) /* : typeof NodeTagNameMap[NodeTagName] */ {
	switch (tagName) {

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
			return function(selector?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], textContent?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], href?: string | ElementAttributesMap[ElementTagName], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
				} else {
					textContent = selector;
				}

				// textContent

				if (textContent !== undefined && ((typeof textContent === "string") || (typeof textContent === "object" && textContent instanceof Element))) {
					textContent = [textContent];
				} else if (textContent !== undefined && Array.isArray(textContent)) {
					//textContent = textContent;
				} else {
					href = textContent;

					textContent = undefined;
				}

				// href

				if (href !== undefined && typeof href === "string" && URL_PATHNAME.test(href)) {
					attributes.href = href;

					if (textContent === undefined) {
						textContent = [href];
					}
				} else if (href !== undefined && typeof href === "object") {
					attributes = { ...attributes, ...href };

					href = [];
				}

				// attributes

				return ElementTagNameMap[tagName](textContent, attributes);
			};

		/**
		 * Details
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, summary: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, summary?: string, children: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 * (selector?: string, summary?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "details":
			return function(selector?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], summary?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], children: Node | (string | Node)[] | ElementAttributesMap[ElementTagName] = [], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
				} else {
					summary = selector;
				}

				// summary

				if (summary !== undefined && typeof summary === "string") {
					//summary = summary;
				} else {
					children = summary;
				}

				// children

				if (children !== undefined && ((typeof children === "string") || (typeof children === "object" && children instanceof Element))) {
					children = [children];
				} else if (children !== undefined && Array.isArray(children)) {
					//children = children;
				} else if (children !== undefined && typeof children === "object" && children instanceof Element) {
					attributes = { ...attributes, ...children };

					children = [];
				}

				// attributes

				return ElementTagNameMap[tagName](summary, children, attributes);
			};

		/**
		 * Form
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, method: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, method?: string, action: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, method?: string, action?: string, encoding: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, method?: string, action?: string, encoding?: string, children: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 * (selector?: string, method?: string, action?: string, encoding?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "form":
			return function(selector?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], method?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], action?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], encoding?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], children: Node | (string | Node)[] = [], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
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
				} else if (encoding !== undefined && typeof encoding === "object") {
					attributes = { ...attributes, ...encoding };
				}

				// children

				if (children !== undefined && ((typeof children === "string") || (typeof children === "object" && children instanceof Element))) {
					children = [children];
				} else if (children !== undefined && Array.isArray(children)) {
					//children = children;
				} else if (children !== undefined && typeof children === "object" && children instanceof Element) {
					attributes = { ...attributes, ...children };

					children = [];
				}

				// attributes

				return ElementTagNameMap[tagName](children, attributes);
			};

		/**
		 * Form-associated/Grouping/Text-level
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, children: Node | (string | Node)[]): NodeTagNameMap[NodeTagName]
		 * (selector?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 * (selector?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "article":
		case "aside":
		case "b":
		case "blockquote":
		case "br":
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
		case "canvas":
		case "code":
		case "del":
		case "div":
		case "em":
		case "footer":
		case "h1":
		case "h2":
		case "h3":
		case "h4":
		case "h5":
		case "h6":
		case "header":
		case "hr":
		case "i":
		case "ins":
		case "kbd":
		case "li":
		case "main":
		case "mark":
		case "meter":
		case "nav":
		case "ol":
		case "p":
		case "pre":
		case "progress":
		case "q":
		case "s":
		case "section":
		case "small":
		case "span":
		case "strong":
		case "sub":
		case "sup":
		case "textarea":
		case "u":
		case "ul":
			return function(selector?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], children: Node | (string | Node)[] | ElementAttributesMap[ElementTagName] = [], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
				} else {
					// eslint-disable-next-line no-lonely-if
					if (selector !== undefined && Array.isArray(selector)) {
						children = selector;
					} else if (selector !== undefined && typeof selector === "string") {
						children = [selector];
					}
				}

				// children

				if (children !== undefined && ((typeof children === "string") || (typeof children === "object" && children instanceof Element))) {
					children = [children];
				} else if (children !== undefined && Array.isArray(children)) {
					//children = children;
				} else if (children !== undefined && typeof children === "object" && children instanceof Element) {
					attributes = { ...attributes, ...children };

					children = [];
				}

				// attributes

				return ElementTagNameMap[tagName](children, attributes);
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
			return function(selector?: string | string[] | ElementAttributesMap[ElementTagName], sources: string | string[] | ElementAttributesMap[ElementTagName] = [], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
				} else {
					// eslint-disable-next-line no-lonely-if
					if (selector !== undefined && Array.isArray(selector)) {
						sources = selector;
					} else if (selector !== undefined && typeof selector === "string") {
						sources = [selector];
					}
				}

				// sources

				if (sources !== undefined && Array.isArray(sources)) {
					//sources = sources;
				} else if (sources !== undefined && typeof sources === "object") {
					attributes = { ...attributes, ...sources };

					sources = [];
				}

				// attributes

				return ElementTagNameMap[tagName](sources, attributes);
			};

		/**
		 * Field Set
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, legend: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, legend?: string, children: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 * (selector?: string, legend?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "fieldset":
			return function(selector?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], legend?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], children: Node | (string | Node)[] | ElementAttributesMap[ElementTagName] = [], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
				} else {
					legend = selector;
				}

				// legend

				if (legend !== undefined && typeof legend === "string") {
					//legend = legend;
				} else {
					children = legend;
				}

				// children

				if (children !== undefined && ((typeof children === "string") || (typeof children === "object" && children instanceof Element))) {
					children = [children];
				} else if (children !== undefined && Array.isArray(children)) {
					//children = children;
				} else if (children !== undefined && typeof children === "object" && children instanceof Element) {
					attributes = { ...attributes, ...children };
				}
				// attributes

				return ElementTagNameMap[tagName](legend, children, attributes);
			};

		/**
		 * Figure
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector): NodeTagNameMap[NodeTagName]
		 * (selector?: string, figcaption: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, figcaption?: string, children: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 * (selector?: string, figcaption?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "figure":
			return function(selector?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], figcaption?: string | Node | (string | Node)[] | ElementAttributesMap[ElementTagName], children: Node | (string | Node)[] | ElementAttributesMap[ElementTagName] = [], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
				} else {
					figcaption = selector;
				}

				// figcaption

				if (figcaption !== undefined && typeof figcaption === "string") {
					//figcaption = figcaption;
				} else if (typeof figcaption === "object") {
					attributes = { ...attributes, ...figcaption };
				}

				// children

				if (children !== undefined && ((typeof children === "string") || (typeof children === "object" && children instanceof Element))) {
					children = [children];
				} else if (children !== undefined && Array.isArray(children)) {
					//children = children;
				} else if (children !== undefined && typeof children === "object" && children instanceof Element) {
					attributes = { ...attributes, ...children };
				}

				// attributes

				return ElementTagNameMap[tagName](figcaption, children, attributes);
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
			return function(selector?: string | boolean | ElementAttributesMap[ElementTagName], name?: string | boolean | ElementAttributesMap[ElementTagName], accept?: string | boolean | ElementAttributesMap[ElementTagName], required?: string | boolean | ElementAttributesMap[ElementTagName], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };

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

				// attributes

				return ElementTagNameMap[tagName]({ ...attributes, "type": tagName });
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
			return function(selector?: string | ElementAttributesMap[ElementTagName], source?: string | ElementAttributesMap[ElementTagName], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
				} else {
					source = selector;
				}

				// source

				if (source !== undefined && typeof source === "string" && URL_PATHNAME.test(source)) {
					attributes.src = source;
				} else if (source !== undefined && typeof source === "object") {
					attributes = { ...attributes, ...source };
				}

				// attributes

				return ElementTagNameMap[tagName]([], attributes);
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
			return function(selector?: string | ElementAttributesMap[ElementTagName], name?: string | ElementAttributesMap[ElementTagName], value?: string | ElementAttributesMap[ElementTagName], required?: string | ElementAttributesMap[ElementTagName], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };

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

				// attributes

				return ElementTagNameMap[tagName]({ ...attributes, "type": tagName });
			};

		/**
		 * Label
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector): NodeTagNameMap[NodeTagName]
		 * (selector?, forValue: string, textContent: string | (string | Node)[]): NodeTagNameMap[NodeTagName]
		 * (selector?, forValue?: string, textContent?: string | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "label":
			return function(selector?: string | (string | Node)[] | ElementAttributesMap[ElementTagName], forValue?: string | (string | Node)[] | ElementAttributesMap[ElementTagName], textContent: string | (string | Node)[] | ElementAttributesMap[ElementTagName] = [], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
				} else {
					forValue = selector;
					textContent = forValue;
				}

				// children

				if (textContent !== undefined && ((typeof textContent === "string") || (typeof textContent === "object" && textContent instanceof Element))) {
					textContent = [textContent];
				} else if (textContent !== undefined && Array.isArray(textContent)) {
					//children = children;
				} else if (textContent !== undefined && typeof textContent === "object") {
					attributes = { ...attributes, ...textContent };

					textContent = [];
				}

				// attributes

				return ElementTagNameMap[tagName](textContent, attributes);
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
			return function(selector?: string | ElementAttributesMap[ElementTagName], value?: string | ElementAttributesMap[ElementTagName], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
				} else {
					value = selector;
				}

				// value

				if (value !== undefined && typeof value === "string") {
					attributes.value = value;
				} else if (value !== undefined && typeof value === "object") {
					attributes = { ...attributes, ...value };
				}

				// attributes

				return ElementTagNameMap[tagName]({ ...attributes, "type": tagName });
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
			return function(selector?: string | string[] | boolean | ElementAttributesMap[ElementTagName], name?: string | string[] | boolean | ElementAttributesMap[ElementTagName], options?: string[] | boolean | ElementAttributesMap[ElementTagName], required?: boolean | ElementAttributesMap[ElementTagName], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
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

				// attributes

				return ElementTagNameMap[tagName](options, { ...attributes, "type": tagName });
			};

		/**
		 * Table
		 *
		 * (): NodeTagNameMap[NodeTagName]
		 * (selector: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, caption: string): NodeTagNameMap[NodeTagName]
		 * (selector?: string, caption?: string, tableHeader: string[]): NodeTagNameMap[NodeTagName]
		 * (selector?: string, caption?: string, tableHeader: string[], attributes: object): NodeTagNameMap[NodeTagName]
		 */
		case "table":
			return function(selector?: string | string[] | ElementAttributesMap[ElementTagName], caption?: string | string[] | ElementAttributesMap[ElementTagName], tableHeader: string[] | ElementAttributesMap[ElementTagName] = [], attributes: ElementAttributesMap[ElementTagName] = {}) {
				if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
					attributes = { ...attributes, ...parseSelector(selector) };
				} else {
					caption = selector;
				}

				// caption

				if (caption !== undefined && typeof caption === "string") {
					//caption = caption;
				} else if (caption !== undefined && Array.isArray(caption)) {
					tableHeader = caption;
				}

				// tableHeader

				if (tableHeader !== undefined && Array.isArray(tableHeader)) {
					//tableHeader = tableHeader;
				} else if (tableHeader !== undefined && typeof tableHeader === "object") {
					attributes = { ...attributes, ...tableHeader };
				}

				// attributes

				return ElementTagNameMap[tagName](caption, tableHeader, attributes);
			};
		default:
			throw new Error("Unrecognized element `" + tagName + "`.");
	}
}

export const a = createPrimitive("a");
export const article = createPrimitive("article");
export const aside = createPrimitive("aside");
export const audio = createPrimitive("audio");
export const b = createPrimitive("b");
export const blockquote = createPrimitive("blockquote");
export const br = createPrimitive("br");
export const button = createPrimitive("button");
export const canvas = createPrimitive("canvas");
export const checkbox = createPrimitive("checkbox");
export const code = createPrimitive("code");
export const color = createPrimitive("color");
export const date = createPrimitive("date");
export const datetime = createPrimitive("datetime-local");
export const del = createPrimitive("del");
export const details = createPrimitive("details");
export const div = createPrimitive("div");
export const em = createPrimitive("em");
export const email = createPrimitive("email");
export const fieldset = createPrimitive("fieldset");
export const figure = createPrimitive("figure");
export const file = createPrimitive("file");
export const footer = createPrimitive("footer");
export const form = createPrimitive("form");
export const h1 = createPrimitive("h1");
export const h2 = createPrimitive("h2");
export const h3 = createPrimitive("h3");
export const h4 = createPrimitive("h4");
export const h5 = createPrimitive("h5");
export const h6 = createPrimitive("h6");
export const header = createPrimitive("header");
export const hidden = createPrimitive("hidden");
export const hr = createPrimitive("hr");
export const i = createPrimitive("i");
export const iframe = createPrimitive("iframe");
export const img = createPrimitive("img");
export const ins = createPrimitive("ins");
export const kbd = createPrimitive("kbd");
export const label = createPrimitive("label");
export const li = createPrimitive("li");
export const main = createPrimitive("main");
export const mark = createPrimitive("mark");
export const meter = createPrimitive("meter");
export const month = createPrimitive("month");
export const nav = createPrimitive("nav");
export const number = createPrimitive("number");
export const ol = createPrimitive("ol");
export const p = createPrimitive("p");
export const password = createPrimitive("password");
export const picture = createPrimitive("picture");
export const pre = createPrimitive("pre");
export const progress = createPrimitive("progress");
export const q = createPrimitive("q");
export const radio = createPrimitive("radio");
export const range = createPrimitive("range");
export const reset = createPrimitive("reset");
export const s = createPrimitive("s");
export const search = createPrimitive("search");
export const section = createPrimitive("section");
export const select = createPrimitive("select");
export const small = createPrimitive("small");
export const span = createPrimitive("span");
export const strong = createPrimitive("strong");
export const sub = createPrimitive("sub");
export const submit = createPrimitive("submit");
export const sup = createPrimitive("sup");
export const table = createPrimitive("table");
export const tel = createPrimitive("tel");
export const text = createPrimitive("text");
export const textarea = createPrimitive("textarea");
export const time = createPrimitive("time");
export const u = createPrimitive("u");
export const ul = createPrimitive("ul");
export const url = createPrimitive("url");
export const video = createPrimitive("video");
export const week = createPrimitive("week");

globalThis.a = a;
globalThis.article = article;
globalThis.aside = aside;
globalThis.audio = audio;
globalThis.b = b;
globalThis.blockquote = blockquote;
globalThis.br = br;
globalThis.button = button;
globalThis.canvas = canvas;
globalThis.checkbox = checkbox;
globalThis.code = code;
globalThis.color = color;
globalThis.date = date;
globalThis.datetime = datetime;
globalThis.del = del;
globalThis.details = details;
globalThis.div = div;
globalThis.em = em;
globalThis.email = email;
globalThis.fieldset = fieldset;
globalThis.figure = figure;
globalThis.file = file;
globalThis.footer = footer;
globalThis.form = form;
globalThis.h1 = h1;
globalThis.h2 = h2;
globalThis.h3 = h3;
globalThis.h4 = h4;
globalThis.h5 = h5;
globalThis.h6 = h6;
globalThis.header = header;
globalThis.hidden = hidden;
globalThis.hr = hr;
globalThis.i = i;
globalThis.iframe = iframe;
globalThis.img = img;
globalThis.ins = ins;
globalThis.kbd = kbd;
globalThis.label = label;
globalThis.li = li;
globalThis.main = main;
globalThis.mark = mark;
globalThis.meter = meter;
globalThis.month = month;
globalThis.nav = nav;
globalThis.number = number;
globalThis.ol = ol;
globalThis.p = p;
globalThis.password = password;
globalThis.picture = picture;
globalThis.pre = pre;
globalThis.progress = progress;
globalThis.q = q;
globalThis.radio = radio;
globalThis.range = range;
globalThis.reset = reset;
globalThis.s = s;
globalThis.search = search;
globalThis.section = section;
globalThis.select = select;
globalThis.small = small;
globalThis.span = span;
globalThis.strong = strong;
globalThis.sub = sub;
globalThis.submit = submit;
globalThis.sup = sup;
globalThis.table = table;
globalThis.tel = tel;
globalThis.text = text;
globalThis.textarea = textarea;
globalThis.time = time;
globalThis.u = u;
globalThis.ul = ul;
globalThis.url = url;
globalThis.video = video;
globalThis.week = week;

export function createTemplate(tagName: string, options: ElementDefinitionOptions) {
	if (!tagName.includes("-")) {
		tagName += "-component";
	}

	customElements.define(tagName, class extends HTMLElement implements EventEmitter {
		private events = {};

		public constructor() {
			super();
		}

		public on(event: string, listener: () => void): () => void {
			if (this.events[event] === undefined) {
				this.events[event] = [];
			}

			this.events[event].push(listener);

			return listener;
		}

		public off(event?: string, listener?: () => void): void {
			if (event === undefined && listener === undefined) {
				this.events = {};
			} else if (listener === undefined) {
				delete this.events[event];
			} else if (this.events[event].indexOf(listener) !== -1) {
				this.events[event].splice(this.events[event].indexOf(listener), 1);
			}
		}

		public emit(event: string, ...args: unknown[]): void {
			if (this.events[event] !== undefined) {
				for (const listener of this.events[event]) {
					listener(...args);
				}
			}

			if (event !== "*") {
				this.emit("*", ...args);
			}
		}

		public once(event: string, listener: () => void): () => void {
			return this.on(event, () => {
				this.emit(event);

				this.off(event, listener);
			});
		}

		/**
		 * Invoked each time the custom element is appended into a document-connected element. This
		 * will happen each time the node is moved, and may happen before the element's contents
		 * have been fully parsed.
		 */
		public connectedCallback() {

		}

		/**
		 * Invoked each time the custom element is disconnected from the document's DOM.
		 */
		public disconnectedCallback() {

		}

		/**
		 * Invoked each time the custom element is moved to a new document.
		 */
		public adoptedCallback() {

		}

		/**
		 * Invoked each time one of the custom element's attributes is added, removed, or changed.
		 * Which attributes to notice change for is specified in a static get `observedAttributes`
		 * method.
		 */
		public attributeChangedCallback() {

		}
	}, options);

	return function(...args) {
		return new (customElements.get(tagName))(...args);
	};
}

globalThis.createTemplate = createTemplate;
