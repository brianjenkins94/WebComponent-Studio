import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <summary> should be part of a <details>

export class DetailsNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	public constructor(tagName: TagName, summary: string, children: (string | HTMLElement)[], extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		const summaryNode = document.createElement("summary");
		summaryNode.append(summary);

		this.children.push(summaryNode, ...children);

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
