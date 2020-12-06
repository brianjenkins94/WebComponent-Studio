/* eslint-disable @typescript-eslint/naming-convention */

import { AnchorNode } from "./AnchorNode";
import { DetailsNode } from "./DetailsNode";
import { EmbeddedNode } from "./EmbeddedNode";
import { FieldSetNode } from "./FieldSetNode";
import { FigureNode } from "./FigureNode";
import { GroupingNode } from "./GroupingNode";
import { SelectNode } from "./SelectNode";
import { TableNode } from "./TableNode";
import { TextLevelNode } from "./TextLevelNode";
import type { Node } from "../abstract/Node";
import type { TopLevelHTMLElementMap } from "../types/elements";

function primeConstructor<TagName extends keyof TopLevelHTMLElementMap, ArgsType extends unknown[]>(Node: new (type: TagName, ...args: ArgsType) => Node<TagName>, type: TagName) {
	return function(...args: ArgsType): Node<TagName> {
		return new Node(type, ...args);
	};
}

export const NodeTagNameMap = {
	// Text-Level
	"b": primeConstructor(TextLevelNode, "b"),
	"blockquote": primeConstructor(TextLevelNode, "blockquote"),
	"button": primeConstructor(TextLevelNode, "button"),
	"reset": primeConstructor(TextLevelNode, "button"),
	"submit": primeConstructor(TextLevelNode, "button"),
	"code": primeConstructor(TextLevelNode, "code"),
	"del": primeConstructor(TextLevelNode, "del"),
	"em": primeConstructor(TextLevelNode, "em"),
	"h1": primeConstructor(TextLevelNode, "h1"),
	"h2": primeConstructor(TextLevelNode, "h2"),
	"h3": primeConstructor(TextLevelNode, "h3"),
	"h4": primeConstructor(TextLevelNode, "h4"),
	"h5": primeConstructor(TextLevelNode, "h5"),
	"h6": primeConstructor(TextLevelNode, "h6"),
	"i": primeConstructor(TextLevelNode, "i"),
	"ins": primeConstructor(TextLevelNode, "ins"),
	"kbd": primeConstructor(TextLevelNode, "kbd"),
	"label": primeConstructor(TextLevelNode, "label"),
	"li": primeConstructor(TextLevelNode, "li"),
	"mark": primeConstructor(TextLevelNode, "mark"),
	"p": primeConstructor(TextLevelNode, "p"),
	"pre": primeConstructor(TextLevelNode, "pre"),
	"q": primeConstructor(TextLevelNode, "q"),
	"s": primeConstructor(TextLevelNode, "s"),
	"small": primeConstructor(TextLevelNode, "small"),
	"span": primeConstructor(TextLevelNode, "span"),
	"strong": primeConstructor(TextLevelNode, "strong"),
	"sub": primeConstructor(TextLevelNode, "sub"),
	"sup": primeConstructor(TextLevelNode, "sup"),
	"u": primeConstructor(TextLevelNode, "u"),

	// Embedded
	"audio": primeConstructor(EmbeddedNode, "audio"),
	"img": primeConstructor(EmbeddedNode, "img"), // Childless
	"picture": primeConstructor(EmbeddedNode, "picture"),
	"video": primeConstructor(EmbeddedNode, "video"),

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

	// Form-associated
	"form": primeConstructor(GroupingNode, "form"),
	"meter": primeConstructor(GroupingNode, "meter"),
	"progress": primeConstructor(GroupingNode, "progress"),
	"textarea": primeConstructor(GroupingNode, "textarea"),

	// IFrame
	"iframe": primeConstructor(GroupingNode, "iframe"),

	// FieldSet
	"fieldset": primeConstructor(FieldSetNode, "fieldset"),

	// Button-like
	"inputButton": primeConstructor(GroupingNode, "input"), // Childless
	"inputReset": primeConstructor(GroupingNode, "input"), // Childless
	"inputSubmit": primeConstructor(GroupingNode, "input"), // Childless

	// Search
	"search": primeConstructor(GroupingNode, "input"), // Childless

	// File
	"file": primeConstructor(GroupingNode, "input"), // Childless

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

	// Image Input
	"image": primeConstructor(GroupingNode, "input"), // Childless

	// Select
	"select": primeConstructor(SelectNode, "select"),

	// Figure
	"figure": primeConstructor(FigureNode, "figure"),

	// Details
	"details": primeConstructor(DetailsNode, "details"),

	// Table
	"table": primeConstructor(TableNode, "table"),

	// Anchor
	"a": primeConstructor(AnchorNode, "a")
};
