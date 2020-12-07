import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <summary> should be part of a <details>

export class DetailsNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	private readonly summary: string;

	public constructor(tagName: TagName, summary: string, extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.summary = summary;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const detailsNode = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined) {
				detailsNode.setAttribute(key, value);
			}
		}

		if (this.summary !== undefined) {
			const summary = document.createElement("summary");
			summary.append(this.summary);

			detailsNode.appendChild(summary);
		}

		this.cachedFragment.appendChild(detailsNode);

		return this.cachedFragment;
	}
}
