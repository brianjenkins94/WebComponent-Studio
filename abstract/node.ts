import type { TopLevelHTMLElement } from "../types/elements";

export class Node {
	protected readonly type: TopLevelHTMLElement;
	private readonly children = [];

	public constructor(type: TopLevelHTMLElement) {
		this.type = type;
	}

	public push(...items: Node[]) {
		this.children.push(...items);
	}

	public unshift(...items: Node[]) {
		this.children.unshift(...items);
	}

	public [Symbol.iterator]() {
		// TODO
	}
}
