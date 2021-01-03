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

export class TableElement<ElementTagName extends keyof TopLevelElementMap> extends Element<ElementTagName> {
	public thead: (string | Node)[][] = [];
	public tbody: (string | Node)[][] = [];
	public tfoot: (string | Node)[][] = [];

	public constructor(tagName: ElementTagName, caption: string, tableHeader: (string | Node)[], attributes: ElementAttributesMap[ElementTagName]) {
		super(tagName);

		const captionElement = document.createElement("caption");
		captionElement.append(caption);

		this.thead.push(tableHeader);

		this.children.push(captionElement);

		this.attributes = { ...attributes, ...this.attributes };
	}

	public push(...items: (string | Node)[]): this {
		this.tbody.push(items);

		return this;
	}

	public unshift(...items: (string | Node)[]): this {
		this.tbody.unshift(items);

		return this;
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
					} else {
						tableCell.innerHTML += cellContent;
					}

					tableRow.appendChild(tableCell);
				}

				tableHeadElement.appendChild(tableRow);
			}

			this.children.push(tableHeadElement);
		}

		if (this.tbody.length > 0) {
			const tableBodyElement = document.createElement("tbody");

			for (const row of this.tbody) {
				const tableRow = document.createElement("tr");

				for (const cellContent of row) {
					const tableCell = document.createElement("td");

					if (cellContent instanceof Node) {
						tableCell.append(cellContent);
					} else {
						tableCell.innerHTML += cellContent;
					}

					tableRow.appendChild(tableCell);
				}

				tableBodyElement.appendChild(tableRow);
			}

			this.children.push(tableBodyElement);
		}

		if (this.tfoot.length > 0) {
			const tableFootElement = document.createElement("tfoot");

			for (const row of this.tfoot) {
				const tableRow = document.createElement("tr");

				for (const cellContent of row) {
					const tableCell = document.createElement("td");

					if (cellContent instanceof Node) {
						tableCell.append(cellContent);
					} else {
						tableCell.innerHTML += cellContent;
					}

					tableRow.appendChild(tableCell);
				}

				tableFootElement.appendChild(tableRow);
			}

			this.children.push(tableFootElement);
		}

		for (const child of this.children) {
			this.template.append(child);
		}

		return this.template.outerHTML;
	}
}
