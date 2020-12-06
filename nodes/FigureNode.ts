import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <figcaption> should be part of a <figure>

export class FigureNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	private readonly caption: string;

	public constructor(tagName: TagName, caption: string, extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.caption = caption;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const figureNode = document.createElement(this.type);

		if (this.caption !== undefined) {
			const caption = document.createElement("caption");
			caption.innerHTML = this.caption;

			figureNode.append(caption);
		}

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined) {
				figureNode.setAttribute(key, value);
			}
		}

		this.cachedFragment.appendChild(figureNode);

		return this.cachedFragment;
	}
}
