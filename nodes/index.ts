import { AnchorNode } from "./AnchorNode";
import { DetailsNode } from "./DetailsNode";
import { EmbeddedNode } from "./EmbeddedNode";
import { FieldSetNode } from "./FieldSetNode";
import { FigureNode } from "./FigureNode";
import { GroupingNode } from "./GroupingNode";
import { SelectNode } from "./SelectNode";
import { TableNode } from "./TableNode";
import { TextLevelNode } from "./TextLevelNode";
import type { TopLevelHTMLElement } from "../types/elements";

function primeConstructor(Node, tagName: keyof TopLevelHTMLElement): () => Node {
	return function(...args: ConstructorParameters<typeof Node>): Node {
		return new Node(tagName, ...args);
	};
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NodeTagNameMap = {
	// Text Content
	"b": primeConstructor(TextLevelNode, "b"),
	"blockquote": primeConstructor(TextLevelNode, "blockquote"),
	"button": primeConstructor(TextLevelNode, "button"),
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

	// Input
	//"input": primeConstructor(InputNode, "input"),

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
