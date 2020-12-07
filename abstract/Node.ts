import type { EventEmitter } from "./EventEmitter";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

export abstract class Node<TagName extends keyof TopLevelHTMLElementMap> implements EventEmitter {
	protected cachedFragment: DocumentFragment;
	protected attributes: HTMLElementAttributesMap[TagName] = {};
	protected readonly type: keyof TopLevelHTMLElementMap;
	protected readonly children = [];

	public constructor(type: keyof TopLevelHTMLElementMap) {
		this.type = type;
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

	public push(...items: Node<TagName>[]): this {
		this.children.push(...items);

		return this;
	}

	public unshift(...items: Node<TagName>[]): this {
		this.children.unshift(...items);

		return this;
	}

	public [Symbol.iterator]() {
		// TODO
	}
}
