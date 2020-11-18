/* eslint-enable @typescript-eslint/typedef */

import type { HTMLElementAttributes } from "./attributes";

interface HTMLInputElementAttributes extends HTMLElementAttributes {

	/**
	 * TODO
	 */
	autocomplete: any;

	/**
	 * TODO
	 */
	autofocus: any;

	/**
	 * TODO
	 */
	disabled: any;

	/**
	 * TODO
	 */
	form: any;

	/**
	 * TODO
	 */
	name: any;

	/**
	 * TODO
	 */
	type: any;

	/**
	 * TODO
	 */
	value: any;
}

export interface HTMLButtonInputElement extends HTMLElementAttributes, HTMLInputElementAttributes { }

export interface HTMLCheckboxInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * TODO
	 */
	checked: any;

	/**
	 * TODO
	 */
	indeterminate: any;

	/**
	 * TODO
	 */
	required: any;
}

export interface HTMLColorInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;
}

export interface HTMLDateInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * TODO
	 */
	max: any;

	/**
	 * TODO
	 */
	min: any;

	/**
	 * TODO
	 */
	readonly: any;

	/**
	 * TODO
	 */
	required: any;

	/**
	 * TODO
	 */
	step: any;
}

export interface HTMLDatetimeLocalInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * TODO
	 */
	max: any;

	/**
	 * TODO
	 */
	min: any;

	/**
	 * TODO
	 */
	readonly: any;

	/**
	 * TODO
	 */
	required: any;

	/**
	 * TODO
	 */
	step: any;
}

export interface HTMLEmailInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * TODO
	 */
	multiple: any;

	/**
	 * TODO
	 */
	maxlength: any;

	/**
	 * TODO
	 */
	minlength: any;

	/**
	 * TODO
	 */
	pattern: any;

	/**
	 * TODO
	 */
	placeholder: any;

	/**
	 * TODO
	 */
	readonly: any;

	/**
	 * TODO
	 */
	required: any;

	/**
	 * TODO
	 */
	size: any;
}

export interface HTMLFileInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * TODO
	 */
	accept: any;

	/**
	 * TODO
	 */
	capture: any;

	/**
	 * TODO
	 */
	files: any;

	/**
	 * TODO
	 */
	multiple: any;

	/**
	 * TODO
	 */
	required: any;
}

export interface HTMLHiddenInputElement extends HTMLElementAttributes, HTMLInputElementAttributes { }

export interface HTMLImageInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * TODO
	 */
	alt: any;

	/**
	 * TODO
	 */
	formaction: any;

	/**
	 * TODO
	 */
	formenctype: any;

	/**
	 * TODO
	 */
	formmethod: any;

	/**
	 * TODO
	 */
	formnovalidate: any;

	/**
	 * TODO
	 */
	formtarget: any;

	/**
	 * TODO
	 */
	height: any;

	/**
	 * TODO
	 */
	src: any;

	/**
	 * TODO
	 */
	width: any;
}

export interface HTMLMonthInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * TODO
	 */
	max: any;

	/**
	 * TODO
	 */
	min: any;

	/**
	 * TODO
	 */
	readonly: any;

	/**
	 * TODO
	 */
	required: any;

	/**
	 * TODO
	 */
	step: any;
}

export interface HTMLNumberInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * TODO
	 */
	max: any;

	/**
	 * TODO
	 */
	min: any;

	/**
	 * TODO
	 */
	placeholder: any;

	/**
	 * TODO
	 */
	readonly: any;

	/**
	 * TODO
	 */
	required: any;

	/**
	 * TODO
	 */
	step: any;
}

export interface HTMLPasswordInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * TODO
	 */
	maxlength: any;

	/**
	 * TODO
	 */
	minlength: any;

	/**
	 * TODO
	 */
	pattern: any;

	/**
	 * TODO
	 */
	placeholder: any;

	/**
	 * TODO
	 */
	readonly: any;

	/**
	 * TODO
	 */
	required: any;

	/**
	 * TODO
	 */
	size: any;
}

export interface HTMLRadioInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * TODO
	 */
	checked: any;

	/**
	 * TODO
	 */
	required: any;
}

export interface HTMLRangeInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * TODO
	 */
	max: any;

	/**
	 * TODO
	 */
	min: any;

	/**
	 * TODO
	 */
	step: any;
}

export interface HTMLResetInputElement extends HTMLElementAttributes, HTMLInputElementAttributes { }

export interface HTMLSearchInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * TODO
	 */
	dirname: any;

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * TODO
	 */
	maxlength: any;

	/**
	 * TODO
	 */
	minlength: any;

	/**
	 * TODO
	 */
	pattern: any;

	/**
	 * TODO
	 */
	placeholder: any;

	/**
	 * TODO
	 */
	readonly: any;

	/**
	 * TODO
	 */
	required: any;

	/**
	 * TODO
	 */

	size: any;

	/**
	 * TODO
	 */
	spellcheck: any;
}

export interface HTMLSubmitInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * TODO
	 */
	formaction: any;

	/**
	 * TODO
	 */
	formenctype: any;

	/**
	 * TODO
	 */
	formmethod: any;

	/**
	 * TODO
	 */
	formnovalidate: any;

	/**
	 * TODO
	 */
	formtarget: any;
}

export interface HTMLTelInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * TODO
	 */
	maxlength: any;

	/**
	 * TODO
	 */
	minlength: any;

	/**
	 * TODO
	 */
	pattern: any;

	/**
	 * TODO
	 */
	placeholder: any;

	/**
	 * TODO
	 */
	readonly: any;

	/**
	 * TODO
	 */
	required: any;

	/**
	 * TODO
	 */
	size: any;
}

export interface HTMLTextInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * TODO
	 */
	dirname: any;

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * TODO
	 */
	maxlength: any;

	/**
	 * TODO
	 */
	minlength: any;

	/**
	 * TODO
	 */
	pattern: any;

	/**
	 * TODO
	 */
	placeholder: any;

	/**
	 * TODO
	 */
	readonly: any;

	/**
	 * TODO
	 */
	required: any;

	/**
	 * TODO
	 */
	size: any;

	/**
	 * TODO
	 */
	spellcheck: any;
}

export interface HTMLTimeInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * A string indicating the latest time to accept, specified in the same time value format as
	 * described above. If the specified string isn't a valid time, no maximum value is set.
	 */
	max: number;

	/**
	 * A string specifying the earliest time to accept, given in the time value format described
	 * previously. If the value specified isn't a valid time string, no minimum value is set.
	 */
	min: number;

	/**
	 * A Boolean attribute which, if present, means this field cannot be edited by the user. Its
	 * `value` can, however, still be changed by JavaScript code directly setting the
	 * `HTMLInputElement.value` property.
	 */
	readonly: boolean;

	/**
	 * `required` is a Boolean attribute which, if present, indicates that the user must specify a
	 * value for the input before the owning form can be submitted.
	 */
	required: boolean;

	/**
	 * The `step` attribute is a number that specifies the granularity that the value must adhere
	 * to, or the special value `any`, which is described below. Only values which are equal to the
	 * basis for stepping (`min` if specified, `value` otherwise, and an appropriate default value
	 * if neither of those is provided) are valid.
	 *
	 * A string value of `any` means that no stepping is implied, and any value is allowed (barring
	 * other constraints, such as `min` and `max`).
	 */
	step: number;
}

export interface HTMLUrlInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * The maximum number of characters (as UTF-16 code units) the user can enter into the `url`
	 * input. This must be an integer value 0 or higher. If no `maxlength` is specified, or an
	 * invalid value is specified, the `url` input has no maximum length. This value must also be
	 * greater than or equal to the value of `minlength`.
	 *
	 * The input will fail constraint validation if the length of the text value of the field is
	 * greater than `maxlength` UTF-16 code units long. Constraint validation is only applied when
	 * the value is changed by the user.
	 */
	maxlength: number;

	/**
	 * The minimum number of characters (as UTF-16 code units) the user can enter into the `url`
	 * input. This must be an non-negative integer value smaller than or equal to the value
	 * specified by `maxlength`. If no `minlength` is specified, or an invalid value is specified,
	 * the `url` input has no minimum length.
	 *
	 * The input will fail constraint validation if the length of the text entered into the field is
	 * fewer than `minlength` UTF-16 code units long. Constraint validation is only applied when the
	 * value is changed by the user.
	 */
	minlength: number;

	/**
	 * The `pattern` attribute, when specified, is a regular expression that the input's `value`
	 * must match in order for the value to pass constraint validation. It must be a valid
	 * JavaScript regular expression, as used by the `RegExp` type, and as documented in our guide
	 * on regular expressions; the `'u'` flag is specified when compiling the regular expression, so
	 * that the pattern is treated as a sequence of Unicode code points, instead of as ASCII. No
	 * forward slashes should be specified around the pattern text.
	 *
	 * If the specified pattern is not specified or is invalid, no regular expression is applied and this attribute is ignored completely.
	 */
	pattern: string;

	/**
	 * The `placeholder` attribute is a string that provides a brief hint to the user as to what
	 * kind of information is expected in the field. It should be a word or short phrase that
	 * demonstrates the expected type of data, rather than an explanatory message. The text *must
	 * not* include carriage returns or line feeds.
	 *
	 * If the control's content has one directionality (LTR or RTL) but needs to present the
	 * placeholder in the opposite directionality, you can use Unicode bidirectional algorithm
	 * formatting characters to override directionality within the placeholder; see Overriding BiDi
	 * using Unicode control characters in The Unicode Bidirectional Text Algorithm for those
	 * characters.
	 */
	placeholder: string;

	/**
	 * A Boolean attribute which, if present, means this field cannot be edited by the user. Its
	 * `value` can, however, still be changed by JavaScript code directly setting the
	 * `HTMLInputElement.value` property.
	 */
	readonly: boolean;

	/**
	 * `required` is a Boolean attribute which, if present, indicates that the user must specify a
	 * value for the input before the owning form can be submitted.
	 */
	required: boolean;

	/**
	 * The `size` attribute is a numeric value indicating how many characters wide the input field
	 * should be. The value must be a number greater than zero, and the default value is 20. Since
	 * character widths vary, this may or may not be exact and should not be relied upon to be so;
	 * the resulting input may be narrower or wider than the specified number of characters,
	 * depending on the characters and the font (`font` settings in use).
	 *
	 * This does *not* set a limit on how many characters the user can enter into the field. It only
	 * specifies approximately how many can be seen at a time. To set an upper limit on the length
	 * of the input data, use the `maxlength` attribute.
	 */
	size: number;

	/**
	 * `spellcheck` is a global attribute which is used to indicate whether or not to enable spell
	 * checking for an element. It can be used on any editable content, but here we consider
	 * specifics related to the use of `spellcheck` on `<input>` elements. The permitted values for
	 * `spellcheck` are:
	 *
	 *      -   `false`
	 *          -   Disable spell checking for this element.
	 *      -   `true`
	 *          -   Enable spell checking for this element.
	 *      -   "" (empty string) or no value
	 *          -   Follow the element's default behavior for spell checking. This may be based upon
	 *              a parent's `spellcheck` setting or other factors.
	 *
	 * An input field can have spell checking enabled if it doesn't have the readonly attribute set
	 * and is not disabled.
	 *
	 * The value returned by reading `spellcheck` may not reflect the actual state of spell checking
	 * within a control, if the user agent's preferences override the setting.
	 */
	spellcheck: "false" | "true" | "";
}

export interface HTMLWeekInputElement extends HTMLElementAttributes, HTMLInputElementAttributes {

	/**
	 * The value given to the `list` attribute should be the `id` of a `<datalist>` element located
	 * in the same document. The `<datalist>` provides a list of predefined values to suggest to the
	 * user for this input. Any values in the list that are not compatible with the `type` are not
	 * included in the suggested options. The values provided are suggestions, not requirements:
	 * users can select from this predefined list or provide a different value.
	 */
	list: string;

	/**
	 * The latest (time-wise) year and week number, in the string format discussed in the Value
	 * section above, to accept. If the `value` entered into the element exceeds this, the element
	 * fails constraint validation. If the value of the `max` attribute isn't a valid week string,
	 * then the element has no maximum value.
	 *
	 * This value must be greater than or equal to the year and week specified by the `min`
	 * attribute.
	 */
	max: number;

	/**
	 * The earliest year and week to accept. If the `value` of the element is less than this, the
	 * element fails constraint validation. If a value is specified for `min` that isn't a valid
	 * week string, the input has no minimum value.
	 *
	 * This value must be less than or equal to the value of the `max` attribute.
	 */
	min: number;

	/**
	 * TODO
	 */
	readonly: any;

	/**
	 * TODO
	 */
	required: any;

	/**
	 * The `step` attribute is a number that specifies the granularity that the value must adhere
	 * to, or the special value `any`, which is described below. Only values which are equal to the
	 * basis for stepping (`min` if specified, `value` otherwise, and an appropriate default value
	 * if neither of those is provided) are valid.
	 *
	 * A string value of `any` means that no stepping is implied, and any value is allowed (barring
	 * other constraints, such as `min` and `max`).
	 *
	 * For `week` inputs, the value of `step` is given in weeks, with a scaling factor of
	 * 604,800,000 (since the underlying numeric value is in milliseconds). The default value of
	 * `step` is 1, indicating 1 week. The default stepping base is -259,200,000, which is the
	 * beginning of the first week of 1970 (`"1970-W01"`).
	 */
	step: number;
}
