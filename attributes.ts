/* eslint-disable lines-around-comment */

export interface GlobalElementAttributes {
	/**
	 * Provides a hint for generating a keyboard shortcut for the current element. This attribute
	 * consists of a space-separated list of characters. The browser should use the first one that
	 * exists on the computer keyboard layout.
	 */
	accesskey: string;
	/**
	 * Controls whether and how text input is automatically capitalized as it is entered/edited by
	 * the user. It can have the following values:
	 *      -   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)
	 *      -   `on` or `sentences`, the first letter of each sentence defaults to a capital letter;
	 *          all other letters default to lowercase
	 *      -   `words`, the first letter of each word defaults to a capital letter; all other
	 *          letters default to lowercase
	 *      -   `characters`, all letters should default to uppercase
	 */
	autocaptialize: "off" | "none" | "on" | "sentences" | "words" | "characters";
	/**
	 * A space-separated list of the classes of the element. Classes allows CSS and JavaScript to
	 * select and access specific elements via the class selectors or functions like the method
	 * `Document.getElementsByClassName()`.
	 */
	class: string;
	/**
	 * An enumerated attribute indicating if the element should be editable by the user. If so, the
	 * browser modifies its widget to allow editing. The attribute must take one of the following
	 * values:
	 *      -   `true` or the *empty string*, which indicates that the element must be editable;
	 *      -   `false`, which indicates that the element must not be editable.
	 */
	contenteditable: boolean;
	/**
	 * Forms a class of attributes, called custom data attributes, that allow proprietary
	 * information to be exchanged between the HTML and its DOM representation that may be used by
	 * scripts. All such custom data are available via the HTMLElement interface of the element the
	 * attribute is set on. The `HTMLElement.dataset` property gives access to them.
	 */
	data: string[] | string | object;
	/**
	 * An enumerated attribute indicating the directionality of the element's text. It can have the
	 * following values:
	 *      -   `ltr`, which means left to right and is to be used for languages that are written
	 *          from the left to the right (like English);
	 *      -   `rtl`, which means right to left and is to be used for languages that are written
	 *          from the right to the left (like Arabic);
	 *      -   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the
	 *          characters inside the element until it finds a character with a strong
	 *          directionality, then it applies that directionality to the whole element.
	 */
	dir: "ltr" | "rtl" | "auto";
	/**
	 * An enumerated attribute indicating whether the element can be dragged, using the Drag and
	 * Drop API. It can have the following values:
	 *      -   `true`, which indicates that the element may be dragged
	 *      -   `false`, which indicates that the element may not be dragged.
	 */
	draggable: boolean;
	/**
	 * A Boolean attribute indicates that the element is not yet, or is no longer, *relevant*. For
	 * example, it can be used to hide elements of the page that can't be used until the login
	 * process has been completed. The browser won't render such elements. This attribute must not
	 * be used to hide content that could legitimately be shown.
	 */
	hidden: boolean;
	/**
	 * Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is
	 * to identify the element when linking (using a fragment identifier), scripting, or styling
	 * (with CSS).
	 */
	id: string;
	/**
	 * Provides a hint to browsers as to the type of virtual keyboard configuration to use when
	 * editing this element or its contents. Used primarily on `<input>` elements, but is usable on
	 * any element while in `contenteditable` mode.
	 */
	inputmode: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
	/**
	 * Allows you to specify that a standard HTML element should behave like a registered custom
	 * built-in element (see Using custom elements for more details).
	 */
	is: string;
	/**
	 * Helps define the language of an element: the language that non-editable elements are in, or
	 * the language that editable elements should be written in by the user. The attribute contains
	 * one “language tag” (made of hyphen-separated "language subtags") in the format defined in
	 * *Tags for Identifying Languages (BCP47)*. **xml:lang** has priority over it.
	 */
	lang: string;
	/**
	 * A space-separated list of the part names of the element. Part names allows CSS to select and
	 * style specific elements in a shadow tree via the `::part` pseudo-element.
	 */
	part: string;
	/**
	 * Assigns a slot in a shadow DOM shadow tree to an element: An element with a `slot` attribute
	 * is assigned to the slot created by the `<slot>` element whose `name` attribute's value
	 * matches that `slot` attribute's value.
	 */
	slot: string;
	/**
	 * An enumerated attribute defines whether the element may be checked for spelling errors. It
	 * may have the following values:
	 *      -   `true`, which indicates that the element should be, if possible, checked for
	 *          spelling errors;
	 *      -   `false`, which indicates that the element should not be checked for spelling errors.
	 */
	spellcheck: boolean;
	/**
	 * Contains CSS styling declarations to be applied to the element. Note that it is recommended
	 * for styles to be defined in a separate file or files. This attribute and the `<style>`
	 * element have mainly the purpose of allowing for quick styling, for example for testing
	 * purposes.
	 */
	style: string;
	/**
	 * An integer attribute indicating if the element can take input focus (is *focusable*), if it
	 * should participate to sequential keyboard navigation, and if so, at what position. It can
	 * take several values:
	 *      -   a *negative value* means that the element should be focusable, but should not be
	 *          reachable via sequential keyboard navigation;
	 *      -   `0` means that the element should be focusable and reachable via sequential keyboard
	 *          navigation, but its relative order is defined by the platform convention;
	 *      -   a *positive value* means that the element should be focusable and reachable via
	 *          sequential keyboard navigation; the order in which the elements are focused is the
	 *          increasing value of the tabindex. If several elements share the same tabindex, their
	 *          relative order follows their relative positions in the document.
	 */
	tabindex: number;
	/**
	 * Contains a text representing advisory information related to the element it belongs to. Such
	 * information can typically, but not necessarily, be presented to the user as a tooltip.
	 */
	title: string;
	/**
	 * An enumerated attribute that is used to specify whether an element's attribute values and the
	 * values of its `Text` node children are to be translated when the page is localized, or
	 * whether to leave them unchanged. It can have the following values:
	 *      -   empty string and `yes`, which indicates that the element will be translated.
	 *      -   `no`, which indicates that the element will not be translated.
	 */
	translate: boolean;
}

export interface HTMLAnchorElementAttributes {
	/**
	 * Prompts the user to save the linked URL instead of navigating to it. Can be used with or
	 * without a value:
	 *      -   Without a value, the browser will suggest a filename/extension, generated from
	 *          various sources:
	 *          -   The `Content-Disposition` HTTP header
	 *          -   The final segment in the URL path
	 *          -   The media type (from the (`Content-Type` header, the start of a `data:` URL, or
	 *              `Blob.type` for a `blob:` URL)
	 *      -   Defining a value suggests it as the filename. `/` and `\` characters are converted
	 *          to underscores (`_`). Filesystems may forbid other characters in filenames, so
	 *          browsers will adjust the suggested name if necessary.
	 */
	download: string;
	/**
	 * The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs -- they can
	 * use any URL scheme supported by browsers:
	 *      -   Sections of a page with fragment URLs
	 *      -   Pieces of media files with media fragments
	 *      -   Telephone numbers with `tel:` URLs
	 *      -   Email addresses with `mailto:` URLs
	 *      -   While web browsers may not support other URL schemes, web sites can with
	 *          `registerProtocolHandler()`
	 */
	href: string;
	/**
	 * Hints at the human language of the linked URL. No built-in functionality. Allowed values are
	 * the same as the global `lang` attribute.
	 */
	hreflang: string;
	/**
	 * A space-separated list of URLs. When the link is followed, the browser will send `POST`
	 * requests with the body `PING` to the URLs. Typically for tracking.
	 */
	ping: string | string[];
	/**
	 * How much of the referrer to send when following the link. See `Referrer-Policy` for possible
	 * values and their effects.
	 */
	referrerpolicy: string;
	/**
	 * The relationship of the linked URL as space-separated link types.
	 */
	rel: string;
	/**
	 * Where to display the linked URL, as the name for a *browsing context* (a tab, window, or
	 * `<iframe>`). The following keywords have special meanings for where to load the URL:
	 *      -   `_self`: the current browsing context. (Default)
	 *      -   `_blank`: usually a new tab, but users can configure browsers to open a new window
	 *          instead.
	 *      -   `_parent`: the parent browsing context of the current one. If no parent, behaves as
	 *          `_self`.
	 *      -   `_top`: the topmost browsing context (the "highest" context that’s an ancestor of
	 *          the current one). If no ancestors, behaves as `_self`.
	 */
	target: "_self" | "_blank" | "_parent" | "_top";
	/**
	 * Hints at the linked URL's format with a MIME type. No built-in functionality.
	 */
	type: string;
}

export interface HTMLAudioElementAttributes {
	/**
	 * A Boolean attribute: if specified, the audio will automatically begin playback as soon as it
	 * can do so, without waiting for the entire audio file to finish downloading.
	 */
	autoplay: boolean;
	/**
	 * If this attribute is present, the browser will offer controls to allow the user to control
	 * audio playback, including volume, seeking, and pause/resume playback.
	 */
	controls: boolean;
	/**
	 *
	 */
	crossorigin
	currentTime
	disableRemotePlayback
	duration
	loop
	muted
	preload
	src
}

export interface HTMLQuoteElementAttributes {
	cite
}

export interface HTMLButtonElementAttributes {
	autofocus
	autocomplete
	disabled
	form
	formaction
	formenctype
	formmethod
	formnovalidate
	formtarget
	name
	type
	value
}

export interface HTMLCanvasElementAttributes {
	height
	width
}

export interface HTMLTableColElementAttributes {
	span
}

export interface HTMLModElementAttributes {
	cite
	datetime
}

export interface HTMLDetailsElementAttributes {
	open
}

export interface HTMLFieldSetElementAttributes {
	disabled
	form
	name
}

export interface HTMLFormElementAttributes {
	"accept-charset"
	autocapitalize
	autocomplete
	rel
}

export interface HTMLIFrameElementAttributes {
	allow
	csp
	height
	loading
	name
	referrerpolicy
	sandbox
	src
	srcdoc
	width
}

export interface HTMLImageElementAttributes {
	alt
	crossorigin
	decoding
	height
	ismap
	loading
	referrerpolicy
	sizes
	src
	srcset
	width
	usemap
}

// input

export interface HTMLLabelElementAttributes {
	for
}

export interface HTMLLIElementAttributes {
	value
}

export interface HTMLMeterElementAttributes {
	value
	min
	max
	low
	high
	optimum
	form
}

export interface HTMLOListElementAttributes {
	reversed
	start
}

export interface HTMLOptGroupElementAttributes {
	disabled
	label
}

export interface HTMLOptionElementAttributes {
	disabled
	label
	selected
	value
}

export interface HTMLProgressElementAttributes {
	max
	value
}

export interface HTMLQuoteElementAttributes {
	cite
}

export interface HTMLSelectElementAttributes {
	autocomplete
	autofocus
	disabled
	form
	multiple
	name
	required
	size
}

export interface HTMLSourceElementAttributes {
	media
	sizes
	src
	srcset
	type
}

export interface HTMLTableDataCellElementAttributes {
	colspan
	headers
	rowspan
}

export interface HTMLTextAreaElementAttributes {
	autocapitalize
	autocomplete
	autofocus
	cols
	disabled
	form
	maxlength
	minlength
	name
	placeholder
	readonly
	required
	rows
	spellcheck
	wrap
}

export interface HTMLTableHeaderCellElementAttributes {
	abbr
	colspan
	headers
	rowspan
	scope
}

export interface HTMLTrackElementAttributes {
	default
	kind
	label
	src
	srclang
}

export interface HTMLVideoElementAttributes {
	autoplay
	autoPictureInPicture
	buffered
	controls
	controlslist
	crossorigin
	currentTime
	disablePictureInPicture
	disableRemotePlayback
	duration
	height
	intrinsicsize
	loop
	muted
	playsinline
	poster
	preload
	src
	width
}
