import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

// <summary> should be part of a <details>

export class DetailsNode extends Node {
	private readonly summary: string;

	public constructor(tagName: keyof TopLevelHTMLElement, summary: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		this.summary = summary;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const detailsNode = document.createElement(this.type);

		if (this.summary !== undefined) {
			const summary = document.createElement("summary");
			summary.innerHTML = this.summary;

			detailsNode.append(summary);
		}

		for (const [key, value] of Object.entries(this.attributes)) {
			detailsNode.setAttribute(key, String(value));
		}

		this.cachedFragment.appendChild(detailsNode);

		return this.cachedFragment;
	}
}
