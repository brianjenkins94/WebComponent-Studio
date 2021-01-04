import { Element } from "../abstract/Element";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

// <source> should be a part of a <picture>, <audio> or <video>
// <track> should be a part of a <audio> or <video>

export class EmbeddedElement<TagName extends keyof TopLevelElementMap> extends Element<TagName> {
	private readonly sources: string[];

	public constructor(tagName: TagName, sources: string[], attributes: ElementAttributesMap[TagName]) {
		super(tagName);

		this.sources = sources;

		this.attributes = { ...attributes, ...this.attributes };
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			this.template.setAttribute(key, value);
		}

		if (/^audio|picture|video$/i.test(this.type)) {
			// TODO: Support `<track>`s
			for (const source of this.sources) {
				const sourceElement = document.createElement("source");
				sourceElement.setAttribute("src", source);

				this.template.appendChild(sourceElement);
			}
		} else {
			// TODO: Handle multiple `src`s
			this.template.setAttribute("src", this.sources[0]);
		}

		this.template.innerHTML = this.children.join("");

		return this.template.outerHTML;
	}
}
