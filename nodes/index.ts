/* eslint-disable @typescript-eslint/naming-convention */

import { AnchorNode } from "./AnchorNode";
import { DetailsNode } from "./DetailsNode";
import { EmbeddedNode } from "./EmbeddedNode";
import { FieldSetNode } from "./FieldSetNode";
import { FigureNode } from "./FigureNode";
import { GroupingNode } from "./GroupingNode";
import { SelectNode } from "./SelectNode";
import { TableNode } from "./TableNode";
import type { Node } from "../abstract/Node";
import type { TopLevelHTMLElementMap } from "../types/elements";

function primeConstructor<TagName extends keyof TopLevelHTMLElementMap, ArgsType extends unknown[]>(Node: new (type: TagName, ...args: ArgsType) => Node<TagName>, type: TagName) {
	return function(...args: ArgsType): Node<TagName> {
		return new Node(type, ...args);
	};
}

export const NodeTagNameMap = {
	// Anchor
	"a": primeConstructor(AnchorNode, "a"),

	// Details
	"details": primeConstructor(DetailsNode, "details"),

	// Form-associated
	"form": primeConstructor(GroupingNode, "form"),
	"meter": primeConstructor(GroupingNode, "meter"),
	"progress": primeConstructor(GroupingNode, "progress"),
	"textarea": primeConstructor(GroupingNode, "textarea"),

	// Grouping
	"article": primeConstructor(GroupingNode, "article"),
	"aside": primeConstructor(GroupingNode, "aside"),
	"br": primeConstructor(GroupingNode, "br"), // Childless
	"canvas": primeConstructor(GroupingNode, "canvas"),
	"div": primeConstructor(GroupingNode, "div"),
	"footer": primeConstructor(GroupingNode, "footer"),
	"header": primeConstructor(GroupingNode, "header"),
	"hr": primeConstructor(GroupingNode, "hr"), // Childless
	"main": primeConstructor(GroupingNode, "main"),
	"nav": primeConstructor(GroupingNode, "nav"),
	"ol": primeConstructor(GroupingNode, "ol"),
	"section": primeConstructor(GroupingNode, "section"),
	"ul": primeConstructor(GroupingNode, "ul"),

	// Text-Level
	"b": primeConstructor(GroupingNode, "b"),
	"blockquote": primeConstructor(GroupingNode, "blockquote"),
	"button": primeConstructor(GroupingNode, "button"),
	"reset": primeConstructor(GroupingNode, "button"),
	"submit": primeConstructor(GroupingNode, "button"),
	"code": primeConstructor(GroupingNode, "code"),
	"del": primeConstructor(GroupingNode, "del"),
	"em": primeConstructor(GroupingNode, "em"),
	"h1": primeConstructor(GroupingNode, "h1"),
	"h2": primeConstructor(GroupingNode, "h2"),
	"h3": primeConstructor(GroupingNode, "h3"),
	"h4": primeConstructor(GroupingNode, "h4"),
	"h5": primeConstructor(GroupingNode, "h5"),
	"h6": primeConstructor(GroupingNode, "h6"),
	"i": primeConstructor(GroupingNode, "i"),
	"ins": primeConstructor(GroupingNode, "ins"),
	"kbd": primeConstructor(GroupingNode, "kbd"),
	"label": primeConstructor(GroupingNode, "label"),
	"li": primeConstructor(GroupingNode, "li"),
	"mark": primeConstructor(GroupingNode, "mark"),
	"p": primeConstructor(GroupingNode, "p"),
	"pre": primeConstructor(GroupingNode, "pre"),
	"q": primeConstructor(GroupingNode, "q"),
	"s": primeConstructor(GroupingNode, "s"),
	"small": primeConstructor(GroupingNode, "small"),
	"span": primeConstructor(GroupingNode, "span"),
	"strong": primeConstructor(GroupingNode, "strong"),
	"sub": primeConstructor(GroupingNode, "sub"),
	"sup": primeConstructor(GroupingNode, "sup"),
	"u": primeConstructor(GroupingNode, "u"),

	// Embedded
	"audio": primeConstructor(EmbeddedNode, "audio"),
	"img": primeConstructor(EmbeddedNode, "img"), // Childless
	"picture": primeConstructor(EmbeddedNode, "picture"),
	"video": primeConstructor(EmbeddedNode, "video"),

	// Field Set
	"fieldset": primeConstructor(FieldSetNode, "fieldset"),

	// Figure
	"figure": primeConstructor(FigureNode, "figure"),

	// File
	"file": primeConstructor(GroupingNode, "input"), // Childless

	// IFrame
	"iframe": primeConstructor(GroupingNode, "iframe"),

	// Search
	"search": primeConstructor(GroupingNode, "input"), // Childless

	// Select
	"select": primeConstructor(SelectNode, "select"),

	// Image Input
	"image": primeConstructor(GroupingNode, "input"), // Childless

	// Input
	"checkbox": primeConstructor(GroupingNode, "input"), // Childless
	"color": primeConstructor(GroupingNode, "input"), // Childless
	"date": primeConstructor(GroupingNode, "input"), // Childless
	"datetime-local": primeConstructor(GroupingNode, "input"), // Childless
	"email": primeConstructor(GroupingNode, "input"), // Childless
	"hidden": primeConstructor(GroupingNode, "input"), // Childless
	"month": primeConstructor(GroupingNode, "input"), // Childless
	"number": primeConstructor(GroupingNode, "input"), // Childless
	"password": primeConstructor(GroupingNode, "input"), // Childless
	"radio": primeConstructor(GroupingNode, "input"), // Childless
	"range": primeConstructor(GroupingNode, "input"), // Childless
	"tel": primeConstructor(GroupingNode, "input"), // Childless
	"text": primeConstructor(GroupingNode, "input"), // Childless
	"time": primeConstructor(GroupingNode, "input"), // Childless
	"url": primeConstructor(GroupingNode, "input"), // Childless
	"week": primeConstructor(GroupingNode, "input"), // Childless

	// Table
	"table": primeConstructor(TableNode, "table")
};
