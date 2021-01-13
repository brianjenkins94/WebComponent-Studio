import type { ChromiumBrowser } from "playwright-chromium";
import { chromium } from "playwright-chromium";

const cssProperties = ["align-content", "align-items", "align-self", "align-tracks", "all", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "animation", "appearance", "aspect-ratio", "backdrop-filter", "backface-visibility", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position-x", "background-position-y", "background-position", "background-repeat", "background-size", "background", "block-overflow", "block-size", "border-block-color", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-end", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-start", "border-block-style", "border-block-width", "border-block", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-bottom", "border-collapse", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-image", "border-inline-color", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-end", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-start", "border-inline-style", "border-inline-width", "border-inline", "border-left-color", "border-left-style", "border-left-width", "border-left", "border-radius", "border-right-color", "border-right-style", "border-right-width", "border-right", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-style", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-top", "border-width", "border", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip-path", "color-adjust", "color", "column-count", "column-fill", "column-gap", "column-rule-color", "column-rule-style", "column-rule-width", "column-rule", "column-span", "column-width", "columns", "contain", "content-visibility", "content", "counter-increment", "counter-reset", "counter-set", "cursor", "direction", "display", "empty-cells", "filter", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "flex", "float", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-size-adjust", "font-size", "font-smooth", "font-stretch", "font-style", "font-synthesis", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variant", "font-variation-settings", "font-weight", "font", "forced-color-adjust", "gap", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column-end", "grid-column-start", "grid-column", "grid-row-end", "grid-row-start", "grid-row", "grid-template-areas", "grid-template-columns", "grid-template-rows", "grid-template", "grid", "hanging-punctuation", "height", "hyphens", "image-orientation", "image-rendering", "image-resolution", "initial-letter", "inline-size", "inset-block-end", "inset-block-start", "inset-block", "inset-inline-end", "inset-inline-start", "inset-inline", "inset", "isolation", "justify-content", "justify-items", "justify-self", "justify-tracks", "left", "letter-spacing", "line-break", "line-clamp", "line-height-step", "line-height", "list-style-image", "list-style-position", "list-style-type", "list-style", "margin-block-end", "margin-block-start", "margin-block", "margin-bottom", "margin-inline-end", "margin-inline-start", "margin-inline", "margin-left", "margin-right", "margin-top", "margin", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-border", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "mask", "math-style", "max-block-size", "max-height", "max-inline-size", "max-lines", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "motion-distance", "motion-path", "motion-rotation", "motion", "object-fit", "object-position", "offset-anchor", "offset-distance", "offset-path", "offset-rotate", "offset-rotation", "offset", "opacity", "order", "orphans", "outline-color", "outline-offset", "outline-style", "outline-width", "outline", "overflow-anchor", "overflow-block", "overflow-clip-box", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overflow", "overscroll-behavior-block", "overscroll-behavior-inline", "overscroll-behavior-x", "overscroll-behavior-y", "overscroll-behavior", "padding-block-end", "padding-block-start", "padding-block", "padding-bottom", "padding-inline-end", "padding-inline-start", "padding-inline", "padding-left", "padding-right", "padding-top", "padding", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "perspective-origin", "perspective", "place-content", "place-items", "place-self", "pointer-events", "position", "quotes", "resize", "right", "rotate", "row-gap", "ruby-align", "ruby-merge", "ruby-position", "scale", "scroll-behavior", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-block", "scroll-margin-bottom", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-inline", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-margin", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-block", "scroll-padding-bottom", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-inline", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-padding", "scroll-snap-align", "scroll-snap-margin-bottom", "scroll-snap-margin-left", "scroll-snap-margin-right", "scroll-snap-margin-top", "scroll-snap-margin", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "tab-size", "table-layout", "text-align-last", "text-align", "text-combine-upright", "text-decoration-color", "text-decoration-line", "text-decoration-skip-ink", "text-decoration-skip", "text-decoration-style", "text-decoration-thickness", "text-decoration-width", "text-decoration", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-emphasis", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-transform", "text-underline-offset", "text-underline-position", "top", "touch-action", "transform-box", "transform-origin", "transform-style", "transform", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "transition", "translate", "unicode-bidi", "user-select", "vertical-align", "visibility", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "zoom"];
const cssPropertiesObjectArray = [];

for (const property of cssProperties) {
	cssPropertiesObjectArray.push({
		"name": property,
		"value": ""
	});
}

// Run code in nodeland from browserland
//await page.exposeFunction("functionName", function() {});

// Run code in browserland from nodeland
//await page.$$eval("body", function(elements) {});

let browser;

export function getBrowserInstance(options: { devtools?: boolean; headless?: boolean } = {}): ChromiumBrowser | Promise<ChromiumBrowser> {
	if (browser !== undefined) {
		return browser;
	}

	options["devtools"] = options["devtools"] || !options["headless"];
	options["headless"] = options["headless"] || false;

	browser = chromium.launch({
		"devtools": options["devtools"],
		"headless": options["headless"]
	});

	return browser;
}

if (require.main === module) {
	function traverse(element) {
		const terminalNodes = [];

		(function recurse(element) {
			if (element.children.length !== 0) {
				for (const child of element.children) {
					recurse(child);
				}
			} else {
				// eslint-disable-next-line no-lonely-if
				if (element.type !== undefined && element.type !== "") {
					terminalNodes.push(element.tagName.toLowerCase() + "[type=" + element.type.toLowerCase() + "]");
				} else {
					terminalNodes.push(element.tagName.toLowerCase());
				}
			}
		})(element);

		return terminalNodes;
	}

	(async function() {
		const browser = await getBrowserInstance();

		const context = await browser.newContext();

		const page = await context.newPage();

		await page.goto("http://localhost:8080/courier-component.html");

		const client = await context.newCDPSession(page);

		await client.send("DOM.enable");
		await client.send("CSS.enable");

		await page.evaluate(function() {
			for (const styleSheet of document.styleSheets) {
				if (styleSheet.href === null || !styleSheet.href.startsWith(window.location.origin)) {
					styleSheet.disabled = true;
				}
			}
		});

		await page.evaluate(function() {
			for (const styleSheet of document.styleSheets) {
				if (styleSheet.disabled) {
					styleSheet.disabled = false;
				}
			}
		});

		// const response = await client.send("CSS.getMatchedStylesForNode", {
		// 	"nodeId": ""
		// });

	})();
}
