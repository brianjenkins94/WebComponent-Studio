import type { IEventEmitter } from "./EventEmitter";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";
import { FlowContent, InteractiveContent, PhrasingContent } from "../types/content";

export abstract class Element<TagName extends keyof TopLevelElementMap> implements IEventEmitter {
	protected template: HTMLElement;
	protected attributes: ElementAttributesMap[TagName] = {};
	protected readonly type: keyof TopLevelElementMap;
	protected readonly children: string[] = [];
	private events = {};

	public constructor(type: keyof TopLevelElementMap) {
		this.type = type;

		this.template = document.createElement(this.type);
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

	// eslint-disable-next-line complexity
	public push(...items: (string | Element<TagName>)[]): this {
		for (const item of items) {
			if (typeof item === "string") {
				this.children.push(item);
			} else {
				switch (this.type) {
					// Flow content

					// excluding self
					case "form":
						if (this.type === item.type) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					// excluding <header> and <footer>
					case "footer":
					case "header":
						if ((this.type === "header" || this.type === "footer") && (item.type === "header" || item.type === "footer")) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					// (excluding interactive content) or phrasing content
					case "a":
						if (this.type === "a" && (InteractiveContent.includes(item.type) || !PhrasingContent.includes(item.type))) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					case "article":
					case "aside":
					case "blockquote":
					case "details":
					case "div":
					case "fieldset":
					case "figure":
					case "main":
					case "nav":
					case "section":
						if (!FlowContent.includes(item.type)) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}
						break;

					// Phrasing content

					// excluding self
					case "label":
					case "meter":
					case "progress":
						if (this.type === item.type) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					// excluding Interactive content
					case "button":
						if (this.type === "button" && InteractiveContent.includes(item.type)) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					case "b":
					case "code":
					case "em":
					case "h1":
					case "h2":
					case "h3":
					case "h4":
					case "h5":
					case "h6":
					case "i":
					case "kbd":
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
						if (!PhrasingContent.includes(item.type)) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}
						break;

					// No content
					case "br":
					case "hr":
					case "iframe":
					case "img":
					case "input":
						throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");

					// `<img>`-only
					case "picture":
						if (item.type !== "img") {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					// No <audio> or <video>
					case "audio":
					case "video":
						if ((this.type === "audio" || this.type === "video") && (item.type === "audio" || item.type === "video")) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					// No interactive content except for <a>, <button>, and <input> elements whose type attribute is checkbox, radio, or button
					case "canvas":
						if (!InteractiveContent.includes(item.type) && (item.type === "a" || item.type === "button" || item.type === "input")) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					case "del":
					case "ins":
					default:
				}

				this.children.push(item.toString());
			}
		}

		return this;
	}

	public unshift(...items: (string | Element<TagName>)[]): this {
		for (const item of items) {
			if (typeof item === "string") {
				this.children.unshift(item);
			} else {
				this.children.unshift(item.toString());
			}
		}

		return this;
	}

	public [Symbol.iterator]() {
		// TODO
	}
}
