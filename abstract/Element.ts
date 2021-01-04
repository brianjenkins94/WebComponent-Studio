import type { IEventEmitter } from "./EventEmitter";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

export abstract class Element<ElementTagName extends keyof TopLevelElementMap> implements IEventEmitter {
	protected template: HTMLElement;
	protected attributes: ElementAttributesMap[ElementTagName] = {};
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

	public push(...items: (string | Element<ElementTagName>)[]): this {
		for (const item of items) {
			if (item instanceof Element) {
				this.children.push(item.toString());
			} else {
				this.children.push(item);
			}
		}

		return this;
	}

	public unshift(...items: (string | Element<ElementTagName>)[]): this {
		for (const item of items) {
			if (item instanceof Element) {
				this.children.unshift(item.toString());
			} else {
				this.children.unshift(item);
			}
		}

		return this;
	}

	public [Symbol.iterator]() {
		// TODO
	}
}
