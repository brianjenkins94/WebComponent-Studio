import { Element } from "../abstract/Element";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

export class ListElement<TagName extends keyof TopLevelElementMap> extends Element<TagName> {
	public constructor(tagName: TagName, children: (string | Element<TagName>)[], attributes: ElementAttributesMap[TagName]) {
		super(tagName);

		this.push(...children);

		this.attributes = { ...attributes, ...this.attributes };
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			this.template.setAttribute(key, value);
		}

		for (const child of this.children) {
			const listItemElement = document.createElement("li");
			listItemElement.innerHTML += child;

			this.template.appendChild(listItemElement);
		}

		return this.template.outerHTML;
	}
}
