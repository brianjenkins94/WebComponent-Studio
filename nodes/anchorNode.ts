import { Node } from "../abstract/Node";
import type { HTMLAnchorElementAttributes } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

export class AnchorNode extends Node {
	private readonly attributes: HTMLAnchorElementAttributes;
	private readonly textContent;

	public constructor(tagName: TopLevelHTMLElement, textContent: string, href: string, extras: HTMLAnchorElementAttributes) {
		super(tagName);

		this.textContent = textContent || "";

		this.attributes.href = href || "#";

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}
	}

	public get fragment(): DocumentFragment {
		const fragment = document.createDocumentFragment();

		const anchor = document.createElement(this.type);
		anchor.textContent = this.textContent;
		anchor.setAttribute("src", this.attributes.href);

		fragment.appendChild(anchor);

		return fragment;
	}
}
