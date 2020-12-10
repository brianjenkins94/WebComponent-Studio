import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <figcaption> should be part of a <figure>

export class FigureNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	public constructor(tagName: TagName, caption: string, children: (string | HTMLElement)[], extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		const captionNode = document.createElement("caption");
		captionNode.append(caption);

		this.children.push(captionNode, ...children);

		this.attributes = { ...extras, ...this.attributes };
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined) {
				this.template.setAttribute(key, value);
			}
		}

		for (const childNode of this.children) {
			this.template.innerHTML += childNode;
		}

		return this.template.outerHTML;
	}
}
