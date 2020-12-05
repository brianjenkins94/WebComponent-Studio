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

		if (this.legend !== undefined) {
			const legend = document.createElement("legend");
			legend.innerHTML = this.legend;

			fieldSetNode.append(legend);
		}

		for (const [key, value] of Object.entries(this.attributes)) {
			fieldSetNode.setAttribute(key, String(value));
		}

		this.cachedFragment.appendChild(fieldSetNode);

		return this.cachedFragment;
	}
}
