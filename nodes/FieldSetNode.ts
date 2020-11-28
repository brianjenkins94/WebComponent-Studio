import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

// <legend> should be part of a <fieldset>

export class FieldSetNode extends Node {
	private readonly legend: string;

	public constructor(tagName: keyof TopLevelHTMLElement, legend: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.legend = legend;
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const fieldSetNode = document.createElement(this.type);

		if (this.legend !== undefined) {
			const legend = document.createElement("legend");
			legend.textContent = this.legend;

			fieldSetNode.append(legend);
		}

		for (const [key, value] of Object.entries(this.attributes)) {
			fieldSetNode.setAttribute(key, value);
		}

		this.cachedFragment.appendChild(fieldSetNode);

		return this.cachedFragment;
	}
}
