import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

export class FormNode extends Node {
	public constructor(tagName: keyof TopLevelHTMLElement, method: string, action: string, encoding: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.attributes.method = method;

		this.attributes.action = action;

		this.attributes.enctype = encoding;
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const formNode = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			formNode.setAttribute(key, value);
		}

		this.cachedFragment.appendChild(formNode);

		return this.cachedFragment;
	}
}
