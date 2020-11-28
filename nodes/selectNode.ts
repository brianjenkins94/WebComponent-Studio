import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>

export class SelectNode extends Node {
	private readonly attributes: HTMLElementAttributesMap;
	private readonly options: object;

	public constructor(tagName: keyof TopLevelHTMLElement, options: object, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}
	}

	public get fragment(): DocumentFragment {
		// TODO
	}
}
