import { Element } from "../abstract/Element";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

// <figcaption> should be part of a <figure>

export class FigureElement<ElementTagName extends keyof TopLevelElementMap> extends Element<ElementTagName> {
	public constructor(tagName: ElementTagName, caption: string, children: (string | Node)[], attributes: ElementAttributesMap[ElementTagName]) {
		super(tagName);

		const captionElement = document.createElement("figcaption");
		captionElement.append(caption);

		this.children.push(captionElement, ...children);

		this.attributes = { ...attributes, ...this.attributes };
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			this.template.setAttribute(key, value);
		}

		for (const child of this.children) {
			if (child instanceof Node) {
				this.template.append(child);
			} else {
				this.template.innerHTML += child;
			}
		}

		return this.template.outerHTML;
	}
}
