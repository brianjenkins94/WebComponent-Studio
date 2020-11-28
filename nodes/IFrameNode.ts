import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

export class IFrameNode extends Node {
	public constructor(tagName: keyof TopLevelHTMLElement, source: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.attributes.src = source;
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const iFrameNode = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			iFrameNode.setAttribute(key, value);
		}

		this.cachedFragment.appendChild(iFrameNode);

		return this.cachedFragment;
	}
}
