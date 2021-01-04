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
			if (item instanceof Element) {
				row.push(item.toString());
			} else {
				row.push(item);
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

		if (this.thead.length > 0) {
			const tableHeadElement = document.createElement("thead");

			for (const row of this.thead) {
				const tableRow = document.createElement("tr");

				for (const cellContent of row) {
					const tableCell = document.createElement("th");

					if (cellContent instanceof Node) {
						tableCell.append(cellContent);
					} else if (typeof cellContent === "string") {
						tableCell.innerHTML += cellContent;
					}

					tableRow.appendChild(tableCell);
				}

				tableHeadElement.appendChild(tableRow);
			}

			this.children.push(tableHeadElement.outerHTML);
		}

		if (this.tbody.length > 0) {
			const tableBodyElement = document.createElement("tbody");

			for (const row of this.tbody) {
				const tableRow = document.createElement("tr");

				for (const cellContent of row) {
					const tableCell = document.createElement("td");

					if (cellContent instanceof Node) {
						tableCell.append(cellContent);
					} else if (typeof cellContent === "string") {
						tableCell.innerHTML += cellContent;
					}

					tableRow.appendChild(tableCell);
				}

				tableBodyElement.appendChild(tableRow);
			}

			this.children.push(tableBodyElement.outerHTML);
		}

		if (this.tfoot.length > 0) {
			const tableFootElement = document.createElement("tfoot");

			for (const row of this.tfoot) {
				const tableRow = document.createElement("tr");

				for (const cellContent of row) {
					const tableCell = document.createElement("td");

					if (cellContent instanceof Node) {
						tableCell.append(cellContent);
					} else if (typeof cellContent === "string") {
						tableCell.innerHTML += cellContent;
					}

					tableRow.appendChild(tableCell);
				}

				tableFootElement.appendChild(tableRow);
			}

			this.children.push(tableFootElement.outerHTML);
		}

		this.template.innerHTML = this.children.join("");

		return this.template.outerHTML;
	}
}
