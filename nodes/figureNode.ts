import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

// <figcaption> should be part of a <figure>

export class FigureNode extends Node {
	private readonly attributes: HTMLElementAttributesMap;
	private readonly caption: string;

	public constructor(tagName: keyof TopLevelHTMLElement, caption: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.caption = caption;
	}

	public get fragment(): DocumentFragment {
		// TODO
	}
}
