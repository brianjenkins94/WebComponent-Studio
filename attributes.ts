interface HTMLElementAttributes {

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

export interface HTMLAnchorElementAttributes extends HTMLElementAttributes {

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

export interface HTMLAudioElementAttributes extends HTMLElementAttributes {

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
	 * setting `currentTime` sets the current playback position to the given time and seeks the
	 * media to that position if the media is currently loaded.
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
	muted: boolean;

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

export interface HTMLQuoteElementAttributes extends HTMLElementAttributes {

	/**
	 * A URL that designates a source document or message for the information quoted. This attribute
	 * is intended to point to information explaining the context or the reference for the quote.
	 */
	cite: string;
}

export interface HTMLButtonElementAttributes extends HTMLElementAttributes {

	/**
	 * This attribute on a `<button>` is nonstandard and Firefox-specific. Unlike other browsers,
	 * Firefox persists the dynamic disabled state of a `<button>` across page loads. Setting
	 * `autocomplete="off"` on the button disables this feature; see bug 654072.
	 */
	autocomplete: string;

	/**
	 * This Boolean attribute specifies that the button should have input focus when the page loads.
	 * **Only one element in a document can have this attribute.**
	 */
	autofocus: boolean;

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

export interface HTMLCanvasElementAttributes extends HTMLElementAttributes {

	/**
	 * The height of the coordinate space in CSS pixels. Defaults to 150.
	 */
	height: number;

	/**
	 * The width of the coordinate space in CSS pixels. Defaults to 300.
	 */
	width: number;
}

export interface HTMLTableColElementAttributes extends HTMLElementAttributes {

	/**
	 * This attribute contains a positive integer indicating the number of consecutive columns the
	 * `<col>` element spans. If not present, its default value is `1`.
	 */
	span: number;
}

export interface HTMLModElementAttributes extends HTMLElementAttributes {

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

export interface HTMLDetailsElementAttributes extends HTMLElementAttributes {

	/**
	 * This Boolean attribute indicates whether or not the details -- that is, the contents of the
	 * `<details>` element -- are currently visible. The default, `false`, means the details are
	 * not visible.
	 */
	open: boolean;
}

export interface HTMLFieldSetElementAttributes extends HTMLElementAttributes {

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

export interface HTMLFormElementAttributes extends HTMLElementAttributes {

	/**
	 * Space-separated character encodings the server accepts. The browser uses them in the order in
	 * which they are listed. The default value means the same encoding as the page. (In previous
	 * versions of HTML, character encodings could also be delimited by commas.)
	 */
	"accept-charset": string[] | string;

	/**
	 * The URL that processes the form submission. This value can be overridden by a `formaction`
	 * attribute on a `<button>`, `<input type="submit">`, or `<input type="image">` element.
	 */
	action: string;

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
	 * Creates a hyperlink or annotation depending on the value, see the **`rel`** attribute for
	 * details.
	 */
	rel: string;

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

export interface HTMLIFrameElementAttributes extends HTMLElementAttributes {

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

export interface HTMLImageElementAttributes extends HTMLElementAttributes {

	/**
	 * Defines an alternative text description of the image.
	 *
	 * Omitting `alt` altogether indicates that the image is a key part of the content and no
	 * textual equivalent is available. Setting this attribute to an empty string (`alt=""`)
	 * indicates that this image is *not* a key part of the content (it's decoration or a tracking
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
	crossorigin: "anonymous" | "use-credentials";

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
	height: number;

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
	loading: "eager" | "lazy";

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
	 * One or more strings separated by commas, indicating a set of source sizes. Each source size
	 * consists of:
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
	 * the intrinsic size of the image (the image's display size if no CSS styling is applied). If
	 * the `srcset` attribute is absent, or contains no values with a width descriptor, then the
	 * `sizes` attribute has no effect.
	 */
	sizes: string[] | string;

	/**
	 * The image URL. Mandatory for the `<img>` element. On browsers supporting `srcset`, `src` is
	 * treated like a candidate image with a pixel density descriptor `1x`, unless an image with
	 * this pixel density descriptor is already defined in `srcset`, or unless `srcset` contains `w`
	 * descriptors.
	 */
	src: string;

	/**
	 * One or more strings separated by commas, indicating possible image sources for the user agent
	 * to use. Each string is composed of:
	 *
	 *      1.  A URL to an image
	 *      2.  Optionally, whitespace followed by one of:
	 *          -   A width descriptor (a positive integer directly followed by `w`). The width
	 *              descriptor is divided by the source size given in the `sizes` attribute to
	 *              calculate the effective pixel density.
	 *          -   A pixel density descriptor (a positive floating point number directly followed
	 *              by `x`).
	 *
	 * If no descriptor is specified, the source is assigned the default descriptor of `1x`.
	 *
	 * It is incorrect to mix width descriptors and pixel density descriptors in the same `srcset`
	 * attribute. Duplicate descriptors (for instance, two sources in the same `srcset` which are
	 * both described with `2x`) are also invalid.
	 *
	 * The user agent selects any of the available sources at its discretion. This provides them
	 * with significant leeway to tailor their selection based on things like user preferences or
	 * bandwidth conditions. See our Responsive images tutorial for an example.
	 */
	srcset: string;

	/**
	 * The partial URL (starting with `#`) of an image map associated with the element.
	 */
	usemap: string;

	/**
	 * The intrinsic width of the image in pixels. Must be an integer without a unit.
	 */
	width: number;
}

/* HTMLInputElementAttributes */

export interface HTMLLabelElementAttributes extends HTMLElementAttributes {

	/**
	 * The `id` of a labelable form-related element in the same document as the `<label>` element.
	 * The first element in the document with an `id` matching the value of the `for` attribute is
	 * the *labeled control* for this label element if it is a labelable element. If it is not
	 * labelable then the `for` attribute has no effect. If there are other elements that also match
	 * the `id` value, later in the document, they are not considered.
	 */
	for: string;
}

export interface HTMLLIElementAttributes extends HTMLElementAttributes {

	/**
	 * This integer attribute indicates the current ordinal value of the list item as defined by the
	 * `<ol>` element. The only allowed value for this attribute is a number, even if the list is
	 * displayed with Roman numerals or letters. List items that follow this one continue numbering
	 * from the value set. The **value** attribute has no meaning for unordered lists (`<ul>`) or
	 * for menus (`<menu>`).
	 */
	value: number;
}

export interface HTMLMeterElementAttributes extends HTMLElementAttributes {

	/**
	 * The `<form>` element to associate the `<meter>` element with (its *form owner*). The value of
	 * this attribute must be the `id` of a `<form>` in the same document. If this attribute is not
	 * set, the `<meter>` is associated with its ancestor `<form>` element, if any. This attribute
	 * is only used if the `<meter>` element is being used as a form-associated element, such as one
	 * displaying a range corresponding to an `<input type="number">`.
	 */
	form: string;

	/**
	 * The lower numeric bound of the high end of the measured range. This must be less than the
	 * maximum value (`max` attribute), and it also must be greater than the low value and minimum
	 * value (`low` attribute and `min` attribute, respectively), if any are specified. If
	 * unspecified, or if greater than the maximum value, the `high` value is equal to the maximum
	 * value.
	 */
	high: number;

	/**
	 * The upper numeric bound of the low end of the measured range. This must be greater than the
	 * minimum value (`min` attribute), and it also must be less than the high value and maximum
	 * value (`high` attribute and `max` attribute, respectively), if any are specified. If
	 * unspecified, or if less than the minimum value, the `low` value is equal to the minimum
	 * value.
	 */
	low: number;

	/**
	 * The upper numeric bound of the measured range. This must be greater than the minimum value
	 * (`min` attribute), if specified. If unspecified, the maximum value is `1`.
	 */
	max: number;

	/**
	 * The lower numeric bound of the measured range. This must be less than the maximum value
	 * (`max` attribute), if specified. If unspecified, the minimum value is `0`.
	 */
	min: number;

	/**
	 * This attribute indicates the optimal numeric value. It must be within the range (as defined
	 * by the `min` attribute and `max` attribute). When used with the `low` attribute and `high`
	 * attribute, it gives an indication where along the range is considered preferable. For
	 * example, if it is between the `min` attribute and the `low` attribute, then the lower range
	 * is considered preferred. The browser may color the meter's bar differently depending on
	 * whether the value is less than or equal to the optimum value.
	 */
	optimum: number;

	/**
	 * The current numeric value. This must be between the minimum and maximum values (`min`
	 * attribute and `max` attribute) if they are specified. If unspecified or malformed, the value
	 * is `0`. If specified, but not within the range given by the `min` attribute and `max`
	 * attribute, the value is equal to the nearest end of the range.
	 */
	value: number;
}

export interface HTMLOListElementAttributes extends HTMLElementAttributes {

	/**
	 * This Boolean attribute specifies that the list's items are in reverse order. Items will be
	 * numbered from high to low.
	 */
	reversed: boolean;

	/**
	 * An integer to start counting from for the list items. Always an Arabic numeral (1, 2, 3,
	 * etc.), even when the numbering `type` is letters or Roman numerals. For example, to start
	 * numbering elements from the letter "d" or the Roman numeral "iv," use `start="4"`.
	 */
	start: number;
}

export interface HTMLOptGroupElementAttributes extends HTMLElementAttributes {

	/**
	 * If this Boolean attribute is set, none of the items in this option group is selectable. Often
	 * browsers grey out such control and it won't receive any browsing events, like mouse clicks or
	 * focus-related ones.
	 */
	disabled: string;

	/**
	 * The name of the group of options, which the browser can use when labeling the options in the
	 * user interface. This attribute is mandatory if this element is used.
	 */
	label: string;
}

export interface HTMLOptionElementAttributes extends HTMLElementAttributes {

	/**
	 * If this Boolean attribute is set, this option is not checkable. Often browsers grey out such
	 * control and it won't receive any browsing event, like mouse clicks or focus-related ones. If
	 * this attribute is not set, the element can still be disabled if one of its ancestors is a
	 * disabled `<optgroup>` element.
	 */
	disabled: boolean;

	/**
	 * This attribute is text for the label indicating the meaning of the option. If the `label`
	 * attribute isn't defined, its value is that of the element text content.
	 */
	label: string;

	/**
	 * If present, this Boolean attribute indicates that the option is initially selected. If the
	 * `<option>` element is the descendant of a `<select>` element whose `multiple` attribute is
	 * not set, only one single `<option>` of this `<select>` element may have the `selected`
	 * attribute.
	 */
	selected: boolean;

	/**
	 * The content of this attribute represents the value to be submitted with the form, should this
	 * option be selected. If this attribute is omitted, the value is taken from the text content of
	 * the option element.
	 */
	value: string;
}

export interface HTMLProgressElementAttributes extends HTMLElementAttributes {

	/**
	 * This attribute describes how much work the task indicated by the `progress` element requires.
	 * The `max` attribute, if present, must have a value greater than `0` and be a valid floating
	 * point number. The default value is `1`.
	 */
	max: number;

	/**
	 * This attribute specifies how much of the task that has been completed. It must be a valid
	 * floating point number between `0` and `max`, or between `0` and `1` if `max` is omitted. If
	 * there is no `value` attribute, the progress bar is indeterminate; this indicates that an
	 * activity is ongoing with no indication of how long it is expected to take.
	 */
	value: number;
}

export interface HTMLQuoteElementAttributes extends HTMLElementAttributes {

	/**
	 * The value of this attribute is a URL that designates a source document or message for the
	 * information quoted. This attribute is intended to point to information explaining the context
	 * or the reference for the quote.
	 */
	cite: string;
}

export interface HTMLSelectElementAttributes extends HTMLElementAttributes {

	/**
	 * A `DOMString` providing a hint for a user agent's autocomplete feature. See The HTML
	 * autocomplete attribute for a complete list of values and details on how to use autocomplete.
	 */
	autocomplete: string;

	/**
	 * This Boolean attribute lets you specify that a form control should have input focus when the
	 * page loads. Only one form element in a document can have the `autofocus` attribute.
	 */
	autofocus: boolean;

	/**
	 * This Boolean attribute indicates that the user cannot interact with the control. If this
	 * attribute is not specified, the control inherits its setting from the containing element, for
	 * example `<fieldset>`; if there is no containing element with the `disabled` attribute set,
	 * then the control is enabled.
	 */
	disabled: boolean;

	/**
	 * The `<form>` element to associate the `<select>` with (its *form owner*). The value of this
	 * attribute must be the `id` of a `<form>` in the same document. (If this attribute is not set,
	 * the `<select>` is associated with its ancestor `<form>` element, if any.)
	 *
	 * This attribute lets you associate `<select>` elements to `<form>`s anywhere in the document,
	 * not just inside a `<form>`. It can also override an ancestor `<form>` element.
	 */
	form: string;

	/**
	 * This Boolean attribute indicates that multiple options can be selected in the list. If it is
	 * not specified, then only one option can be selected at a time. When `multiple` is specified,
	 * most browsers will show a scrolling list box instead of a single line dropdown.
	 */
	multiple: boolean;

	/**
	 * This attribute is used to specify the name of the control.
	 */
	name: string;

	/**
	 * A Boolean attribute indicating that an option with a non-empty string value must be selected.
	 */
	required: boolean;

	/**
	 * If the control is presented as a scrolling list box (e.g. when `multiple` is specified), this
	 * attribute represents the number of rows in the list that should be visible at one time.
	 * Browsers are not required to present a select element as a scrolled list box. The default
	 * value is `0`.
	 */
	size: number;
}

export interface HTMLSourceElementAttributes extends HTMLElementAttributes {

	/**
	 * Media query of the resource's intended media; this should be used only in a `<picture>`
	 * element.
	 */
	media: string;

	/**
	 * Is a list of source sizes that describes the final rendered width of the image represented by
	 * the source. Each source size consists of a comma-separated list of media condition-length
	 * pairs. This information is used by the browser to determine, before laying the page out,
	 * which image defined in `srcset` to use. Please note that `sizes` will have its effect only if
	 * width dimension descriptors are provided with `srcset` instead of pixel ratio values (200w
	 * instead of 2x for example).
	 *
	 * The `sizes` attribute has an effect only when the `<source>` element is the direct child of a
	 * `<picture>` element.
	 */
	sizes: string;

	/**
	 * Required for `<audio>` and `<video>`, address of the media resource. The value of this
	 * attribute is ignored when the `<source>` element is placed inside a `<picture>` element.
	 */
	src: string;

	/**
	 * A list of one or more strings separated by commas indicating a set of possible images
	 * represented by the source for the browser to use. Each string is composed of:
	 *
	 *      1.  One URL specifying an image.
	 *      2.  A width descriptor, which consists of a string containing a positive integer
	 *          directly followed by `"w"`, such as `300w`. The default value, if missing, is the
	 *          infinity.
	 *      3.  A pixel density descriptor, that is a positive floating number directly followed by
	 *          `"x"`. The default value, if missing, is `1x`.
	 *
	 * Each string in the list must have at least a width descriptor or a pixel density descriptor
	 * to be valid. Among the list, there must be only one string containing the same tuple of width
	 * descriptor and pixel density descriptor. The browser chooses the most adequate image to
	 * display at a given point of time.
	 *
	 * The `srcset` attribute has an effect only when the `<source>` element is the direct child of
	 * a `<picture>` element.
	 */
	srcset: string;

	/**
	 * The MIME media type of the resource, optionally with a `codecs` parameter.
	 *
	 * If the `type` attribute isn't specified, the media's type is retrieved from the server and
	 * checked to see if the user agent can handle it; if it can't be rendered, the next `<source>`
	 * is checked. If the `type` attribute is specified, it's compared against the types the user
	 * agent can present, and if it's not recognized, the server doesn't even get queried; instead,
	 * the next `<source>` element is checked at once.
	 *
	 * When used in the context of a `<picture>` element, the browser will fall back to using the
	 * image specified by the `<picture>` element's `<img>` child if it is unable to find a suitable
	 * image to use after examining every provided `<source>`.
	 */
	type: string;
}

export interface HTMLTableDataCellElementAttributes extends HTMLElementAttributes {

	/**
	 * This attribute contains a non-negative integer value that indicates for how many columns the
	 * cell extends. Its default value is `1`. Values higher than 1000 will be considered as
	 * incorrect and will be set to the default value (1).
	 */
	colspan: number;

	/**
	 * This attribute contains a list of space-separated strings, each corresponding to the **id**
	 * attribute of the `<th>` elements that apply to this element.
	 */
	headers: string;

	/**
	 * This attribute contains a non-negative integer value that indicates for how many rows the
	 * cell extends. Its default value is `1`; if its value is set to `0`, it extends until the end
	 * of the table section (`<thead>`, `<tbody>`, `<tfoot>`, even if implicitly defined), that the
	 * cell belongs to. Values higher than 65534 are clipped down to 65534.
	 */
	rowspan: number;
}

export interface HTMLTextAreaElementAttributes extends HTMLElementAttributes {

	/**
	 * This is a non-standard attribute supported by WebKit on iOS (therefore nearly all browsers
	 * running on iOS, including Safari, Firefox, and Chrome), which controls whether and how the
	 * text value should be automatically capitalized as it is entered/edited by the user. The
	 * non-deprecated values are available in iOS 5 and later. Possible values are:
	 *
	 *      -   `none`: Completely disables automatic capitalization.
	 *      -   `sentences`: Automatically capitalize the first letter of sentences.
	 *      -   `words`: Automatically capitalize the first letter of words.
	 *      -   `characters`: Automatically capitalize all characters.
	 */
	autocapitalize: "none" | "sentences" | "words" | "characters";

	/**
	 * This attribute indicates whether the value of the control can be automatically completed by
	 * the browser. Possible values are:
	 *
	 *      -   `off`: The user must explicitly enter a value into this field for every use, or the
	 *          document provides its own auto-completion method; the browser does not automatically
	 *          complete the entry.
	 *      -   `on`: The browser can automatically complete the value based on values that the user
	 *          has entered during previous uses.
	 *
	 * If the `autocomplete` attribute is not specified on a `<textarea>` element, then the browser
	 * uses the `autocomplete` attribute value of the `<textarea>` element's form owner. The form
	 * owner is either the `<form>` element that this `<textarea>` element is a descendant of or the
	 * form element whose `id` is specified by the `form` attribute of the input element. For more
	 * information, see the `autocomplete` attribute in `<form>`.
	 */
	autocomplete: boolean;

	/**
	 * This Boolean attribute lets you specify that a form control should have input focus when the
	 * page loads. Only one form-associated element in a document can have this attribute specified.
	 */
	autofocus: boolean;

	/**
	 * The visible width of the text control, in average character widths. If it is specified, it
	 * must be a positive integer. If it is not specified, the default value is `20`.
	 */
	cols: number;

	/**
	 * This Boolean attribute indicates that the user cannot interact with the control. If this
	 * attribute is not specified, the control inherits its setting from the containing element, for
	 * example `<fieldset>`; if there is no containing element when the `disabled` attribute is set,
	 * the control is enabled.
	 */
	disabled: boolean;

	/**
	 * The form element that the `<textarea>` element is associated with (its "form owner"). The
	 * value of the attribute must be the `id` of a form element in the same document. If this
	 * attribute is not specified, the `<textarea>` element must be a descendant of a form element.
	 * This attribute enables you to place `<textarea>` elements anywhere within a document, not
	 * just as descendants of form elements.
	 */
	form: string;

	/**
	 * The maximum number of characters (UTF-16 code units) that the user can enter. If this value
	 * isn't specified, the user can enter an unlimited number of characters.
	 */
	maxlength: number;

	/**
	 * The minimum number of characters (UTF-16 code units) required that the user should enter.
	 */
	minlength: number;

	/**
	 * The name of the control.
	 */
	name: string;

	/**
	 * A hint to the user of what can be entered in the control. Carriage returns or line-feeds
	 * within the placeholder text must be treated as line breaks when rendering the hint.
	 */
	placeholder: string;

	/**
	 * This Boolean attribute indicates that the user cannot modify the value of the control. Unlike
	 * the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or
	 * selecting in the control. The value of a read-only control is still submitted with the form.
	 */
	readonly: boolean;

	/**
	 * This attribute specifies that the user must fill in a value before submitting a form.
	 */
	required: string;

	/**
	 * The number of visible text lines for the control.
	 */
	rows: number;

	/**
	 * Specifies whether the `<textarea>` is subject to spell checking by the underlying browser/OS.
	 * The value can be:
	 *
	 *      -   `true`: Indicates that the element needs to have its spelling and grammar checked.
	 *      -   `default`: Indicates that the element is to act according to a default behavior,
	 *          possibly based on the parent element's own `spellcheck` value.
	 *      -   `false`: Indicates that the element should not be spell checked.
	 */
	spellcheck: "true" | "default" | "false";

	/**
	 * Indicates how the control wraps text. Possible values are:
	 *      -   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has
	 *          no more than the width of the control; the `cols` attribute must also be specified
	 *          for this to take effect.
	 *      -   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF
	 *          pair, but does not insert any additional line breaks.
	 *      -   `off`: Like `soft` but changes appearance to `white-space: pre` so line segments
	 *          exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally
	 *          scrollable.
	 *
	 * If this attribute is not specified, `soft` is its default value.
	 */
	wrap: "hard" | "soft" | "off";
}

export interface HTMLTableHeaderCellElementAttributes extends HTMLElementAttributes {

	/**
	 * This attribute contains a short abbreviated description of the cell's content. Some
	 * user-agents, such as speech readers, may present this description before the content itself.
	 */
	abbr: string;

	/**
	 * This attribute contains a non-negative integer value that indicates for how many columns the
	 * cell extends. Its default value is `1`. Values higher than 1000 will be considered as
	 * incorrect and will be set to the default value (1).
	 */
	colspan: number;

	/**
	 * This attribute contains a list of space-separated strings, each corresponding to the **id**
	 * attribute of the `<th>` elements that apply to this element.
	 */
	headers: string;

	/**
	 * This attribute contains a non-negative integer value that indicates for how many rows the
	 * cell extends. Its default value is `1`; if its value is set to `0`, it extends until the end
	 * of the table section (`<thead>`, `<tbody>`, `<tfoot>`, even if implicitly defined), that the
	 * cell belongs to. Values higher than 65534 are clipped down to 65534.
	 */
	rowspan: number;

	/**
	 * This enumerated attribute defines the cells that the header (defined in the `<th>`) element
	 * relates to. It may have the following values:
	 *
	 *      -   `row`: The header relates to all cells of the row it belongs to.
	 *      -   `col`: The header relates to all cells of the column it belongs to.
	 *      -   `rowgroup`: The header belongs to a rowgroup and relates to all of its cells. These
	 *          cells can be placed to the right or the left of the header, depending on the value
	 *          of the `dir` attribute in the `<table>` element.
	 *      -   `colgroup`: The header belongs to a colgroup and relates to all of its cells.
	 *      -   `auto`
	 *
	 * The default value when this attribute is not specified is `auto`.
	 */
	scope: "row" | "col" | "rowgroup" | "colgroup" | "auto";
}

export interface HTMLTrackElementAttributes extends HTMLElementAttributes {

	/**
	 * This attribute indicates that the track should be enabled unless the user's preferences
	 * indicate that another track is more appropriate. This may only be used on one `track` element
	 * per media element.
	 */
	default: boolean;

	/**
	 * How the text track is meant to be used. If omitted the default kind is `subtitles`. If the
	 * attribute contains an invalid value, it will use `metadata` (Versions of Chrome earlier than
	 * 52 treated an invalid value as `subtitles`). The following keywords are allowed:
	 *      -   `subtitles`
	 *          -   Subtitles provide translation of content that cannot be understood by the
	 *              viewer. For example dialogue or text that is not English in an English language
	 *              film.
	 *          -   Subtitles may contain additional content, usually extra background information.
	 *              For example the text at the beginning of the Star Wars films, or the date, time,
	 *              and location of a scene.
	 *      -   `captions`
	 *          -   Closed captions provide a transcription and possibly a translation of audio.
	 *          -   It may include important non-verbal information such as music cues or sound
	 *              effects. It may indicate the cue's source (e.g. music, text, character).
	 *          -   Suitable for users who are deaf or when the sound is muted.
	 *      -   `descriptions`
	 *          -   Textual description of the video content.
	 *          -   Suitable for users who are blind or where the video cannot be seen.
	 *      -   `chapters`
	 *          -   Chapter titles are intended to be used when the user is navigating the media
	 *              resource.
	 *      -   `metadata`
	 *          -   Tracks used by scripts. Not visible to the user.
	 */
	kind: "subtitles" | "captions" | "descriptions" | "characters" | "metadata";

	/**
	 * A user-readable title of the text track which is used by the browser when listing available
	 * text tracks.
	 */
	label: string;

	/**
	 * Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and
	 * its URL value must have the same origin as the document -- unless the `<audio>` or `<video>`
	 * parent element of the `track` element has a `crossorigin` attribute.
	 */
	src: string;

	/**
	 * Language of the track text data. It must be a valid BCP 47 language tag. If the `kind`
	 * attribute is set to `subtitles`, then `srclang` must be defined.
	 */
	srclang: string;
}

export interface HTMLVideoElementAttributes extends HTMLElementAttributes {

	/**
	 * A Boolean attribute which if `true` indicates that the element should automatically toggle
	 * picture-in-picture mode when the user switches back and forth between this document and
	 * another document or application.
	 */
	autoPictureInPicture: string;

	/**
	 * A Boolean attribute; if specified, the video automatically begins to play back as soon as it
	 * can do so without stopping to finish loading the data.
	 *
	 * To disable video autoplay, `autoplay="false"` will not work; the video will autoplay if the
	 * attribute is there in the `<video>` tag at all. To remove autoplay, the attribute needs to be
	 * removed altogether.
	 *
	 * In some browsers (e.g. Chrome 70.0) autoplay doesn't work if no `muted` attribute is present.
	 */
	autoplay: boolean;

	/**
	 * An attribute you can read to determine the time ranges of the buffered media. This attribute
	 * contains a `TimeRanges` object.
	 */
	buffered: string;

	/**
	 * If this attribute is present, the browser will offer controls to allow the user to control
	 * video playback, including volume, seeking, and pause/resume playback.
	 */
	controls: boolean;

	/**
	 * The `controlslist` attribute, when specified, helps the browser select what controls to show
	 * on the media element whenever the browser shows its own set of controls (e.g. when the
	 * `controls` attribute is specified).
	 *
	 * The allowed values are `nodownload`, `nofullscreen` and `noremoteplayback`.
	 *
	 * Use the `disablePictureInPicture` attribute if you want to disable the Picture-In-Picture
	 * mode (and the control).
	 */
	controlslist: "nodownload" | "nofullscreen" | "noremoteplayback";

	/**
	 * This enumerated attribute indicates whether to use CORS to fetch the related image.
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
	 * it is handled as if the enumerated keyword `anonymous` was used. See CORS settings attributes
	 * for additional information.
	 */
	crossorigin: "anonymous" | "use-credentials";

	/**
	 * Reading `currentTime` returns a double-precision floating-point value indicating the current
	 * playback position of the media specified in seconds. If the media has not started playing
	 * yet, the time offset at which it will begin is returned. Setting `currentTime` sets the
	 * current playback position to the given time and seeks the media to that position if the media
	 * is currently loaded.
	 *
	 * If the media is being streamed, it's possible that the user agent may not be able to obtain
	 * some parts of the resource if that data has expired from the media buffer. Other media may
	 * have a media timeline that doesn't start at 0 seconds, so setting `currentTime` to a time
	 * before that would fail. The `getStartDate()` method can be used to determine the beginning
	 * point of the media timeline's reference frame.
	 */
	currentTime: number;

	/**
	 * Prevents the browser from suggesting a Picture-in-Picture context menu or to request
	 * Picture-in-Picture automatically in some cases.
	 */
	disablePictureInPicture: boolean;

	/**
	 * A Boolean attribute used to disable the capability of remote playback in devices that are
	 * attached using wired (HDMI, DVI, etc.) and wireless technologies (Miracast, Chromecast, DLNA,
	 * AirPlay, etc).
	 *
	 * In Safari, you can use `x-webkit-airplay="deny"` as a fallback.
	 */
	disableRemotePlayback: boolean;

	/**
	 * A double-precision floating-point value which indicates the duration (total length) of the
	 * media in seconds, on the media's timeline. If no media is present on the element, or the
	 * media is not valid, the returned value is `NaN`. If the media has no known end (such as for
	 * live streams of unknown duration, web radio, media incoming from WebRTC, and so forth), this
	 * value is `+Infinity`.
	 */
	duration: number;

	/**
	 * The height of the video's display area, in CSS pixels (absolute values only; no percentages.)
	 */
	height: number;

	/**
	 * This attribute tells the browser to ignore the actual intrinsic size of the image and pretend
	 * it's the size specified in the attribute. Specifically, the image would raster at these
	 * dimensions and `naturalWidth`/`naturalHeight` on images would return the values specified in
	 * this attribute. Explainer, examples
	 */
	intrinsicsize: boolean;

	/**
	 * A Boolean attribute; if specified, the browser will automatically seek back to the start upon
	 * reaching the end of the video.
	 */
	loop: boolean;

	/**
	 * A Boolean attribute that indicates the default setting of the audio contained in the video.
	 * If set, the audio will be initially silenced. Its default value is `false`, meaning that the
	 * audio will be played when the video is played.
	 */
	muted: boolean;

	/**
	 * A Boolean attribute indicating that the video is to be played "inline", that is within the
	 * element's playback area. Note that the absence of this attribute *does not* imply that the
	 * video will always be played in fullscreen.
	 */
	playsinline: boolean;

	/**
	 * A URL for an image to be shown while the video is downloading. If this attribute isn't
	 * specified, nothing is displayed until the first frame is available, then the first frame is
	 * shown as the poster frame.
	 */
	poster: string;

	/**
	 * This enumerated attribute is intended to provide a hint to the browser about what the author
	 * thinks will lead to the best user experience with regards to what content is loaded before
	 * the video is played. It may have one of the following values:
	 *
	 *      -   `none`: Indicates that the video should not be preloaded.
	 *      -   `metadata`: Indicates that only video metadata (e.g. length) is fetched.
	 *      -   `auto`: Indicates that the whole video file can be downloaded, even if the user is
	 *          not expected to use it.
	 *      -   *empty string*: Synonym of the `auto` value.
	 *
	 * The default value is different for each browser. The spec advises it to be set to `metadata`.
	 */
	preload: "none" | "metadata" | "auto" | "";

	/**
	 * The URL of the video to embed. This is optional; you may instead use the `<source>` element
	 * within the video block to specify the video to embed.
	 */
	src: number;

	/**
	 * The width of the video's display area, in CSS pixels (absolute values only; no percentages).
	 */
	width: number;
}
