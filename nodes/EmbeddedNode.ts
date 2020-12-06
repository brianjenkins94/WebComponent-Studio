import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <source> should be a part of a <picture>, <audio> or <video>
// <track> should be a part of a <audio> or <video>

export class EmbeddedNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	private readonly sources: string[];

	public constructor(tagName: TagName, sources: string[], extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.sources = sources;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const embeddedNode = document.createElement(this.type);

		if (/^audio|picture|video$/i.test(this.type)) {
			// TODO: Handle type
			for (const source of this.sources) {
				const sourceNode = document.createElement("source");
				sourceNode.setAttribute("src", source);

				embeddedNode.append(sourceNode);
			}
		} else {
			// TODO: Handle multiple `src`s
			embeddedNode.setAttribute("src", this.sources[0]);
		}

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined) {
				embeddedNode.setAttribute(key, value);
			}
		}

		this.cachedFragment.appendChild(embeddedNode);

		return this.cachedFragment;
	}
}
