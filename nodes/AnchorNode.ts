import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

export class AnchorNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	public constructor(tagName: TagName, textContent: string | (string | HTMLElement)[], href: string, extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		if (typeof textContent === "string") {
			this.children.push(textContent);
		} else {
			this.children.push([...textContent]);
		}

		this.attributes.href = href;

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
