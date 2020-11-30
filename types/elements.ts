import type { HTMLCheckboxInputElementAttributes, HTMLColorInputElementAttributes, HTMLDateInputElementAttributes, HTMLDatetimeLocalInputElementAttributes, HTMLEmailInputElementAttributes, HTMLFileInputElementAttributes, HTMLHiddenInputElementAttributes, HTMLButtonInputElementAttributes, HTMLSubmitInputElementAttributes, HTMLMonthInputElementAttributes, HTMLNumberInputElementAttributes, HTMLPasswordInputElementAttributes, HTMLRadioInputElementAttributes, HTMLRangeInputElementAttributes, HTMLSearchInputElementAttributes, HTMLTelInputElementAttributes, HTMLTextInputElementAttributes, HTMLTimeInputElementAttributes, HTMLUrlInputElementAttributes, HTMLWeekInputElementAttributes } from "./attributes";

interface EditingContent {
	"del": HTMLModElement;
	"ins": HTMLModElement;
}

interface EmbeddedContent {
	"audio": HTMLAudioElement;
	"canvas": HTMLCanvasElement;
	"iframe": HTMLIFrameElement;
	"img": HTMLImageElement;
	"picture": HTMLPictureElement;
	"video": HTMLVideoElement;
}

interface AbstractEmbeddedContent {
	"source": HTMLSourceElement;
	"track": HTMLTrackElement;
}

interface FormAssociatedContent {
	"button": HTMLButtonElement;
	"fieldset": HTMLFieldSetElement;
	"form": HTMLFormElement;
	"input": HTMLInputElement;
	"label": HTMLLabelElement;
	"meter": HTMLMeterElement;
	"progress": HTMLProgressElement;
	"select": HTMLSelectElement;
	"textarea": HTMLTextAreaElement;
}

interface AbstractFormAssociatedContent {
	"legend": HTMLLegendElement;
	"optgroup": HTMLOptGroupElement;
	"option": HTMLOptionElement;
}

interface GroupingContent {
	"blockquote": HTMLQuoteElement;
	"div": HTMLDivElement;
	"figure": HTMLElement;
	"hr": HTMLHRElement;
	"li": HTMLLIElement;
	"ol": HTMLOListElement;
	"p": HTMLParagraphElement;
	"pre": HTMLPreElement;
	"ul": HTMLUListElement;
}

interface AbstractGroupingContent {
	"figcaption": HTMLElement;
}

interface HeadingContent {
	"h1": HTMLHeadingElement;
	"h2": HTMLHeadingElement;
	"h3": HTMLHeadingElement;
	"h4": HTMLHeadingElement;
	"h5": HTMLHeadingElement;
	"h6": HTMLHeadingElement;
}

interface InteractiveContent {
	"details": HTMLDetailsElement;
}

interface AbstractInteractiveContent {
	"summary": HTMLElement;
}

interface SectioningContent {
	"article": HTMLElement;
	"aside": HTMLElement;
	"footer": HTMLElement;
	"header": HTMLElement;
	"main": HTMLElement;
	"nav": HTMLElement;
	"section": HTMLElement;
}

interface TabularContent {
	"table": HTMLTableElement;
}

interface AbstractTabularContent {
	"caption": HTMLTableCaptionElement;
	"col": HTMLTableColElement;
	"colgroup": HTMLTableColElement;
	"tbody": HTMLTableSectionElement;
	"td": HTMLTableDataCellElement;
	"tfoot": HTMLTableSectionElement;
	"th": HTMLTableHeaderCellElement;
	"thead": HTMLTableSectionElement;
	"tr": HTMLTableRowElement;
}

interface TextLevelSemantics {
	"a": HTMLAnchorElement;
	"b": HTMLElement;
	"br": HTMLBRElement;
	"code": HTMLElement;
	"em": HTMLElement;
	"i": HTMLElement;
	"kbd": HTMLElement;
	"mark": HTMLElement;
	"q": HTMLQuoteElement;
	"s": HTMLElement;
	"small": HTMLElement;
	"span": HTMLSpanElement;
	"strong": HTMLElement;
	"sub": HTMLElement;
	"sup": HTMLElement;
	"u": HTMLElement;
}

export interface TopLevelHTMLElement extends EditingContent, EmbeddedContent, FormAssociatedContent, GroupingContent, HeadingContent, InteractiveContent, SectioningContent, TabularContent, TextLevelSemantics { }

export interface AbstractTopLevelHTMLElement extends AbstractEmbeddedContent, AbstractFormAssociatedContent, AbstractGroupingContent, AbstractInteractiveContent, AbstractTabularContent { }

export interface ExtendedTopLevelHTMLElement extends TopLevelHTMLElement {
	"button[type=button]": HTMLButtonElement;
	"button[type=reset]": HTMLButtonElement;
	"button[type=submit]": HTMLButtonElement;
	"checkbox": HTMLCheckboxInputElementAttributes;
	"color": HTMLColorInputElementAttributes;
	"date": HTMLDateInputElementAttributes;
	"datetime": HTMLDatetimeLocalInputElementAttributes;
	"email": HTMLEmailInputElementAttributes;
	"file": HTMLFileInputElementAttributes;
	"hidden": HTMLHiddenInputElementAttributes;
	"image": HTMLInputElement;
	"input[type=button]": HTMLButtonInputElementAttributes;
	"input[type=reset]": HTMLButtonInputElementAttributes;
	"input[type=submit]": HTMLSubmitInputElementAttributes;
	"month": HTMLMonthInputElementAttributes;
	"number": HTMLNumberInputElementAttributes;
	"password": HTMLPasswordInputElementAttributes;
	"radio": HTMLRadioInputElementAttributes;
	"range": HTMLRangeInputElementAttributes;
	"reset": HTMLButtonElement;
	"search": HTMLSearchInputElementAttributes;
	"submit": HTMLButtonElement;
	"tel": HTMLTelInputElementAttributes;
	"text": HTMLTextInputElementAttributes;
	"time": HTMLTimeInputElementAttributes;
	"url": HTMLUrlInputElementAttributes;
	"week": HTMLWeekInputElementAttributes;
}
