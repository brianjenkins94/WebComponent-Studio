import { Element } from "../abstract/Element";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

// <figcaption> should be part of a <figure>

export class FigureElement<ElementTagName extends keyof TopLevelElementMap> extends Element<ElementTagName> {
	public constructor(tagName: ElementTagName, caption: string, children: (string | Element<ElementTagName>)[], attributes: ElementAttributesMap[ElementTagName]) {
		super(tagName);

		this.push(...children);

		if (caption !== undefined) {
			const captionElement = document.createElement("figcaption");
			captionElement.append(caption);

			this.push(captionElement.outerHTML);
		}

		this.attributes = { ...attributes, ...this.attributes };
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			this.template.setAttribute(key, value);
		}

		this.template.innerHTML = this.children.join("");

		return this.template.outerHTML;
	}
}
