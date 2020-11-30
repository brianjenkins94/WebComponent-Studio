import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

export class TextLevelNode extends Node {
	private readonly textContent: string;

	public constructor(tagName: keyof TopLevelHTMLElement, textContent: string, extras: HTMLElementAttributesMap[typeof tagName]) {
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
