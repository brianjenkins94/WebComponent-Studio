/* eslint-disable no-lonely-if */

import { NodeTagNameMap } from "./nodes";
import type { HTMLElementAttributesMap } from "./types/attributes";
import type { TopLevelHTMLElement } from "./types/elements";

// <caption> should be part of a <table>
// <col> should be part of a <colgroup>
// <colgroup> should be part of a <table>
// <figcaption> should be part of a <figure>
// <legend> should be part of a <fieldset>
// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>
// <source> should be a part of a <picture>, <audio> or <video>
// <summary> should be part of a <details>
// <tbody> should be part of a <table>
// <td> should be part of a <tr>
// <tfoot> should be part of a <table>
// <th> should be part of a <tr>
// <thead> should be part of a <table>
// <tr> should be part of a <tbody>, <tfoot> or <thead>
// <track> should be a part of a <audio> or <video>

const CSS_SELECTOR = /-?([_a-z]|[\240-\377]|[0-9a-f]{1,6})([_a-z0-9-]|[\240-\377]|[0-9a-f]{1,6})*/i;

// eslint-disable-next-line complexity
function createPrimitive<HTMLElement extends keyof HTMLElementTagNameMap, HTMLElementAttributes extends keyof HTMLElementAttributesMap>(element: keyof TopLevelHTMLElement) {
	switch (element) {
		case "b":
		case "blockquote":
		case "button":
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
		case "label":
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
			return function(selectors?: string | HTMLElementTagNameMap[HTMLElement], textContent?: string | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				const fragment = document.createDocumentFragment();

				const root = fragment.appendChild(document.createElement(element));

				// selectors

				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|./g)) {
						if (selector.startsWith("#")) {
							root.setAttribute("id", selector.substring(1));
						} else if (selector.startsWith(".")) {
							root.classList.add(selector.substring(1));
						}
					}
				} else {
					textContent = selectors;
				}

				// textContent

				if (/* textContent !== undefined && */ typeof textContent !== "object") {
					fragment.appendChild(document.createTextNode(textContent));
				} else {
					extras = textContent;
				}

				// extras

				if (extras !== undefined) {
					for (const [key, value] of Object.entries(extras)) {
						root.setAttribute(key, String(value));
					}
				}

				return fragment;
			};
		case "audio":
		case "img":
		case "picture":
		case "video":
			return function(selectors?: string | string[] | HTMLElementTagNameMap[HTMLElement], sources?: string | string[] | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				const fragment = document.createDocumentFragment();

				const root = fragment.appendChild(document.createElement(element));

				// selectors

				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|./g)) {
						if (selector.startsWith("#")) {
							root.setAttribute("id", selector.substring(1));
						} else if (selector.startsWith(".")) {
							root.classList.add(selector.substring(1));
						}
					}
				} else {
					if (Array.isArray(sources)) {
						sources = selectors;
					} else if (typeof selectors === "string") {
						// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						// ^ Is there a way to get rid of this?
						sources = [selectors];
					}
				}

				// sources

				if (/* sources !== undefined && */ Array.isArray(sources)) {
					// TODO
				} else if (typeof sources === "object") {
					// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					// ^ Is there a way to get rid of this?
					extras = sources;
				}

				// extras

				if (extras !== undefined) {
					for (const [key, value] of Object.entries(extras)) {
						root.setAttribute(key, String(value));
					}
				}

				return fragment;
			};
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
			return function(selectors?: string | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				const fragment = document.createDocumentFragment();

				const root = fragment.appendChild(document.createElement(element));

				// selectors

				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|./g)) {
						if (selector.startsWith("#")) {
							root.setAttribute("id", selector.substring(1));
						} else if (selector.startsWith(".")) {
							root.classList.add(selector.substring(1));
						}
					}
				} else if (typeof selectors === "object") {
					// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					// ^ Is there a way to get rid of this?
					extras = selectors;
				}

				// extras

				if (extras !== undefined) {
					for (const [key, value] of Object.entries(extras)) {
						root.setAttribute(key, String(value));
					}
				}

				return fragment;
			};
		case "iframe":
			return function(selectors?: string | HTMLElementTagNameMap[HTMLElement], source?: string | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				const fragment = document.createDocumentFragment();

				const root = fragment.appendChild(document.createElement(element));

				// selectors

				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|./g)) {
						if (selector.startsWith("#")) {
							root.setAttribute("id", selector.substring(1));
						} else if (selector.startsWith(".")) {
							root.classList.add(selector.substring(1));
						}
					}
				} else {
					source = selectors;
				}

				// source

				root.setAttribute("src", String(source));

				// extras

				if (extras !== undefined) {
					for (const [key, value] of Object.entries(extras)) {
						root.setAttribute(key, String(value));
					}
				}

				return fragment;
			};
		case "fieldset":
			return function(selectors?: string | HTMLElementTagNameMap[HTMLElement], legend?: string | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				const fragment = document.createDocumentFragment();

				const root = fragment.appendChild(document.createElement(element));

				// selectors

				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|./g)) {
						if (selector.startsWith("#")) {
							root.setAttribute("id", selector.substring(1));
						} else if (selector.startsWith(".")) {
							root.classList.add(selector.substring(1));
						}
					}
				} else {
					legend = selectors;
				}

				// source

				// TODO

				// extras

				if (extras !== undefined) {
					for (const [key, value] of Object.entries(extras)) {
						root.setAttribute(key, String(value));
					}
				}

				return fragment;
			};
		case "form":
			return function(selectors?: string | HTMLElementTagNameMap[HTMLElement], method?: string | HTMLElementTagNameMap[HTMLElement], action?: string | HTMLElementTagNameMap[HTMLElement], encoding?: string | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				const fragment = document.createDocumentFragment();

				const root = fragment.appendChild(document.createElement(element));

				// selectors

				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|./g)) {
						if (selector.startsWith("#")) {
							root.setAttribute("id", selector.substring(1));
						} else if (selector.startsWith(".")) {
							root.classList.add(selector.substring(1));
						}
					}
				} else {
					method = selectors;
				}

				// method

				// TODO

				// action

				// TODO

				// encoding

				// TODO

				// extras

				if (extras !== undefined) {
					for (const [key, value] of Object.entries(extras)) {
						root.setAttribute(key, String(value));
					}
				}

				return fragment;
			};
		case "input":
			throw new Error("Not yet implemented.");
		case "select":
			return function(selectors?: string | HTMLElementTagNameMap[HTMLElement], options?: string | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				const fragment = document.createDocumentFragment();

				const root = fragment.appendChild(document.createElement(element));

				// selectors

				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|./g)) {
						if (selector.startsWith("#")) {
							root.setAttribute("id", selector.substring(1));
						} else if (selector.startsWith(".")) {
							root.classList.add(selector.substring(1));
						}
					}
				} else {
					options = selectors;
				}

				// method

				// TODO

				// extras

				if (extras !== undefined) {
					for (const [key, value] of Object.entries(extras)) {
						root.setAttribute(key, String(value));
					}
				}

				return fragment;
			};
		case "figure":
			return function(selectors?: string | HTMLElementTagNameMap[HTMLElement], figcaption?: string | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				const fragment = document.createDocumentFragment();

				const root = fragment.appendChild(document.createElement(element));

				// selectors

				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|./g)) {
						if (selector.startsWith("#")) {
							root.setAttribute("id", selector.substring(1));
						} else if (selector.startsWith(".")) {
							root.classList.add(selector.substring(1));
						}
					}
				} else {
					figcaption = selectors;
				}

				// figcaption

				// TODO

				// extras

				if (extras !== undefined) {
					for (const [key, value] of Object.entries(extras)) {
						root.setAttribute(key, String(value));
					}
				}

				return fragment;
			};
		case "details":
			return function(selectors?: string | HTMLElementTagNameMap[HTMLElement], summary?: string | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				const fragment = document.createDocumentFragment();

				const root = fragment.appendChild(document.createElement(element));

				// selectors

				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|./g)) {
						if (selector.startsWith("#")) {
							root.setAttribute("id", selector.substring(1));
						} else if (selector.startsWith(".")) {
							root.classList.add(selector.substring(1));
						}
					}
				} else {
					summary = selectors;
				}

				// summary

				// TODO

				// extras

				if (extras !== undefined) {
					for (const [key, value] of Object.entries(extras)) {
						root.setAttribute(key, String(value));
					}
				}

				return fragment;
			};
		case "table":
			return function(selectors?: string | HTMLElementTagNameMap[HTMLElement], caption?: string | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				const fragment = document.createDocumentFragment();

				const root = fragment.appendChild(document.createElement(element));

				// selectors

				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					for (const selector of selectors.split(/#|./g)) {
						if (selector.startsWith("#")) {
							root.setAttribute("id", selector.substring(1));
						} else if (selector.startsWith(".")) {
							root.classList.add(selector.substring(1));
						}
					}
				} else {
					caption = selectors;
				}

				// caption

				// TODO

				// extras

				if (extras !== undefined) {
					for (const [key, value] of Object.entries(extras)) {
						root.setAttribute(key, String(value));
					}
				}

				return fragment;
			};
		case "a":
			return function(selectors?: string | HTMLElementTagNameMap[HTMLElement], textContent?: string | HTMLElementTagNameMap[HTMLElement], href?: string | HTMLElementTagNameMap[HTMLElement], extras?: HTMLElementAttributesMap[HTMLElementAttributes]) {
				if (/* selectors !== undefined && */ typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
					return new NodeTagNameMap[element](selectors, textContent, href, extras);
				} else {
					textContent = selectors;
				}

				if (extras !== undefined) {
					return new NodeTagNameMap[element]();
				}
			};
		default:
			throw new Error("Unrecognized element `" + element + "`.");
	}
}

export const b = createPrimitive("b");
export const blockquote = createPrimitive("blockquote");
export const button = createPrimitive("button");
export const code = createPrimitive("code");
export const del = createPrimitive("del");
export const em = createPrimitive("i");
export const h1 = createPrimitive("h1");
export const h2 = createPrimitive("h2");
export const h3 = createPrimitive("h3");
export const h4 = createPrimitive("h4");
export const h5 = createPrimitive("h5");
export const h6 = createPrimitive("h6");
export const ins = createPrimitive("ins");
export const kbd = createPrimitive("kbd");
export const label = createPrimitive("label");
export const li = createPrimitive("li");
export const mark = createPrimitive("mark");
export const p = createPrimitive("p");
export const pre = createPrimitive("pre");
export const q = createPrimitive("q");
export const s = createPrimitive("s");
export const small = createPrimitive("small");
export const span = createPrimitive("span");
export const strong = createPrimitive("strong");
export const sub = createPrimitive("sub");
export const sup = createPrimitive("sup");
export const u = createPrimitive("u");

export const audio = createPrimitive("audio");
export const img = createPrimitive("img");
export const picture = createPrimitive("picture");
export const video = createPrimitive("video");

export const article = createPrimitive("article");
export const aside = createPrimitive("aside");
export const br = createPrimitive("br");
export const canvas = createPrimitive("canvas");
export const div = createPrimitive("div");
export const footer = createPrimitive("footer");
export const header = createPrimitive("header");
export const hr = createPrimitive("hr");
export const main = createPrimitive("main");
export const meter = createPrimitive("meter");
export const nav = createPrimitive("nav");
export const ol = createPrimitive("ol");
export const progress = createPrimitive("progress");
export const section = createPrimitive("section");
export const textarea = createPrimitive("textarea");
export const ul = createPrimitive("ul");

export const iframe = createPrimitive("iframe");

export const fieldset = createPrimitive("fieldset");

export const form = createPrimitive("form");

export const select = createPrimitive("select");

export const figure = createPrimitive("figure");

export const details = createPrimitive("details");

export const table = createPrimitive("table");

export const a = createPrimitive("a");

//

function createTemplate(element) {
	element.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

	customElements.define(tagName, target);

	return customElements.get(tagName);
}
