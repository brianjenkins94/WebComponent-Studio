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
	 *
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
	 *
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
	 *
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
	 *
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
	 *
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
	 *
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
	 *
	 *      -   empty string and `yes`, which indicates that the element will be translated.
	 *      -   `no`, which indicates that the element will not be translated.
	 */
	translate: boolean;
}

export interface HTMLAnchorElementAttributes {
	/**
	 * Prompts the user to save the linked URL instead of navigating to it. Can be used with or
	 * without a value:
	 *
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
	 *
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
	ping: string[] | string;
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
	 *
	 *      -   `_self`: the current browsing context. (Default)
	 *      -   `_blank`: usually a new tab, but users can configure browsers to open a new window
	 *          instead.
	 *      -   `_parent`: the parent browsing context of the current one. If no parent, behaves as
	 *          `_self`.
	 *      -   `_top`: the topmost browsing context (the "highest" context that's an ancestor of
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
	 * This enumerated attribute indicates whether to use CORS to fetch the related audio file.
	 * CORS-enabled resources can be reused in the `<canvas>` element without being *tainted*. The
	 * allowed values are:
	 *
	 *      -   anonymous
	 *          -   Sends a cross-origin request without a credential. In other words, it sends the
	 *              `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP
	 *              Basic authentication. If the server does not give credentials to the origin site
	 *              (by not setting the `Access-Control-Allow-Origin:` HTTP header), the image will
	 *              be *tainted*, and its usage restricted.
	 *      -   use-credentials
	 *          -   Sends a cross-origin request with a credential. In other words, it sends the
	 *              `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic
	 *              authentication. If the server does not give credentials to the origin site
	 *              (through `Access-Control-Allow-Credentials:` HTTP header), the image will be
	 *              *tainted* and its usage restricted.
	 *
	 * When not present, the resource is fetched without a CORS request (i.e. without sending the
	 * `Origin:` HTTP header), preventing its non-tainted used in `<canvas>` elements. If invalid,
	 * it is handled as if the enumerated keyword **anonymous** was used. See CORS settings
	 * attributes for additional information.
	 */
	crossorigin: "anonymous" | "use-credentials";
	/**
	 * Reading `currentTime` returns a double-precision floating-point value indicating the current
	 * playback position, in seconds, of the audio. If the audio's metadata isn't available yet--
	 * thereby preventing you from knowing the media's start time or duration--`currentTime` instead
	 * indicates, and can be used to change, the time at which playback will begin. Otherwise,
	 * setting `currentTime` sets the current playback position to the given time and seeks the media
	 * to that position if the media is currently loaded.
	 *
	 * If the audio is being streamed, it's possible that the user agent may not be able to obtain
	 * some parts of the resource if that data has expired from the media buffer. Other audio may
	 * have a media timeline that doesn't start at 0 seconds, so setting `currentTime` to a time
	 * before that would fail. For example, if the audio's media timeline starts at 12 hours,
	 * setting `currentTime` to 3600 would be an attempt to set the current playback position well
	 * before the beginning of the media, and would fail. The `getStartDate()` method can be used to
	 * determine the beginning point of the media timeline's reference frame.
	 */
	currentTime: number;
	/**
	 * A Boolean attribute used to disable the capability of remote playback in devices that are
	 * attached using wired (HDMI, DVI, etc.) and wireless technologies (Miracast, Chromecast, DLNA,
	 * AirPlay, etc). See this proposed specification for more information.
	 */
	disableRemotePlayback: boolean;
	/**
	 * A double-precision floating-point value which indicates the duration (total length) of the
	 * audio in seconds, on the media's timeline. If no media is present on the element, or the
	 * media is not valid, the returned value is `NaN`. If the media has no known end (such as for
	 * live streams of unknown duration, web radio, media incoming from WebRTC, and so forth), this
	 * value is `+Infinity`.
	 */
	duration: number;
	/**
	 * A Boolean attribute: if specified, the audio player will automatically seek back to the start
	 * upon reaching the end of the audio.
	 */
	loop: boolean;
	/**
	 * A Boolean attribute that indicates whether the audio will be initially silenced. Its default
	 * value is `false`.
	 */
	muted
	/**
	 * This enumerated attribute is intended to provide a hint to the browser about what the author
	 * thinks will lead to the best user experience. It may have one of the following values:
	 *
	 *      -   `none`: Indicates that the audio should not be preloaded.
	 *      -   `metadata`: Indicates that only audio metadata (e.g. length) is fetched.
	 *      -   `auto`: Indicates that the whole audio file can be downloaded, even if the user is
	 *          not expected to use it.
	 *      -   *empty string*: A synonym of the `auto` value.
	 *
	 * The default value is different for each browser. The spec advises it to be set to `metadata`.
	 */
	preload: "none" | "metadata" | "auto" | "";
	/**
	 * The URL of the audio to embed. This is subject to HTTP access controls. This is optional; you
	 * may instead use the `<source>` element within the audio block to specify the audio to embed.
	 */
	src: string;
}

export interface HTMLQuoteElementAttributes {
	/**
	 * A URL that designates a source document or message for the information quoted. This attribute
	 * is intended to point to information explaining the context or the reference for the quote.
	 */
	cite: string;
}

export interface HTMLButtonElementAttributes {
	/**
	 * This Boolean attribute specifies that the button should have input focus when the page loads.
	 * **Only one element in a document can have this attribute.**
	 */
	autofocus: boolean;
	/**
	 * This attribute on a `<button>` is nonstandard and Firefox-specific. Unlike other browsers,
	 * Firefox persists the dynamic disabled state of a `<button>` across page loads. Setting
	 * `autocomplete="off"` on the button disables this feature; see bug 654072.
	 */
	autocomplete: string;
	/**
	 * This Boolean attribute prevents the user from interacting with the button: it cannot be
	 * pressed or focused.
	 *
	 * Firefox, unlike other browsers, persists the dynamic disabled state of a `<button>` across
	 * page loads. Use the `autocomplete` attribute to control this feature.
	 */
	disabled: boolean;
	/**
	 * The `<form>` element to associate the button with (its *form* owner). The value of this
	 * attribute must be the `id` of a `<form>` in the same document. (If this attribute is not set,
	 * the `<button>` is associated with its ancestor `<form>` element, if any.)
	 *
	 * This attribute lets you associate `<button>` elements to `<form>`s anywhere in the document,
	 * not just inside a `<form>`. It can also override an ancestor `<form>` element.
	 */
	form: string;
	/**
	 * The URL that processes the information submitted by the button. Overrides the `action`
	 * attribute of the button's form owner. Does nothing if there is no form owner.
	 */
	formaction: string;
	/**
	 * If the button is a submit button (it's inside/associated with a `<form>` and doesn't have
	 * `type="button"`), specifies how to encode the form data that is submitted. Possible values:
	 *
	 *      -   `application/x-www-form-urlencoded`: The default if the attribute is not used.
	 *      -   `multipart/form-data`: Use to submit `<input>` elements with their `type` attributes
	 *          set to `file`.
	 *      -   `text/plain`: Specified as a debugging aid; shouldn't be used for real form
	 *          submission.
	 *
	 * If this attribute is specified, it overrides the `enctype` attribute of the button's form
	 * owner.
	 */
	formenctype: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
	/**
	 * If the button is a submit button (it's inside/associated with a `<form>` and doesn't have
	 * `type="button"`), this attribute specifies the HTTP method used to submit the form. Possible
	 * values:
	 *
	 *      -   `post`: The data from the form are included in the body of the HTTP request when
	 *          sent to the server. Use when the form contains information that shouldn't be public,
	 *          like login credentials.
	 *      -   `get`: The form data are appended to the form's `action` URL, with a `?` as a
	 *          separator, and the resulting URL is sent to the server. Use this method when the
	 *          form has no side effects, like search forms.
	 *
	 * If specified, this attribute overrides the `method` attribute of the button's form owner.
	 */
	formmethod: "post" | "get";
	/**
	 * If the button is a submit button, this Boolean attribute specifies that the form is not to be
	 * validated when it is submitted. If this attribute is specified, it overrides the `novalidate`
	 * attribute of the button's form owner.
	 *
	 * This attribute is also available on `<input type="image">` and `<input type="submit">` elements.
	 */
	formnovalidate: boolean | string;
	/**
	 * If the button is a submit button, this attribute is a author-defined name or standardized,
	 * underscore-prefixed keyword indicating where to display the response from submitting the
	 * form. This is the `name` of, or keyword for, a *browsing context* (a tab, window, or
	 * `<iframe>`). If this attribute is specified, it overrides the `target` attribute of the
	 * button's form owner. The following keywords have special meanings:
	 *
	 *      -   _self: Load the response into the same browsing context as the current one. This is
	 *          the default if the attribute is not specified.
	 *      -   _blank: Load the response into a new unnamed browsing context -- usually a new tab
	 *          or window, depending on the user's browser settings.
	 *      -   _parent: Load the response into the parent browsing context of the current one. If
	 *          there is no parent, this option behaves the same way as `_self`.
	 *      -   _top: Load the response into the top-level browsing context (that is, the browsing
	 *          context that is an ancestor of the current one, and has no parent). If there is no
	 *          parent, this option behaves the same way as `_self`.
	 */
	formtarget: "_self" | "_blank" | "_parent" | "_top";
	/**
	 * The name of the button, submitted as a pair with the button's `value` as part of the form
	 * data.
	 */
	name: string;
	/**
	 * The default behavior of the button. Possible values are:
	 *
	 *      -   `submit`: The button submits the form data to the server. This is the default if the
	 *          attribute is not specified for buttons associated with a `<form>`, or if the
	 *          attribute is an empty or invalid value.
	 *      -   `reset`: The button resets all the controls to their initial values, like
	 *          <input type="reset">. (This behavior tends to annoy users.)
	 *      -   `button`: The button has no default behavior, and does nothing when pressed by
	 *          default. It can have client-side scripts listen to the element's events, which are
	 *          triggered when the events occur.
	 */
	type: "submit" | "reset" | "button";
	/**
	 * Defines the value associated with the button's `name` when it's submitted with the form data.
	 * This value is passed to the server in params when the form is submitted.
	 */
	value: string;
}

export interface HTMLCanvasElementAttributes {
	/**
	 * The height of the coordinate space in CSS pixels. Defaults to 150.
	 */
	height: number;
	/**
	 * The width of the coordinate space in CSS pixels. Defaults to 300.
	 */
	width: number;
}

export interface HTMLTableColElementAttributes {
	/**
	 * This attribute contains a positive integer indicating the number of consecutive columns the
	 * `<col>` element spans. If not present, its default value is `1`.
	 */
	span: number;
}

export interface HTMLModElementAttributes {
	/**
	 * A URI for a resource that explains the change (for example, meeting minutes).
	 */
	cite: string;
	/**
	 * This attribute indicates the time and date of the change and must be a valid date string with
	 * an optional time. If the value cannot be parsed as a date with an optional time string, the
	 * element does not have an associated time stamp. For the format of the string without a time,
	 * see Date strings. The format of the string if it includes both date and time is covered in
	 * Local date and time strings.
	 */
	datetime: Date | string;
}

export interface HTMLDetailsElementAttributes {
	/**
	 * This Boolean attribute indicates whether or not the details -- that is, the contents of the
	 * `<details>` element -- are currently visible. The default, `false`, means the details are
	 * not visible.
	 */
	open: boolean;
}

export interface HTMLFieldSetElementAttributes {
	/**
	 * If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>`,
	 * are disabled, meaning they are not editable and won't be submitted along with the `<form>`.
	 * They won't receive any browsing events, like mouse clicks or focus-related events. By default
	 * browsers display such controls grayed out. Note that form elements inside the `<legend>`
	 * element won't be disabled.
	 */
	disabled: boolean;
	/**
	 * This attribute takes the value of the `id` attribute of a `<form>` element you want the
	 * `<fieldset>` to be part of, even if it is not inside the form. Please note that usage of this
	 * is confusing -- if you want the `<input>` elements inside the `<fieldset>` to be associated
	 * with the `form`, you need to use the `form` attribute directly on those elements. You can
	 * check which elements are associated with a form via JavaScript, using
	 * `HTMLFormElement.elements`.
	 */
	form: string;
	/**
	 * The name associated with the group.
	 */
	name: string;
}

export interface HTMLFormElementAttributes {
	/**
	 * Space-separated character encodings the server accepts. The browser uses them in the order in
	 * which they are listed. The default value means the same encoding as the page. (In previous
	 * versions of HTML, character encodings could also be delimited by commas.)
	 */
	"accept-charset": string[] | string;
	/**
	 * A nonstandard attribute used by iOS Safari that controls how textual form elements should be
	 * automatically capitalized. `autocapitalize` attributes on a form elements override it on
	 * `<form>`. Possible values:
	 *
	 *      -   `none`: No automatic capitalization.
	 *      -   `sentences` (default): Capitalize the first letter of each sentence.
	 *      -   `words`: Capitalize the first letter of each word.
	 *      -   `characters`: Capitalize all characters -- that is, uppercase.
	 */
	autocapitalize: "none" | "sentences" | "words" | "characters";
	/**
	 * Indicates whether input elements can by default have their values automatically completed by
	 * the browser. autocomplete attributes on form elements override it on <form>. Possible values:
	 *
	 *      -   `off`: The browser may not automatically complete entries. (Browsers tend to ignore
	 *          this for suspected login forms; see The autocomplete attribute and login fields.)
	 *      -   `on`: The browser may automatically complete entries.
	 */
	autocomplete: boolean;
	/**
	 * Creates a hyperlink or annotation depending on the value, see the **`rel`** attribute for
	 * details.
	 */
	rel: string;
	/**
	 * The URL that processes the form submission. This value can be overridden by a `formaction`
	 * attribute on a `<button>`, `<input type="submit">`, or `<input type="image">` element.
	 */
	action: string;
	/**
	 * If the value of the `method` attribute is `post`, `enctype` is the MIME type of the form
	 * submission. Possible values:
	 *
	 *      -   `application/x-www-form-urlencoded`: The default value.
	 *      -   `multipart/form-data`: Use this if the form contains `<input>` elements with
	 *          `type=file`.
	 *      -   `text/plain`: Introduced by HTML5 for debugging purposes.
	 *
	 * This value can be overridden by `formenctype` attributes on `<button>`,
	 * `<input type="submit">`, or `<input type="image">` elements.
	 */
	enctype: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
	/**
	 * The HTTP method to submit the form with. Possible (case insensitive) values:
	 *
	 *      -   `post`: The POST method; form data sent as the request body.
	 *      -   `get`: The GET method; form data appended to the `action` URL with a `?` separator.
	 *          Use this method when the form has no side-effects.
	 *      -   `dialog`: When the form is inside a `<dialog>`, closes the dialog on submission.
	 *
	 * This value is overridden by `formmethod` attributes on `<button>`, `<input type="submit">`,
	 * or `<input type="image">` elements.
	 */
	method: "post" | "get" | "dialog";
	/**
	 * This Boolean attribute indicates that the form shouldn't be validated when submitted. If this
	 * attribute is not set (and therefore the form ***is*** validated), it can be overridden by a
	 * `formnovalidate` attribute on a `<button>`, `<input type="submit">`, or
	 * `<input type="image">` element belonging to the form.
	 */
	novalidate: boolean;
	/**
	 * Indicates where to display the response after submitting the form. In HTML 4, this is the
	 * name/keyword for a frame. In HTML5, it is a name/keyword for a *browsing context* (for
	 * example, tab, window, or iframe). The following keywords have special meanings:
	 *
	 *      -   `_self` (default): Load into the same browsing context as the current one.
	 *      -   `_blank`: Load into a new unnamed browsing context.
	 *      -   `_parent`: Load into the parent browsing context of the current one. If no parent,
	 *          behaves the same as `_self`.
	 *      -   `_top`: Load into the top-level browsing context (i.e., the browsing context that is
	 *          an ancestor of the current one and has no parent). If no parent, behaves the same as
	 *          `_self`.
	 *
	 * This value can be overridden by a `formtarget` attribute on a `<button>`,
	 * `<input type="submit">`, or `<input type="image">` element.
	 */
	target: "_self" | "_blank" | "_parent" | "_top";
}

export interface HTMLIFrameElementAttributes {
	/**
	 * Specifies a feature policy for the `<iframe>`. The policy defines what features are available
	 * to the `<iframe>` based on the origin of the request (e.g. access to the microphone, camera,
	 * battery, web-share API, etc.).
	 *
	 * For more information and examples see: Using Feature Policy > The iframe allow attribute.
	 */
	allow: string;
	/**
	 * A Content Security Policy enforced for the embedded resource. See `HTMLIFrameElement.csp`
	 * for details.
	 */
	csp: string;
	/**
	 * The height of the frame in CSS pixels. Default is `150`.
	 */
	height: number;
	/**
	 * Indicates how the browser should load the iframe:
	 *
	 *      -   `eager`: Load the iframe immediately, regardless if it is outside the visible
	 *          viewport (this is the default value).
	 *      -   `lazy`: Defer loading of the iframe until it reaches a calculated distance from the
	 *          viewport, as defined by the browser.
	 */
	loading: "eager" | "lazy";
	/**
	 * A targetable name for the embedded browsing context. This can be used in the `target`
	 * attribute of the `<a>`, `<form>`, or `<base>` elements; the `formtarget` attribute of the
	 * `<input>` or `<button>` elements; or the `windowName` parameter in the `window.open()`
	 * method.
	 */
	name: string;
	/**
	 * Indicates which referrer to send when fetching the frame's resource:
	 *
	 *      -   `no-referrer`: The `Referer` header will not be sent.
	 *      -   `no-referrer-when-downgrade` (default): The `Referer` header will not be sent to
	 *          origins without TLS (HTTPS).
	 *      -   `origin`: The sent referrer will be limited to the origin of the referring page: its
	 *          scheme, host, and port.
	 *      -   `origin-when-cross-origin`: The referrer sent to other origins will be limited to
	 *          the scheme, the host, and the port. Navigations on the same origin will still
	 *          include the path.
	 *      -   `same-origin`: A referrer will be sent for same origin, but cross-origin requests
	 *          will contain no referrer information.
	 *      -   `strict-origin`: Only send the origin of the document as the referrer when the
	 *          protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less
	 *          secure destination (HTTPS→HTTP).
	 *      -   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin
	 *          request, only send the origin when the protocol security level stays the same
	 *          (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).
	 *      -   `unsafe-url`: The referrer will include the origin and the path (but not the
	 *          fragment, password, or username). **This value is unsafe**, because it leaks origins
	 *          and paths from TLS-protected resources to insecure origins.
	 */
	referrerpolicy: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
	/**
	 * Applies extra restrictions to the content in the frame. The value of the attribute can either
	 * be empty to apply all restrictions, or space-separated tokens to lift particular
	 * restrictions:
	 *
	 *      -   `allow-downloads-without-user-activation`: Allows for downloads to occur without a
	 *          gesture from the user.
	 *      -   `allow-downloads`: Allows for downloads to occur with a gesture from the user.
	 *      -   `allow-forms`: Allows the resource to submit forms. If this keyword is not used,
	 *          form submission is blocked.
	 *      -   `allow-modals`: Lets the resource open modal windows.
	 *      -   `allow-orientation-lock`: Lets the resource lock the screen orientation.
	 *      -   `allow-pointer-lock`: Lets the resource use the Pointer Lock API.
	 *      -   `allow-popups`: Allows popups (such as `window.open()`, `target="_blank"`, or
	 *          `showModalDialog()`). If this keyword is not used, the popup will silently fail to
	 *          open.
	 *      -   `allow-popups-to-escape-sandbox`: Lets the sandboxed document open new windows
	 *          without those windows inheriting the sandboxing. For example, this can safely
	 *          sandbox an advertisement without forcing the same restrictions upon the page the ad
	 *          links to.
	 *      -   `allow-presentation`: Lets the resource start a presentation session.
	 *      -   `allow-same-origin`: If this token is not used, the resource is treated as being
	 *          from a special origin that always fails the same-origin policy.
	 *      -   `allow-scripts`: Lets the resource run scripts (but not create popup windows).
	 *      -   `allow-storage-access-by-user-activation`: Lets the resource request access to the
	 *          parent's storage capabilities with the Storage Access API.
	 *      -   `allow-top-navigation`: Lets the resource navigate the top-level browsing context
	 *          (the one named `_top`).
	 *      -   `allow-top-navigation-by-user-activation`: Lets the resource navigate the top-level
	 *          browsing context, but only if initiated by a user gesture.
	 */
	sandbox: "allow-downloads-without-user-activation" | "allow-downloads" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation";
	/**
	 * The URL of the page to embed. Use a value of `about:blank` to embed an empty page that
	 * conforms to the same-origin policy. Also note that programatically removing an `<iframe>`'s
	 * src attribute (e.g. via `Element.removeAttribute()`) causes `about:blank` to be loaded in the
	 * frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS.
	 */
	src: string;
	/**
	 * Inline HTML to embed, overriding the `src` attribute. If a browser does not support the
	 * `srcdoc` attribute, it will fall back to the URL in the `src` attribute.
	 */
	srcdoc: string;
	/**
	 * The width of the frame in CSS pixels. Default is `300`.
	 */
	width: number;
}

export interface HTMLImageElementAttributes {
	/**
	 * Defines an alternative text description of the image.
	 *
	 * Omitting `alt` altogether indicates that the image is a key part of the content and no
	 * textual equivalent is available. Setting this attribute to an empty string (`alt=""`)
	 * indicates that this image is *not* a key part of the content (it’s decoration or a tracking
	 * pixel), and that non-visual browsers may omit it from rendering. Visual browsers will also
	 * hide the broken image icon if the `alt` is empty and the image failed to display.
	 *
	 * This attribute is also used when copying and pasting the image to text, or saving a linked
	 * image to a bookmark.
	 */
	alt: string;
	/**
	 * Indicates if the fetching of the image must be done using a CORS request. Image data from a
	 * CORS-enabled image returned from a CORS request can be reused in the `<canvas>` element
	 * without being marked "tainted".
	 *
	 * If the `crossorigin` attribute is *not* specified, then a non-CORS request is sent (without
	 * the `Origin` request header), and the browser marks the image as tainted and restricts access
	 * to its image data, preventing its usage in `<canvas>` elements.
	 *
	 * If the `crossorigin` attribute *is* specified, then a CORS request is sent (with the `Origin`
	 * request header); but if the server does not opt into allowing cross-origin access to the
	 * image data by the origin site (by not sending any `Access-Control-Allow-Origin` response
	 * header, or by not including the site's origin in any `Access-Control-Allow-Origin` response
	 * header it does send), then the browser marks the image as tainted and restricts access to its
	 * image data, preventing its usage in `<canvas>` elements.
	 *
	 * Allowed values:
	 *
	 *      -   anonymous
	 *          -   A CORS request is sent with credentials omitted (that is, no cookies, X.509
	 *              certificates, or `Authorization` request header).
	 *      -   use-credentials
	 *          -   The CORS request is sent with any credentials included (that is, cookies, X.509
	 *              certificates, and the `Authorization` request header). If the server does not
	 *              opt into sharing credentials with the origin site (by sending back the
	 *              `Access-Control-Allow-Credentials: true` response header), then the browser
	 *              marks the image as tainted and restricts access to its image data.
	 *
	 * If the attribute has an invalid value, browsers handle it as if the `anonymous` value was
	 * used. See CORS settings attributes for additional information.
	 */
	crossorigin
	/**
	 * Provides an image decoding hint to the browser. Allowed values:
	 *
	 *      -   `sync`
	 *          -   Decode the image synchronously, for atomic presentation with other content.
	 *      -   `async`
	 *          -   Decode the image asynchronously, to reduce delay in presenting other content.
	 *      -   `auto`
	 *          -   Default: no preference for the decoding mode. The browser decides what is best
	 *              for the user.
	 */
	decoding: "sync" | "async" | "auto";
	/**
	 * The intrinsic height of the image, in pixels. Must be an integer without a unit.
	 */
	height: number
	/**
	 * This Boolean attribute indicates that the image is part of a server-side map. If so, the
	 * coordinates where the user clicked on the image are sent to the server.
	 */
	ismap: boolean;
	/**
	 * Indicates how the browser should load the image:
	 *
	 *      -   `eager`: Loads the image immediately, regardless of whether or not the image is
	 *          currently within the visible viewport (this is the default value).
	 *      -   `lazy`: Defers loading the image until it reaches a calculated distance from the
	 *          viewport, as defined by the browser. The intent is to avoid the network and storage
	 *          bandwidth needed to handle the image until it's reasonably certain that it will be
	 *          needed. This generally improves the performance of the content in most typical use
	 *          cases.
	 */
	loading
	/**
	 * A string indicating which referrer to use when fetching the resource:
	 *
	 *      -   `no-referrer`: The `Referer` header will not be sent.
	 *      -   `no-referrer-when-downgrade`: No `Referer` header is sent when navigating to an
	 *          origin without HTTPS. This is the default if no policy is otherwise specified.
	 *      -   `origin`: The `Referer` header will include the page's origin (scheme, host, and
	 *          port).
	 *      -   `origin-when-cross-origin`: Navigating to other origins will limit the included
	 *          referral data to the scheme, host, and port, while navigating from the same origin
	 *          will include the full path and query string.
	 *      -   `unsafe-url`: The `Referer` header will always include the origin, path and query
	 *          string, but not the fragment, password, or username. **This is unsafe** because it
	 *          can leak information from TLS-protected resources to insecure origins.
	 */
	referrerpolicy: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "unsafe-url";
	/**
	 * One or more strings separated by commas, indicating a set of source sizes. Each source size consists of:
	 *
	 *      1.  A media condition. This must be omitted for the last item in the list.
	 *      2.  A source size value.
	 *
	 * Media Conditions describe properties of the *viewport*, not of the image. For example,
	 * `(max-height: 500px) 1000px` proposes to use a source of 1000px width, if the *viewport* is
	 * not higher than 500px.
	 *
	 * Source size values specify the intended display size of the image. User agents use the
	 * current source size to select one of the sources supplied by the `srcset` attribute, when
	 * those sources are described using width (`w`) descriptors. The selected source size affects
	 * the intrinsic size of the image (the image’s display size if no CSS styling is applied). If
	 * the `srcset` attribute is absent, or contains no values with a width descriptor, then the
	 * `sizes` attribute has no effect.
	 */
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
