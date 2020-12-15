import { Element } from "../abstract/Element";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";

// <caption> should be part of a <table>
// <col> should be part of a <colgroup>
// <colgroup> should be part of a <table>
// <tbody> should be part of a <table>
// <td> should be part of a <tr>
// <tfoot> should be part of a <table>
// <th> should be part of a <tr>
// <thead> should be part of a <table>
// <tr> should be part of a <tbody>, <tfoot> or <thead>

export class TableElement<TagName extends keyof TopLevelElementMap> extends Element<TagName> {
	public constructor(tagName: TagName, caption: string, tableHeader: (string | Node)[], attributes: ElementAttributesMap[TagName]) {
		super(tagName);

		const captionElement = document.createElement("caption");
		captionElement.append(caption);

		this.children.push(captionElement);

		this.attributes = { ...attributes, ...this.attributes };
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			this.template.setAttribute(key, value);
		}

		this.template.appendChild(document.createElement("thead"));
		this.template.appendChild(document.createElement("tbody"));
		this.template.appendChild(document.createElement("tfoot"));

		for (const child of this.children) {
			if (child instanceof HTMLElement) {
				this.template.append(child);
			} else {
				this.template.innerHTML += child;
			}
		}

		return this.template.outerHTML;
	}
}
