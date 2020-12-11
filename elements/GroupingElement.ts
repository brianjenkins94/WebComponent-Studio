import { Element } from "../abstract/Element";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

export class GroupingElement<TagName extends keyof TopLevelElementMap> extends Element<TagName> {
	public constructor(tagName: TagName, children: (string | HTMLElement)[], attributes: ElementAttributesMap[TagName]) {
		super(tagName);

		this.children.push(...children);

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