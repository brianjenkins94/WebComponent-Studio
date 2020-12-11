import { Element } from "../abstract/Element";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <legend> should be part of a <fieldset>

export class FieldSetElement<TagName extends keyof TopLevelHTMLElementMap> extends Element<TagName> {
	public constructor(tagName: TagName, legend: string, children: (string | Node)[], attributes: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		const legendElement = document.createElement("legend");
		legendElement.append(legend);

		this.children.push(legendElement, ...children);

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
