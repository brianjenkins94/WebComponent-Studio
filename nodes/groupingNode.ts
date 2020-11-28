import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

export class GroupingNode extends Node {
	private readonly attributes: HTMLElementAttributesMap;

	public constructor(tagName: keyof TopLevelHTMLElement, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}
	}

	public get fragment(): DocumentFragment {
		// TODO
	}
}
