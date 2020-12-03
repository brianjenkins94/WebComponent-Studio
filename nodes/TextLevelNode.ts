import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

export class TextLevelNode<TagName extends keyof TopLevelHTMLElementMap> extends Node {
	private readonly textContent: string;

	public constructor(tagName: TagName, textContent: string, extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.textContent = textContent;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const textLevelNode = document.createElement(this.type);
		textLevelNode.innerHTML = this.textContent;

		for (const [key, value] of Object.entries(this.attributes)) {
			textLevelNode.setAttribute(key, String(value));
		}

		this.cachedFragment.appendChild(textLevelNode);

		return this.cachedFragment;
	}
}
