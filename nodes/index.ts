import { AnchorNode } from "./AnchorNode";
import type { TopLevelHTMLElement } from "../types/elements";

function primeConstructor(node, element: keyof TopLevelHTMLElement, ...args: ConstructorParameters<typeof node>): typeof node {
	return node[element](element, ...args);
}

export const NodeTagNameMap = {
	// Text Content
	"del": primeConstructor(TextLevelNode, "del"),
	"ins": primeConstructor(TextLevelNode, "ins"),
	"button": primeConstructor(TextLevelNode, "button"),
	"label": primeConstructor(TextLevelNode, "label"),
	"blockquote": primeConstructor(TextLevelNode, "blockquote"),
	"li": primeConstructor(TextLevelNode, "li"),
	"p": primeConstructor(TextLevelNode, "p"),
	"pre": primeConstructor(TextLevelNode, "pre"),
	"h1": primeConstructor(TextLevelNode, "h1"),
	"h2": primeConstructor(TextLevelNode, "h2"),
	"h3": primeConstructor(TextLevelNode, "h3"),
	"h4": primeConstructor(TextLevelNode, "h4"),
	"h5": primeConstructor(TextLevelNode, "h5"),
	"h6": primeConstructor(TextLevelNode, "h6"),
	"b": primeConstructor(TextLevelNode, "b"),
	"code": primeConstructor(TextLevelNode, "code"),
	"em": primeConstructor(TextLevelNode, "em"),
	"i": primeConstructor(TextLevelNode, "i"),
	"kbd": primeConstructor(TextLevelNode, "kbd"),
	"mark": primeConstructor(TextLevelNode, "mark"),
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
	"canvas": primeConstructor(GroupingNode, "canvas"),
	"div": primeConstructor(GroupingNode, "div"),
	"ol": primeConstructor(GroupingNode, "ol"),
	"ul": primeConstructor(GroupingNode, "ul"),
	"article": primeConstructor(GroupingNode, "article"),
	"aside": primeConstructor(GroupingNode, "aside"),
	"footer": primeConstructor(GroupingNode, "footer"),
	"header": primeConstructor(GroupingNode, "header"),
	"main": primeConstructor(GroupingNode, "main"),
	"nav": primeConstructor(GroupingNode, "nav"),
	"section": primeConstructor(GroupingNode, "section"),
	"hr": primeConstructor(GroupingNode, "hr"), // Childless
	"br": primeConstructor(GroupingNode, "br"), // Childless

	// Form-associated
	"meter": primeConstructor(GroupingNode, "meter"),
	"progress": primeConstructor(GroupingNode, "progress"),
	"textarea": primeConstructor(GroupingNode, "textarea"),

	// IFrame
	"iframe": primeConstructor(IFrameNode, "iframe"),

	// FieldSet
	"fieldset": primeConstructor(FieldSetNode, "fieldset"),

	// Form
	"form": primeConstructor(FormNode, "form"),

	// Input
	"input": primeConstructor(InputNode, "input"),

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
