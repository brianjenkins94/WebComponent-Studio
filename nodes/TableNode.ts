import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

// <caption> should be part of a <table>
// <col> should be part of a <colgroup>
// <colgroup> should be part of a <table>
// <tbody> should be part of a <table>
// <td> should be part of a <tr>
// <tfoot> should be part of a <table>
// <th> should be part of a <tr>
// <thead> should be part of a <table>
// <tr> should be part of a <tbody>, <tfoot> or <thead>

export class TableNode extends Node {
	private readonly caption: string;

	public constructor(tagName: keyof TopLevelHTMLElement, caption: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.caption = caption;
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const tableNode = document.createElement(this.type);

		if (this.caption !== undefined) {
			const caption = document.createElement("caption");
			caption.textContent = this.caption;

			tableNode.append(caption);
		}

		tableNode.append(document.createElement("thead"));
		tableNode.append(document.createElement("tbody"));
		tableNode.append(document.createElement("tfoot"));

		for (const [key, value] of Object.entries(this.attributes)) {
			tableNode.setAttribute(key, value);
		}

		this.cachedFragment.appendChild(tableNode);

		return this.cachedFragment;
	}
}
