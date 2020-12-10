import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <source> should be a part of a <picture>, <audio> or <video>
// <track> should be a part of a <audio> or <video>

export class EmbeddedNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	private readonly sources: string[];

	public constructor(tagName: TagName, sources: string[], attributes: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.sources = sources;

		this.attributes = { ...attributes, ...this.attributes };
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined && value !== "") {
				this.template.setAttribute(key, value);
			}
		}

		if (/^audio|picture|video$/i.test(this.type)) {
			// TODO: Handle type
			for (const source of this.sources) {
				const sourceNode = document.createElement("source");
				sourceNode.setAttribute("src", source);

				this.template.appendChild(sourceNode);
			}
		} else {
			// TODO: Handle multiple `src`s
			this.template.setAttribute("src", this.sources[0]);
		}

		for (const childNode of this.children) {
			this.template.innerHTML += childNode;
		}

		return this.template.outerHTML;
	}
}
