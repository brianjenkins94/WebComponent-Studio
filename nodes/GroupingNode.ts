import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

export class GroupingNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	public constructor(tagName: TagName, extras: HTMLElementAttributesMap[TagName]) {
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
