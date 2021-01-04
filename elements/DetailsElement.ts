import { Element } from "../abstract/Element";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

// <summary> should be part of a <details>

export class DetailsElement<TagName extends keyof TopLevelElementMap> extends Element<TagName> {
	public constructor(tagName: TagName, summary: (string | Element<TagName>)[], children: (string | Element<TagName>)[], attributes: ElementAttributesMap[TagName]) {
		super(tagName);

		if (summary !== undefined) {
			const summaryElement = document.createElement("summary");
			summaryElement.append(summary.toString());

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
