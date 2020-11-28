import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

export class Node {
	protected cachedFragment: DocumentFragment;
	protected readonly attributes: HTMLElementAttributesMap;
	protected readonly type: keyof TopLevelHTMLElement;
	private readonly children = [];

	public constructor(type: keyof TopLevelHTMLElement) {
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
