import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElementMap } from "../types/elements";

// <caption> should be part of a <table>
// <col> should be part of a <colgroup>
// <colgroup> should be part of a <table>
// <tbody> should be part of a <table>
// <td> should be part of a <tr>
// <tfoot> should be part of a <table>
// <th> should be part of a <tr>
// <thead> should be part of a <table>
// <tr> should be part of a <tbody>, <tfoot> or <thead>

export class TableNode<TagName extends keyof TopLevelHTMLElementMap> extends Node<TagName> {
	private readonly caption: string;

	public constructor(tagName: TagName, caption: string, extras: HTMLElementAttributesMap[TagName]) {
		super(tagName);

		this.caption = caption;

		this.attributes = { ...extras, ...this.attributes };
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const tableNode = document.createElement(this.type);

		for (const [key, value] of Object.entries(this.attributes)) {
			if (value !== undefined) {
				tableNode.setAttribute(key, value);
			}
		}

		if (this.caption !== undefined) {
			const caption = document.createElement("caption");
			caption.append(this.caption);

			tableNode.appendChild(caption);
		}

		tableNode.appendChild(document.createElement("thead"));
		tableNode.appendChild(document.createElement("tbody"));
		tableNode.appendChild(document.createElement("tfoot"));

		this.cachedFragment.appendChild(tableNode);

		return this.cachedFragment;
	}
}
