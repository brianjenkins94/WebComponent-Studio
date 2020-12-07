import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>

export class SelectNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	private readonly options: object[];

	public constructor(tagName: TagName, options: object[], extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.options = options;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const selectNode = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined) {
				selectNode.setAttribute(key, value);
			}
		}

		(function recurse(options, parent) {
			for (const option of options) {
				let node;

				if (Array.isArray(option["value"])) {
					node = document.createElement("optgroup");

					node.setAttribute("label", option["key"]);

					recurse(option["value"], node);
				} else {
					node = document.createElement("option");

					if (option["key"] !== undefined) {
						node.textContent = option["key"];
					}

					if (option["value"] !== undefined) {
						node.value = option["value"];
					} else {
						node.value = option["key"];
					}
				}

				if (option["disabled"] === true) {
					node.setAttribute("disabled", true);
				}

				if (option["required"] === true) {
					node.setAttribute("required", true);
				}

				if (option["selected"] === true) {
					node.setAttribute("selected", true);
				}

				parent.appendChild(node);
			}
		})(this.options, selectNode);

		this.cachedFragment.appendChild(selectNode);

		return this.cachedFragment;
	}
}
