import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>

export class SelectNode extends Node {
	private readonly options: object;

	public constructor(tagName: keyof TopLevelHTMLElement, options: object, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		this.options = options;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		// TODO
	}
}
