import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

// <figcaption> should be part of a <figure>

export class FigureNode extends Node {
	private readonly caption: string;

	public constructor(tagName: keyof TopLevelHTMLElement, caption: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		this.caption = caption;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const figureNode = document.createElement(this.type);

		if (this.caption !== undefined) {
			const caption = document.createElement("caption");
			caption.textContent = this.caption;

			figureNode.append(caption);
		}

		for (const [key, value] of Object.entries(this.attributes)) {
			figureNode.setAttribute(key, String(value));
		}

		this.cachedFragment.appendChild(figureNode);

		return this.cachedFragment;
	}
}
