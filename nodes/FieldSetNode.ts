import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <legend> should be part of a <fieldset>

export class FieldSetNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	public constructor(tagName: TagName, legend: string, children: (string | HTMLElement)[], extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		const legendNode = document.createElement("legend");
		legendNode.append(legend);

		this.children.push(legendNode, ...children);

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
