import { Element } from "../abstract/Element";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

export class AnchorElement<TagName extends keyof TopLevelElementMap> extends Element<TagName> {
	public constructor(tagName: TagName, textContent: (string | Element<TagName>)[], attributes: ElementAttributesMap[TagName]) {
		super(tagName);

		this.push(...textContent);

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
