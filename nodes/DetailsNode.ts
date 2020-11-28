import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

// <summary> should be part of a <details>

export class DetailsNode extends Node {
	private readonly attributes: HTMLElementAttributesMap;
	private readonly summary: string;

	public constructor(tagName: keyof TopLevelHTMLElement, summary: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.summary = summary;
	}

	public get fragment(): DocumentFragment {
		// TODO
	}
}
