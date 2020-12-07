import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <legend> should be part of a <fieldset>

export class FieldSetNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	private readonly legend: string;

	public constructor(tagName: TagName, legend: string, extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.legend = legend;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const fieldSetNode = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined) {
				fieldSetNode.setAttribute(key, value);
			}
		}

		if (this.legend !== undefined) {
			const legendNode = document.createElement("legend");
			legendNode.append(this.legend);

			fieldSetNode.appendChild(legendNode);
		}

		this.cachedFragment.appendChild(fieldSetNode);

		return this.cachedFragment;
	}
}
