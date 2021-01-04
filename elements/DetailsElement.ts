import { Element } from "../abstract/Element";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

// <summary> should be part of a <details>

export class DetailsElement<ElementTagName extends keyof TopLevelElementMap> extends Element<ElementTagName> {
	public constructor(tagName: ElementTagName, summary: (string | Element<ElementTagName>)[], children: (string | Element<ElementTagName>)[], attributes: ElementAttributesMap[ElementTagName]) {
		super(tagName);

		if (summary !== undefined) {
			const summaryElement = document.createElement("summary");

			if (summary instanceof Element) {
				summaryElement.append(summary.toString());
			} else if (typeof summary === "string") {
				summaryElement.append(summary);
			}

			this.push(summaryElement.outerHTML);
		}

		this.push(...children);

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
