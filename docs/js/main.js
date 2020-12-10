// Text-Level

// label
document.getElementById("label").after(label(".label", "This is a label.").fragment);

// li
const listItem = li(".li", "This is a list item.");

// Embedded

// audio
document.getElementById("audio").after(audio(".audio", [window.location.href]).fragment);

// img
document.getElementById("img").after(img(".img", [window.location.href]).fragment);

// picture
document.getElementById("picture").after(picture(".picture", [window.location.href]).fragment);

// video
document.getElementById("video").after(video(".video", [window.location.href]).fragment);

// Grouping

// hr
document.getElementById("hr").after(hr(".hr").fragment);

// ol
const orderedList = ol(".ol");
orderedList.push(listItem);

document.getElementById("ol").after(orderedList.fragment);

// ul
const unorderedList = ul(".ul");
unorderedList.push(listItem);

document.getElementById("ul").after(unorderedList.fragment);

// Form-associated

// meter
document.getElementById("meter").after(meter(".meter").fragment);

// progress
document.getElementById("progress").after(progress(".progress").fragment);

// textarea
document.getElementById("textarea").after(textarea(".textarea").fragment);

// IFrame
document.getElementById("iframe").after(iframe(".iframe", window.location.href).fragment);

// Field Set
document.getElementById("fieldset").after(fieldset(".fieldset", "fieldset").fragment);

// Form
document.getElementById("form").after(form(".form").fragment);

// Input

// Button-like

// button[type=button]
document.getElementById("button").after(button(".button", "This is a button.").fragment);

// button[type=reset]
document.getElementById("reset").after(reset(".reset", "This is a reset button.").fragment);

// button[type=submit]
document.getElementById("submit").after(submit(".submit", "This is a submit button.").fragment);

// input[type=search]
document.getElementById("search").after(search(".search", "This is a search query.").fragment);

// File
document.getElementById("file").after(file(".file", "image/*", true).fragment);

// Input

// input[type=checkbox]
document.getElementById("checkbox").after(checkbox(".checkbox", "checkbox", "checkbox", true).fragment);

// input[type=color]
document.getElementById("color").after(color(".color", "color", "#000000", true).fragment);

// input[type=date]
document.getElementById("date").after(date(".date", "date", "1969-04-20", true).fragment);

// input[type=datetime]
document.getElementById("datetime").after(datetime(".datetime", "datetime", "1969-04-20T16:20", true).fragment);

// input[type=email]
document.getElementById("email").after(email(".email", "email", "foo@bar.com", true).fragment);

// input[type=hidden]
document.getElementById("hidden").after(hidden(".hidden", "hidden", "The Secret lies with Charlotte.", true).fragment);

// input[type=image]
document.getElementById("image").after(image(".image", window.location.href).fragment);

// input[type=month]
document.getElementById("month").after(month(".month", "month", "1969-04").fragment);

// input[type=number]
document.getElementById("number").after(number(".number", "number", 420, true).fragment);

// input[type=password]
document.getElementById("password").after(password(".password", "password", "********", true).fragment);

// input[type=radio]
document.getElementById("radio").after(radio(".radio", "radio", "radio", true).fragment);

// input[type=range]
document.getElementById("range").after(range(".range", "range", 69, true).fragment);

// input[type=tel]
document.getElementById("tel").after(tel(".tel", "tel", "+1 (800) 867-5309", true).fragment);

// input[type=text]
document.getElementById("text").after(text(".text", "text", "The Secret lies with Charlotte.", true).fragment);

// input[type=time]
document.getElementById("time").after(time(".time", "time", "16:20").fragment);

// input[type=url]
document.getElementById("url").after(url(".url", "url", window.location.href, true).fragment);

// input[type=week]
document.getElementById("week").after(week(".week", "week", "2004-W20", true).fragment);

// Select
document.getElementById("select").after(select(".select", "select", [{ "key": "Item 1", "value": [{ "key": "Item 1.1" }] }, { "key": "--", "disabled": true }, { "key": "Item 2" }], true).fragment);

// Figure
document.getElementById("figure").after(figure(".figure", "This is a caption.").fragment);

// Details
document.getElementById("details").after(details(".details", "This is a summary.").fragment);

// Table
document.getElementById("table").after(table(".table", "This is a table.").fragment);

// Anchor
document.getElementById("a").after(a(".a", "This is an anchor.", window.location.href).fragment);
