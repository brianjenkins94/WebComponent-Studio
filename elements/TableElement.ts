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
	public thead: (string | Element<TagName>)[][] = [];
	public tbody: (string | Element<TagName>)[][] = [];
	public tfoot: (string | Element<TagName>)[][] = [];

	public constructor(tagName: TagName, caption: string, tableHeader: (string | Element<TagName>)[], attributes: ElementAttributesMap[TagName]) {
		super(tagName);

		if (tableHeader.length > 0) {
			this.thead.push(tableHeader);
		}

		if (caption !== undefined) {
			const captionElement = document.createElement("caption");
			captionElement.append(caption);

			this.children.push(captionElement.outerHTML);
		}

		this.attributes = { ...attributes, ...this.attributes };
	}

	public push(...items: (string | Element<TagName>)[]): this {
		const row = [];

		for (const item of items) {
			if (typeof item === "string") {
				row.push(item);
			} else {
				row.push(item.toString());
			}
		}

		this.tbody.push(row);

		return this;
	}

	public unshift(...items: (string | Element<TagName>)[]): this {
		const row = [];

		for (const item of items) {
			if (item instanceof Element) {
				row.unshift(item.toString());
			} else {
				row.unshift(item);
			}
		}

		this.tbody.push(row);

		return this;
	}

	public [Symbol.iterator]() {
		// TODO
	}

	public toString(): string {
		this.template = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			this.template.setAttribute(key, value);
		}

		for (const [key, rows] of Object.entries({ "thead": this.thead, "tbody": this.tbody, "tfoot": this.tfoot })) {
			if (rows.length > 0) {
				const tableHeadElement = document.createElement(key);

				for (const row of rows) {
					const tableRow = document.createElement("tr");

					for (const cellContent of row) {
						const tableCell = document.createElement(key === "thead" ? "th" : "td");

						tableCell.innerHTML += cellContent;

						tableRow.appendChild(tableCell);
					}

					tableHeadElement.appendChild(tableRow);
				}

				this.children.push(tableHeadElement.outerHTML);
			}
		}

		this.template.innerHTML = this.children.join("");

		return this.template.outerHTML;
	}
}
