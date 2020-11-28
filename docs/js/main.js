// Text Content

// b
document.getElementById("b").after(b(".b", "This is some bold text.").fragment);

// blockquote
document.getElementById("blockquote").after(blockquote(".blockquote", "This is a blockquote.").fragment);

// button
document.getElementById("button").after(button(".button", "This is a button.").fragment);

// code
document.getElementById("code").after(code(".code", "This is some inline code.").fragment);

// code
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
document.getElementById("audio").after(audio(".audio", []).fragment);

// img
document.getElementById("img").after(img(".img", []).fragment);

// picture
document.getElementById("picture").after(picture(".picture", []).fragment);

// video
document.getElementById("video").after(video(".video", []).fragment);

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

document.getElementById("ol").after(orderedList);

// section
document.getElementById("section").after(section(".section").fragment);

// ul
const unorderedList = ul(".ul");
unorderedList.push(listItem);

document.getElementById("ol").after(unorderedList);

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
document.getElementById("fieldset").after(fieldset(".fieldset", "This is a legend.").fragment);

// Form
document.getElementById("form").after(form(".form", "GET", "/", "application/x-www-form-urlencoded").fragment);

// Input
// TODO

// Select
document.getElementById("select").after(select(".select", {}).fragment);

// Figure
document.getElementById("figure").after(figure(".figure", "This is a caption.").fragment);

// Details
document.getElementById("details").after(details(".details", "This is a summary.").fragment);

// Table
document.getElementById("table").after(table(".table", "This is a table.").fragment);

// Anchor
document.getElementById("a").after(a(".a", "This is an anchor.", window.location.href).fragment);
