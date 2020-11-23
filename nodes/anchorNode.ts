import { Node } from "../abstract/node";
import type { HTMLAnchorElementAttributes } from "../types/attributes";

export class AnchorNode extends Node {
	private readonly attributes: HTMLAnchorElementAttributes;
	private readonly textContent;

	public constructor(textContent: string, href: string, extras: HTMLAnchorElementAttributes) {
		super();

		this.textContent = textContent || "";

		this.attributes.href = href || "#";

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}
	}

	public get fragment(): DocumentFragment {
		const fragment = document.createDocumentFragment();

		const anchor = document.createElement("a");
		anchor.textContent = this.textContent;
		anchor.setAttribute("src", this.attributes.href);

		fragment.appendChild(anchor);

		return fragment;
	}
}
