/* eslint-disable @typescript-eslint/naming-convention */

export const SectioningContent = [
	"article",
	"aside",
	"footer",
	"header",
	"nav",
	"section"
];

export const HeadingContent = [
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6"
];

export const PhrasingContent = [
	"a",
	"audio",
	"b",
	"br",
	"button",
	"canvas",
	"code",
	"del",
	"em",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"mark",
	"meter",
	"picture",
	"progress",
	"q",
	"select",
	"small",
	"span",
	"strong",
	"sub",
	"sup",
	"textarea",
	"u",
	"video"
];

export const EmbeddedContent = [
	"audio",
	"canvas",
	"iframe",
	"img",
	"picture",
	"video"
];

export const InteractiveContent = [
	"a",
	"audio",
	"button",
	"details",
	"iframe",
	"img",
	"input",
	"label",
	"select",
	"textarea",
	"video"
];

export const FormAssociatedContent = [
	"button",
	"fieldset",
	"form",
	"input",
	"label",
	"meter",
	"progress",
	"select",
	"textarea"
];

export const FlowContent = [
	...EmbeddedContent,
	...FormAssociatedContent,
	...HeadingContent,
	...InteractiveContent,
	...PhrasingContent,
	...SectioningContent,
	"blockquote",
	"div",
	"figure",
	"hr",
	"main",
	"ol",
	"p",
	"pre",
	"s",
	"table",
	"ul"
];

export const TransparentContent = [
	...HeadingContent,
	...SectioningContent,
	"a",
	"audio",
	"b",
	"blockquote",
	"button",
	"canvas",
	"code",
	"del",
	"details",
	"div",
	"em",
	"fieldset",
	"figure",
	"form",
	"i",
	"ins",
	"kbd",
	"label",
	"main",
	"mark",
	"meter",
	"p",
	"picture",
	"pre",
	"progress",
	"q",
	"s",
	"small",
	"span",
	"strong",
	"sub",
	"sup",
	"textarea",
	"u",
	"video"
];
