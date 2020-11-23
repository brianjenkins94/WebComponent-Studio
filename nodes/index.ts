import { AnchorNode } from "./anchorNode";

export const NodeTagNameMap = {
	// Text Content
	"del": TextLevelNode,
	"ins": TextLevelNode,
	"button": TextLevelNode,
	"label": TextLevelNode,
	"blockquote": TextLevelNode,
	"li": TextLevelNode,
	"p": TextLevelNode,
	"pre": TextLevelNode,
	"h1": TextLevelNode,
	"h2": TextLevelNode,
	"h3": TextLevelNode,
	"h4": TextLevelNode,
	"h5": TextLevelNode,
	"h6": TextLevelNode,
	"b": TextLevelNode,
	"code": TextLevelNode,
	"i": TextLevelNode,
	"kbd": TextLevelNode,
	"mark": TextLevelNode,
	"q": TextLevelNode,
	"s": TextLevelNode,
	"small": TextLevelNode,
	"span": TextLevelNode,
	"strong": TextLevelNode,
	"sub": TextLevelNode,
	"sup": TextLevelNode,
	"u": TextLevelNode,

	// Embedded
	"audio": Node,
	"img": Node, // Childless
	"picture": Node,
	"video": Node,

	// Grouping
	"div": GroupingNode,
	"ol": GroupingNode,
	"ul": GroupingNode,
	"article": GroupingNode,
	"aside": GroupingNode,
	"footer": GroupingNode,
	"header": GroupingNode,
	"main": GroupingNode,
	"nav": GroupingNode,
	"section": GroupingNode,
	"hr": GroupingNode, // Childless
	"br": GroupingNode, // Childless

	// Form-associated
	"meter": GroupingNode,
	"progress": GroupingNode,
	"textarea": GroupingNode,

	// IFrame
	"iframe": IFrameNode,

	// FieldSet
	"fieldset": FieldSetNode,

	// Form
	"form": FormNode,

	// Input
	"input": InputNode, // Childless

	// Select
	"select": SelectNode,

	// Figure
	"figure": FigureNode,

	// Details
	"details": DetailsNode,

	// Table
	"table": TableNode,

	// Anchor
	"a": AnchorNode
};
