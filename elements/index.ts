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

function primeConstructor<TagName extends keyof TopLevelElementMap, ArgsType extends any[]>(Node: new (type: TagName, ...args: ArgsType) => Element<TagName>, type: TagName): (...args: ArgsType) => Element<TagName> {
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
	"reset": primeConstructor(GroupingElement, "reset"),
	"submit": primeConstructor(GroupingElement, "submit"),
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
	"file": primeConstructor(GroupingElement, "file"), // Childless

	// IFrame
	"iframe": primeConstructor(GroupingElement, "iframe"),

	// Search
	"search": primeConstructor(GroupingElement, "search"), // Childless

	// Select
	"select": primeConstructor(SelectElement, "select"),

	// Input
	"checkbox": primeConstructor(GroupingElement, "checkbox"), // Childless
	"color": primeConstructor(GroupingElement, "color"), // Childless
	"date": primeConstructor(GroupingElement, "date"), // Childless
	"datetime-local": primeConstructor(GroupingElement, "datetime-local"), // Childless
	"email": primeConstructor(GroupingElement, "email"), // Childless
	"hidden": primeConstructor(GroupingElement, "hidden"), // Childless
	"month": primeConstructor(GroupingElement, "month"), // Childless
	"number": primeConstructor(GroupingElement, "number"), // Childless
	"password": primeConstructor(GroupingElement, "password"), // Childless
	"radio": primeConstructor(GroupingElement, "radio"), // Childless
	"range": primeConstructor(GroupingElement, "range"), // Childless
	"tel": primeConstructor(GroupingElement, "tel"), // Childless
	"text": primeConstructor(GroupingElement, "text"), // Childless
	"time": primeConstructor(GroupingElement, "time"), // Childless
	"url": primeConstructor(GroupingElement, "url"), // Childless
	"week": primeConstructor(GroupingElement, "week"), // Childless

	// Table
	"table": primeConstructor(TableElement, "table")
};
