import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

// <legend> should be part of a <fieldset>

export class FieldSetNode extends Node {
	private readonly attributes: HTMLElementAttributesMap;
	private readonly legend: string;

	public constructor(tagName: keyof TopLevelHTMLElement, legend: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.caption = legend;
	}

	public get fragment(): DocumentFragment {
		// TODO
	}
}
