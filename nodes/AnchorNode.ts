import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

export class AnchorNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	private readonly textContent: string;

	public constructor(tagName: TagName, textContent: string, href: string, extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.textContent = textContent;

		this.attributes.href = href;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const anchorNode = document.createElement(this.type);
		anchorNode.textContent = this.textContent;

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined) {
				anchorNode.setAttribute(key, value);
			}
		}

		this.cachedFragment.appendChild(anchorNode);

		return this.cachedFragment;
	}
}
