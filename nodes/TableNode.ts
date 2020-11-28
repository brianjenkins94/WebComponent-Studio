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
	private readonly attributes: HTMLElementAttributesMap;
	private readonly caption: string;

	public constructor(tagName: keyof TopLevelHTMLElement, caption: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.caption = caption;
	}

	public get fragment(): DocumentFragment {
		// TODO
	}
}
