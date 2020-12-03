import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>

export class SelectNode<TagName extends keyof TopLevelHTMLElementMap> extends Node {
	private readonly options: object;

	public constructor(tagName: TagName, options: object, extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.options = options;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		// TODO
	}
}
