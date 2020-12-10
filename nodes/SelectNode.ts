import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>

export class SelectNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	private readonly options: object[];

	public constructor(tagName: TagName, options: object[], attributes: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.options = options;

		this.attributes = { ...attributes, ...this.attributes };
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined && value !== "") {
				this.template.setAttribute(key, value);
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
		})(this.options, this.template);

		for (const childNode of this.children) {
			this.template.innerHTML += childNode;
		}

		return this.template.outerHTML;
	}
}
