export class Node {
	private readonly children = [];

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
