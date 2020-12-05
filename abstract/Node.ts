import { EventEmitter } from "./EventEmitter";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

export abstract class Node<TagName extends keyof TopLevelHTMLElementMap> extends EventEmitter {
	protected cachedFragment: DocumentFragment;
	protected attributes: HTMLElementAttributesMap[TagName] = {};
	protected readonly type: keyof TopLevelHTMLElementMap;
	private readonly children = [];

	public constructor(type: keyof TopLevelHTMLElementMap) {
		super();

		this.type = type;
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
