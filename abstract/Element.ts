import type { EventEmitter } from "./EventEmitter";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

export abstract class Element<TagName extends keyof TopLevelHTMLElementMap> implements EventEmitter {
	protected template: HTMLElement;
	protected attributes: HTMLElementAttributesMap[TagName] = {};
	protected readonly type: keyof TopLevelHTMLElementMap;
	protected readonly children = [];
	private events = {};

	public constructor(type: keyof TopLevelHTMLElementMap) {
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

	public push(...items: Element<TagName>[]): this {
		this.children.push(...items);

		return this;
	}

	public unshift(...items: Element<TagName>[]): this {
		this.children.unshift(...items);

		return this;
	}

	public [Symbol.iterator]() {
		// TODO
	}
}
