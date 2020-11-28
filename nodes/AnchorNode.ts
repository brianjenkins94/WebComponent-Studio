import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

export class AnchorNode extends Node {
	private readonly textContent: string;

	public constructor(tagName: keyof TopLevelHTMLElement, textContent: string, href: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.textContent = textContent;

		this.attributes.href = href;
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const anchorNode = document.createElement(this.type);
		anchorNode.textContent = this.textContent;

		for (const [key, value] of Object.entries(this.attributes)) {
			anchorNode.setAttribute(key, value);
		}

		this.cachedFragment.appendChild(anchorNode);

		return this.cachedFragment;
	}
}
