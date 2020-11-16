import type { HtmlElement } from "./HtmlElement";

// <caption> should be part of a <table>
// <col> should be part of a <colgroup>
// <colgroup> should be part of a <table>
// <figcaption> should be part of a <figure>
// <legend> should be part of a <fieldset>
// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>
// <source> should be a part of a <picture>, <audio> or <video>
// <summary> should be part of a <details>
// <tbody> should be part of a <table>
// <td> should be part of a <tr>
// <tfoot> should be part of a <table>
// <th> should be part of a <tr>
// <thead> should be part of a <table>
// <tr> should be part of a <tbody>, <tfoot> or <thead>
// <track> should be a part of a <audio> or <video>

function createElement(element: HtmlElement) {
	const fragment = document.createDocumentFragment();


}

createElement("div");
