import { EventEmitter } from "./EventEmitter";
import type { TopLevelHTMLElement } from "../types/elements";

export abstract class Node extends EventEmitter {
	protected cachedFragment: DocumentFragment;
	protected attributes = {};
	// FIXME: ~~~~~~~~~~ Surely this can be typed
	protected readonly type: keyof TopLevelHTMLElement;
	private readonly children = [];

	public constructor(type: keyof TopLevelHTMLElement) {
		super();

		this.type = type;
	}

	public push(...items: Node[]): this {
		this.children.push(...items);

		return this;
	}

	public unshift(...items: Node[]): this {
		this.children.unshift(...items);

		return this;
	}

	public [Symbol.iterator]() {
		// TODO
	}
}
