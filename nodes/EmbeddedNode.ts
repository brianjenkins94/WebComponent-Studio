import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

// <source> should be a part of a <picture>, <audio> or <video>
// <track> should be a part of a <audio> or <video>

export class EmbeddedNode extends Node {
	private readonly attributes: HTMLElementAttributesMap;
	private readonly sources: string[];

	public constructor(tagName: keyof TopLevelHTMLElement, sources: string[], extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.sources = sources;
	}

	public get fragment(): DocumentFragment {
		// TODO
	}
}
