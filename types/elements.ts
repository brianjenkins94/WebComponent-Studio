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
	"checkbox": HTMLInputElement;
	"color": HTMLInputElement;
	"date": HTMLInputElement;
	"datetime-local": HTMLInputElement;
	"email": HTMLInputElement;
	"fieldset": HTMLFieldSetElement;
	"file": HTMLInputElement;
	"form": HTMLFormElement;
	"hidden": HTMLInputElement;
	"input": HTMLInputElement;
	"label": HTMLLabelElement;
	"meter": HTMLMeterElement;
	"month": HTMLInputElement;
	"number": HTMLInputElement;
	"password": HTMLInputElement;
	"progress": HTMLProgressElement;
	"radio": HTMLInputElement;
	"range": HTMLInputElement;
	"reset": HTMLButtonElement;
	"search": HTMLInputElement;
	"select": HTMLSelectElement;
	"submit": HTMLButtonElement;
	"tel": HTMLInputElement;
	"text": HTMLInputElement;
	"textarea": HTMLTextAreaElement;
	"time": HTMLInputElement;
	"url": HTMLInputElement;
	"week": HTMLInputElement;
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
	"ol": HTMLOListElement;
	"p": HTMLParagraphElement;
	"pre": HTMLPreElement;
	"ul": HTMLUListElement;
}

interface AbstractGroupingContent {
	"figcaption": HTMLElement;
	"li": HTMLLIElement;
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

export interface TopLevelElementMap extends EditingContent, EmbeddedContent, FormAssociatedContent, GroupingContent, HeadingContent, InteractiveContent, SectioningContent, TabularContent, TextLevelSemantics { }

export interface AbstractTopLevelElementMap extends AbstractEmbeddedContent, AbstractFormAssociatedContent, AbstractGroupingContent, AbstractInteractiveContent, AbstractTabularContent { }
