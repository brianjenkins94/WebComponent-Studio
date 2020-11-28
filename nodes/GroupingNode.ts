import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

export class GroupingNode extends Node {
	public constructor(tagName: keyof TopLevelHTMLElement, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const groupingNode = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			groupingNode.setAttribute(key, String(value));
		}

		this.cachedFragment.appendChild(groupingNode);

		return this.cachedFragment;
	}
}
