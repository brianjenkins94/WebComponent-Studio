// Text-Level

// b
document.getElementById("b").after(b(".b", "This is some bold text.").fragment);

// blockquote
document.getElementById("blockquote").after(blockquote(".blockquote", "This is a blockquote.").fragment);

// code
document.getElementById("code").after(code(".code", "This is some inline code.").fragment);

// del
document.getElementById("del").after(del(".del", "This is some deleted text.").fragment);

// em
document.getElementById("em").after(em(".em", "This is some emphasized text.").fragment);

// h1
document.getElementById("h1").after(h1(".h1", "This is a first-level header.").fragment);

// h2
document.getElementById("h2").after(h2(".h2", "This is a second-level header.").fragment);

// h3
document.getElementById("h3").after(h3(".h3", "This is a third-level header.").fragment);

// h4
document.getElementById("h4").after(h4(".h4", "This is a fourth-level header.").fragment);

// h5
document.getElementById("h5").after(h5(".h5", "This is a fifth-level header.").fragment);

// h6
document.getElementById("h6").after(h6(".h6", "This is a sixth-level header.").fragment);

// i
document.getElementById("i").after(i(".i", "This is some italicized text.").fragment);

// ins
document.getElementById("ins").after(ins(".ins", "This is some inserted text.").fragment);

// kbd
document.getElementById("kbd").after(kbd(".kbd", "Ctrl").fragment);

// label
document.getElementById("label").after(label(".label", "This is a label.").fragment);

// li
const listItem = li(".li", "This is a list item.");

// mark
document.getElementById("mark").after(mark(".mark", "This is some marked text.").fragment);

// p
document.getElementById("p").after(p(".p", "This is a paragraph.").fragment);

// pre
document.getElementById("pre").after(pre(".pre", "This is some preformatted text.").fragment);

// q
document.getElementById("q").after(q(".q", "This is some quoted text.").fragment);

// s
document.getElementById("s").after(s(".s", "This is some struckthrough text.").fragment);

// small
document.getElementById("small").after(small(".small", "This is some small text.").fragment);

// span
document.getElementById("span").after(span(".span", "This is a span.").fragment);

// strong
document.getElementById("strong").after(strong(".strong", "This is some strong text.").fragment);

// sub
document.getElementById("sub").after(sub(".sub", "This is some subscripted text.").fragment);

// sup
document.getElementById("sup").after(sup(".sup", "This is some superscripted text.").fragment);

// u
document.getElementById("u").after(u(".u", "This is some underlined text.").fragment);

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

// article
document.getElementById("article").after(article(".article").fragment);

// aside
document.getElementById("aside").after(aside(".aside").fragment);

// br
document.getElementById("br").after(br(".br").fragment);

// canvas
document.getElementById("canvas").after(canvas(".canvas").fragment);

// div
document.getElementById("div").after(div(".div").fragment);

// footer
document.getElementById("footer").after(footer(".footer").fragment);

// header
document.getElementById("header").after(header(".header").fragment);

// hr
document.getElementById("hr").after(hr(".hr").fragment);

// main
document.getElementById("main").after(main(".main").fragment);

// nav
document.getElementById("nav").after(nav(".nav").fragment);

// ol
const orderedList = ol(".ol");
orderedList.push(listItem);

document.getElementById("ol").after(orderedList.fragment);

// section
document.getElementById("section").after(section(".section").fragment);

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

// input[type=button]
document.getElementById("inputButton").after(inputButton(".inputButton", "This is an input[type=button].").fragment);

// button[type=reset]
document.getElementById("reset").after(reset(".reset", "This is a reset button.").fragment);

// input[type=reset]
document.getElementById("inputReset").after(inputReset(".inputReset", "This is an input[type=reset].").fragment);

// button[type=submit]
document.getElementById("submit").after(submit(".submit", "This is a submit button.").fragment);

// input[type=submit]
document.getElementById("inputSubmit").after(inputSubmit(".inputSubmit", "This is an input[type=submit].").fragment);

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

// createTemplate()
const foo = createTemplate("foo");

console.dir(foo());
