/* eslint-disable @typescript-eslint/naming-convention */

import { AnchorElement } from "./AnchorElement";
import { DetailsElement } from "./DetailsElement";
import { EmbeddedElement } from "./EmbeddedElement";
import { FieldSetElement } from "./FieldSetElement";
import { FigureElement } from "./FigureElement";
import { GroupingElement } from "./GroupingElement";
import { SelectElement } from "./SelectElement";
import { TableElement } from "./TableElement";
import type { Element } from "../abstract/Element";
import type { TopLevelElementMap } from "../types/elements";

function primeConstructor<TagName extends keyof TopLevelElementMap, ArgsType extends unknown[]>(Node: new (type: TagName, ...args: ArgsType) => Element<TagName>, type: TagName): (...args: ArgsType) => Element<TagName> {
	return function(...args: ArgsType): Element<TagName> {
		return new Node(type, ...args);
	};
}

export const ElementTagNameMap = {
	// Anchor
	"a": primeConstructor(AnchorElement, "a"),

	// Details
	"details": primeConstructor(DetailsElement, "details"),

	// Form-associated
	"form": primeConstructor(GroupingElement, "form"),
	"meter": primeConstructor(GroupingElement, "meter"),
	"progress": primeConstructor(GroupingElement, "progress"),
	"textarea": primeConstructor(GroupingElement, "textarea"),

	// Grouping
	"article": primeConstructor(GroupingElement, "article"),
	"aside": primeConstructor(GroupingElement, "aside"),
	"br": primeConstructor(GroupingElement, "br"), // Childless
	"canvas": primeConstructor(GroupingElement, "canvas"),
	"div": primeConstructor(GroupingElement, "div"),
	"footer": primeConstructor(GroupingElement, "footer"),
	"header": primeConstructor(GroupingElement, "header"),
	"hr": primeConstructor(GroupingElement, "hr"), // Childless
	"main": primeConstructor(GroupingElement, "main"),
	"nav": primeConstructor(GroupingElement, "nav"),
	"ol": primeConstructor(GroupingElement, "ol"),
	"section": primeConstructor(GroupingElement, "section"),
	"ul": primeConstructor(GroupingElement, "ul"),

	// Text-Level
	"b": primeConstructor(GroupingElement, "b"),
	"blockquote": primeConstructor(GroupingElement, "blockquote"),
	"button": primeConstructor(GroupingElement, "button"),
	"reset": primeConstructor(GroupingElement, "button"),
	"submit": primeConstructor(GroupingElement, "button"),
	"code": primeConstructor(GroupingElement, "code"),
	"del": primeConstructor(GroupingElement, "del"),
	"em": primeConstructor(GroupingElement, "em"),
	"h1": primeConstructor(GroupingElement, "h1"),
	"h2": primeConstructor(GroupingElement, "h2"),
	"h3": primeConstructor(GroupingElement, "h3"),
	"h4": primeConstructor(GroupingElement, "h4"),
	"h5": primeConstructor(GroupingElement, "h5"),
	"h6": primeConstructor(GroupingElement, "h6"),
	"i": primeConstructor(GroupingElement, "i"),
	"ins": primeConstructor(GroupingElement, "ins"),
	"kbd": primeConstructor(GroupingElement, "kbd"),
	"label": primeConstructor(GroupingElement, "label"),
	"li": primeConstructor(GroupingElement, "li"),
	"mark": primeConstructor(GroupingElement, "mark"),
	"p": primeConstructor(GroupingElement, "p"),
	"pre": primeConstructor(GroupingElement, "pre"),
	"q": primeConstructor(GroupingElement, "q"),
	"s": primeConstructor(GroupingElement, "s"),
	"small": primeConstructor(GroupingElement, "small"),
	"span": primeConstructor(GroupingElement, "span"),
	"strong": primeConstructor(GroupingElement, "strong"),
	"sub": primeConstructor(GroupingElement, "sub"),
	"sup": primeConstructor(GroupingElement, "sup"),
	"u": primeConstructor(GroupingElement, "u"),

	// Embedded
	"audio": primeConstructor(EmbeddedElement, "audio"),
	"img": primeConstructor(EmbeddedElement, "img"), // Childless
	"picture": primeConstructor(EmbeddedElement, "picture"),
	"video": primeConstructor(EmbeddedElement, "video"),

	// Field Set
	"fieldset": primeConstructor(FieldSetElement, "fieldset"),

	// Figure
	"figure": primeConstructor(FigureElement, "figure"),

	// File
	"file": primeConstructor(GroupingElement, "input"), // Childless

	// IFrame
	"iframe": primeConstructor(GroupingElement, "iframe"),

	// Search
	"search": primeConstructor(GroupingElement, "input"), // Childless

	// Select
	"select": primeConstructor(SelectElement, "select"),

	// Input
	"checkbox": primeConstructor(GroupingElement, "input"), // Childless
	"color": primeConstructor(GroupingElement, "input"), // Childless
	"date": primeConstructor(GroupingElement, "input"), // Childless
	"datetime-local": primeConstructor(GroupingElement, "input"), // Childless
	"email": primeConstructor(GroupingElement, "input"), // Childless
	"hidden": primeConstructor(GroupingElement, "input"), // Childless
	"month": primeConstructor(GroupingElement, "input"), // Childless
	"number": primeConstructor(GroupingElement, "input"), // Childless
	"password": primeConstructor(GroupingElement, "input"), // Childless
	"radio": primeConstructor(GroupingElement, "input"), // Childless
	"range": primeConstructor(GroupingElement, "input"), // Childless
	"tel": primeConstructor(GroupingElement, "input"), // Childless
	"text": primeConstructor(GroupingElement, "input"), // Childless
	"time": primeConstructor(GroupingElement, "input"), // Childless
	"url": primeConstructor(GroupingElement, "input"), // Childless
	"week": primeConstructor(GroupingElement, "input"), // Childless

	// Table
	"table": primeConstructor(TableElement, "table")
};
