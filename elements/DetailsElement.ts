import { Element } from "../abstract/Element";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <summary> should be part of a <details>

export class DetailsElement<TagName extends keyof TopLevelHTMLElementMap> extends Element<TagName> {
	public constructor(tagName: TagName, summary: (string | Node)[], children: (string | Node)[], attributes: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		const summaryElement = document.createElement("summary");
		summaryElement.append(...summary);

		this.children.push(summaryElement, ...children);

		this.attributes = { ...attributes, ...this.attributes };
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined && value !== "") {
				this.template.setAttribute(key, value);
			}
		}

		for (const child of this.children) {
			this.template.innerHTML += child;
		}

		return this.template.outerHTML;
	}
}
