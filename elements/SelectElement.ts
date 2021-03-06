import { Element } from "../abstract/Element";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>

export class SelectElement<TagName extends keyof TopLevelElementMap> extends Element<TagName> {
	private readonly options: object[];

	public constructor(tagName: TagName, options: object[], attributes: ElementAttributesMap[TagName]) {
		super(tagName);

		this.options = options;

		this.attributes = { ...attributes, ...this.attributes };
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			this.template.setAttribute(key, value);
		}

		(function recurse(options, parent) {
			for (const option of options) {
				let element;

				if (Array.isArray(option["value"])) {
					element = document.createElement("optgroup");

					element.setAttribute("label", option["key"]);

					recurse(option["value"], element);
				} else {
					element = document.createElement("option");

					if (option["key"] !== undefined) {
						element.textContent = option["key"];
					}

					if (option["value"] !== undefined) {
						element.value = option["value"];
					} else {
						element.value = option["key"];
					}
				}

				if (option["disabled"] === true) {
					element.setAttribute("disabled", true);
				}

				if (option["required"] === true) {
					element.setAttribute("required", true);
				}

				if (option["selected"] === true) {
					element.setAttribute("selected", true);
				}

				parent.appendChild(element);
			}
		})(this.options, this.template);

		return this.template.outerHTML;
	}
}
