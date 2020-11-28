import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

export class IFrameNode extends Node {
	private readonly attributes: HTMLElementAttributesMap;
	private readonly source: string;

	public constructor(tagName: keyof TopLevelHTMLElement, source: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.source = source;
	}

	public get fragment(): DocumentFragment {
		// TODO
	}
}
