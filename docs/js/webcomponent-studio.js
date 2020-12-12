class Element {
    constructor(type) {
        this.attributes = {};
        this.children = [];
        this.events = {};
        this.type = type;
        this.template = document.createElement(this.type);
    }
    on(event, listener) {
        if (this.events[event] === undefined) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return listener;
    }
    off(event, listener) {
        if (event === undefined && listener === undefined) {
            this.events = {};
        }
        else if (listener === undefined) {
            delete this.events[event];
        }
        else if (this.events[event].indexOf(listener) !== -1) {
            this.events[event].splice(this.events[event].indexOf(listener), 1);
        }
    }
    emit(event, ...args) {
        if (this.events[event] !== undefined) {
            for (const listener of this.events[event]) {
                listener(...args);
            }
        }
        if (event !== "*") {
            this.emit("*", ...args);
        }
    }
    once(event, listener) {
        return this.on(event, () => {
            this.emit(event);
            this.off(event, listener);
        });
    }
    push(...items) {
        this.children.push(...items);
        return this;
    }
    unshift(...items) {
        this.children.unshift(...items);
        return this;
    }
    [Symbol.iterator]() {
        // TODO
    }
}

class AnchorElement extends Element {
    constructor(tagName, textContent, attributes) {
        super(tagName);
        this.children.push(...textContent);
        this.attributes = Object.assign(Object.assign({}, attributes), this.attributes);
    }
    toString() {
        this.template = document.createElement(this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            this.template.setAttribute(key, value);
        }
        for (const child of this.children) {
            this.template.innerHTML += child;
        }
        return this.template.outerHTML;
    }
}

// <summary> should be part of a <details>
class DetailsElement extends Element {
    constructor(tagName, summary, children, attributes) {
        super(tagName);
        const summaryElement = document.createElement("summary");
        summaryElement.append(...summary);
        this.children.push(summaryElement, ...children);
        this.attributes = Object.assign(Object.assign({}, attributes), this.attributes);
    }
    toString() {
        this.template = document.createElement(this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            this.template.setAttribute(key, value);
        }
        for (const child of this.children) {
            if (child instanceof HTMLElement) {
                this.template.append(child);
            }
            else {
                this.template.innerHTML += child;
            }
        }
        return this.template.outerHTML;
    }
}

// <source> should be a part of a <picture>, <audio> or <video>
// <track> should be a part of a <audio> or <video>
class EmbeddedElement extends Element {
    constructor(tagName, sources, attributes) {
        super(tagName);
        this.sources = sources;
        this.attributes = Object.assign(Object.assign({}, attributes), this.attributes);
    }
    toString() {
        this.template = document.createElement(this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            this.template.setAttribute(key, value);
        }
        if (/^audio|picture|video$/i.test(this.type)) {
            // TODO: Handle type
            for (const source of this.sources) {
                const sourceElement = document.createElement("source");
                sourceElement.setAttribute("src", source);
                this.template.appendChild(sourceElement);
            }
        }
        else {
            // TODO: Handle multiple `src`s
            this.template.setAttribute("src", this.sources[0]);
        }
        for (const child of this.children) {
            this.template.innerHTML += child;
        }
        return this.template.outerHTML;
    }
}

// <legend> should be part of a <fieldset>
class FieldSetElement extends Element {
    constructor(tagName, legend, children, attributes) {
        super(tagName);
        const legendElement = document.createElement("legend");
        legendElement.append(legend);
        this.children.push(legendElement, ...children);
        this.attributes = Object.assign(Object.assign({}, attributes), this.attributes);
    }
    toString() {
        this.template = document.createElement(this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            this.template.setAttribute(key, value);
        }
        for (const child of this.children) {
            this.template.innerHTML += child;
        }
        return this.template.outerHTML;
    }
}

// <figcaption> should be part of a <figure>
class FigureElement extends Element {
    constructor(tagName, caption, children, attributes) {
        super(tagName);
        const captionElement = document.createElement("caption");
        captionElement.append(caption);
        this.children.push(captionElement, ...children);
        this.attributes = Object.assign(Object.assign({}, attributes), this.attributes);
    }
    toString() {
        this.template = document.createElement(this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            this.template.setAttribute(key, value);
        }
        for (const child of this.children) {
            this.template.innerHTML += child;
        }
        return this.template.outerHTML;
    }
}

class GroupingElement extends Element {
    constructor(tagName, children, attributes) {
        super(tagName);
        this.children.push(...children);
        this.attributes = Object.assign(Object.assign({}, attributes), this.attributes);
    }
    toString() {
        this.template = document.createElement(this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            this.template.setAttribute(key, value);
        }
        for (const child of this.children) {
            this.template.innerHTML += child;
        }
        return this.template.outerHTML;
    }
}

// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>
class SelectElement extends Element {
    constructor(tagName, options, attributes) {
        super(tagName);
        this.options = options;
        this.attributes = Object.assign(Object.assign({}, attributes), this.attributes);
    }
    toString() {
        this.template = document.createElement(this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            this.template.setAttribute(key, value);
        }
        (function recurse(options, parent) {
            for (const option of options) {
                let element;
                if (Array.isArray(option["value"])) {
                    element = document.createElement("optgroup");
                    element.setAttribute("label", option["key"]);
                    recurse(option["value"], element);
                }
                else {
                    element = document.createElement("option");
                    if (option["key"] !== undefined) {
                        element.textContent = option["key"];
                    }
                    if (option["value"] !== undefined) {
                        element.value = option["value"];
                    }
                    else {
                        element.value = option["key"];
                    }
                }
                if (option["disabled"] === true) {
                    element.setAttribute("disabled", true);
                }
                if (option["required"] === true) {
                    element.setAttribute("required", true);
                }
                if (option["selected"] === true) {
                    element.setAttribute("selected", true);
                }
                parent.appendChild(element);
            }
        })(this.options, this.template);
        for (const child of this.children) {
            this.template.innerHTML += child;
        }
        return this.template.outerHTML;
    }
}

// <caption> should be part of a <table>
// <col> should be part of a <colgroup>
// <colgroup> should be part of a <table>
// <tbody> should be part of a <table>
// <td> should be part of a <tr>
// <tfoot> should be part of a <table>
// <th> should be part of a <tr>
// <thead> should be part of a <table>
// <tr> should be part of a <tbody>, <tfoot> or <thead>
class TableElement extends Element {
    constructor(tagName, caption, tableHeader, attributes) {
        super(tagName);
        const captionElement = document.createElement("caption");
        captionElement.append(caption);
        this.children.push(captionElement);
        this.attributes = Object.assign(Object.assign({}, attributes), this.attributes);
    }
    toString() {
        this.template = document.createElement(this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            this.template.setAttribute(key, value);
        }
        this.template.appendChild(document.createElement("thead"));
        this.template.appendChild(document.createElement("tbody"));
        this.template.appendChild(document.createElement("tfoot"));
        for (const child of this.children) {
            this.template.innerHTML += child;
        }
        return this.template.outerHTML;
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
function primeConstructor(Node, type) {
    return function (...args) {
        return new Node(type, ...args);
    };
}
const ElementTagNameMap = {
    // Anchor
    "a": primeConstructor(AnchorElement, "a"),
    // Details
    "details": primeConstructor(DetailsElement, "details"),
    // Form-associated
    "form": primeConstructor(GroupingElement, "form"),
    "meter": primeConstructor(GroupingElement, "meter"),
    "progress": primeConstructor(GroupingElement, "progress"),
    "textarea": primeConstructor(GroupingElement, "textarea"),
    // Grouping
    "article": primeConstructor(GroupingElement, "article"),
    "aside": primeConstructor(GroupingElement, "aside"),
    "br": primeConstructor(GroupingElement, "br"),
    "canvas": primeConstructor(GroupingElement, "canvas"),
    "div": primeConstructor(GroupingElement, "div"),
    "footer": primeConstructor(GroupingElement, "footer"),
    "header": primeConstructor(GroupingElement, "header"),
    "hr": primeConstructor(GroupingElement, "hr"),
    "main": primeConstructor(GroupingElement, "main"),
    "nav": primeConstructor(GroupingElement, "nav"),
    "ol": primeConstructor(GroupingElement, "ol"),
    "section": primeConstructor(GroupingElement, "section"),
    "ul": primeConstructor(GroupingElement, "ul"),
    // Text-Level
    "b": primeConstructor(GroupingElement, "b"),
    "blockquote": primeConstructor(GroupingElement, "blockquote"),
    "button": primeConstructor(GroupingElement, "button"),
    "reset": primeConstructor(GroupingElement, "button"),
    "submit": primeConstructor(GroupingElement, "button"),
    "code": primeConstructor(GroupingElement, "code"),
    "del": primeConstructor(GroupingElement, "del"),
    "em": primeConstructor(GroupingElement, "em"),
    "h1": primeConstructor(GroupingElement, "h1"),
    "h2": primeConstructor(GroupingElement, "h2"),
    "h3": primeConstructor(GroupingElement, "h3"),
    "h4": primeConstructor(GroupingElement, "h4"),
    "h5": primeConstructor(GroupingElement, "h5"),
    "h6": primeConstructor(GroupingElement, "h6"),
    "i": primeConstructor(GroupingElement, "i"),
    "ins": primeConstructor(GroupingElement, "ins"),
    "kbd": primeConstructor(GroupingElement, "kbd"),
    "label": primeConstructor(GroupingElement, "label"),
    "li": primeConstructor(GroupingElement, "li"),
    "mark": primeConstructor(GroupingElement, "mark"),
    "p": primeConstructor(GroupingElement, "p"),
    "pre": primeConstructor(GroupingElement, "pre"),
    "q": primeConstructor(GroupingElement, "q"),
    "s": primeConstructor(GroupingElement, "s"),
    "small": primeConstructor(GroupingElement, "small"),
    "span": primeConstructor(GroupingElement, "span"),
    "strong": primeConstructor(GroupingElement, "strong"),
    "sub": primeConstructor(GroupingElement, "sub"),
    "sup": primeConstructor(GroupingElement, "sup"),
    "u": primeConstructor(GroupingElement, "u"),
    // Embedded
    "audio": primeConstructor(EmbeddedElement, "audio"),
    "img": primeConstructor(EmbeddedElement, "img"),
    "picture": primeConstructor(EmbeddedElement, "picture"),
    "video": primeConstructor(EmbeddedElement, "video"),
    // Field Set
    "fieldset": primeConstructor(FieldSetElement, "fieldset"),
    // Figure
    "figure": primeConstructor(FigureElement, "figure"),
    // File
    "file": primeConstructor(GroupingElement, "input"),
    // IFrame
    "iframe": primeConstructor(GroupingElement, "iframe"),
    // Search
    "search": primeConstructor(GroupingElement, "input"),
    // Select
    "select": primeConstructor(SelectElement, "select"),
    // Input
    "checkbox": primeConstructor(GroupingElement, "input"),
    "color": primeConstructor(GroupingElement, "input"),
    "date": primeConstructor(GroupingElement, "input"),
    "datetime-local": primeConstructor(GroupingElement, "input"),
    "email": primeConstructor(GroupingElement, "input"),
    "hidden": primeConstructor(GroupingElement, "input"),
    "month": primeConstructor(GroupingElement, "input"),
    "number": primeConstructor(GroupingElement, "input"),
    "password": primeConstructor(GroupingElement, "input"),
    "radio": primeConstructor(GroupingElement, "input"),
    "range": primeConstructor(GroupingElement, "input"),
    "tel": primeConstructor(GroupingElement, "input"),
    "text": primeConstructor(GroupingElement, "input"),
    "time": primeConstructor(GroupingElement, "input"),
    "url": primeConstructor(GroupingElement, "input"),
    "week": primeConstructor(GroupingElement, "input"),
    // Table
    "table": primeConstructor(TableElement, "table")
};

/* eslint-disable complexity */
const CSS_SELECTOR = /^(?:(?:#|\.)-?(?:[_a-z]|[\240-\377]|[0-9a-f]{1,6})(?:[_a-z0-9-]|[\240-\377]|[0-9a-f]{1,6})*)+$/i;
const URL_PATHNAME = /(?:[^?#]*)(?:\\?(?:[^#]*))?(?:#(?:.*))?$/i;
function parseSelector(selector) {
    const selectors = {};
    for (const match of selector.split(/(?=#|\.)/)) {
        if (match.startsWith("#")) {
            selectors["id"] = match.substring(1);
        }
        else if (match.startsWith(".")) {
            if (selectors["class"] === undefined) {
                selectors["class"] = match.substring(1);
            }
            else {
                selectors["class"] += " " + match.substring(1);
            }
        }
    }
    return selectors;
}
function createPrimitive(tagName) {
    switch (tagName) {
        /**
         * Anchor
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, href): NodeTagNameMap[NodeTagName]
         * (selector?: string, textContent?: string, href: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, textContent?: string, href?: string, attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "a":
            return function (selector, textContent, href, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    textContent = selector;
                }
                // textContent
                if (textContent !== undefined && ((typeof textContent === "string") || (typeof textContent === "object" && textContent instanceof Element))) {
                    textContent = [textContent];
                }
                else if (textContent !== undefined && Array.isArray(textContent)) ;
                else {
                    href = textContent;
                    textContent = undefined;
                }
                // href
                if (href !== undefined && typeof href === "string" && URL_PATHNAME.test(href)) {
                    attributes.href = href;
                    if (textContent === undefined) {
                        textContent = [href];
                    }
                }
                else if (href !== undefined && typeof href === "object") {
                    attributes = Object.assign(Object.assign({}, attributes), href);
                    href = [];
                }
                // attributes
                return ElementTagNameMap[tagName](textContent, attributes);
            };
        /**
         * Details
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, summary: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, summary?: string, children: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         * (selector?: string, summary?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "details":
            return function (selector, summary, children = [], attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    summary = selector;
                }
                // summary
                if (summary !== undefined && typeof summary === "string") ;
                else {
                    children = summary;
                }
                // children
                if (children !== undefined && ((typeof children === "string") || (typeof children === "object" && children instanceof Element))) {
                    children = [children];
                }
                else if (children !== undefined && Array.isArray(children)) ;
                else if (children !== undefined && typeof children === "object" && children instanceof Element) {
                    attributes = Object.assign(Object.assign({}, attributes), children);
                    children = [];
                }
                // attributes
                return ElementTagNameMap[tagName](summary, children, attributes);
            };
        /**
         * Form
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, method: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, method?: string, action: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, method?: string, action?: string, encoding: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, method?: string, action?: string, encoding?: string, children: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         * (selector?: string, method?: string, action?: string, encoding?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "form":
            return function (selector, method, action, encoding, children = [], attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    method = selector;
                }
                // method
                if (method !== undefined && typeof method === "string" && /^post|get|dialog$/i.test(method)) {
                    attributes.method = method;
                }
                else {
                    action = method;
                }
                // action
                if (action !== undefined && typeof action === "string" && URL_PATHNAME.test(action)) {
                    attributes.action = action;
                }
                else {
                    action = encoding;
                }
                // encoding
                if (encoding !== undefined && typeof encoding === "string" && /^application\/x-www-form-urlencoded|multipart\/form-data|text\/plain$/i.test(encoding)) {
                    attributes.enctype = action;
                }
                else if (encoding !== undefined && typeof encoding === "object") {
                    attributes = Object.assign(Object.assign({}, attributes), encoding);
                }
                // children
                if (children !== undefined && ((typeof children === "string") || (typeof children === "object" && children instanceof Element))) {
                    children = [children];
                }
                else if (children !== undefined && Array.isArray(children)) ;
                else if (children !== undefined && typeof children === "object" && children instanceof Element) {
                    attributes = Object.assign(Object.assign({}, attributes), children);
                    children = [];
                }
                // attributes
                return ElementTagNameMap[tagName](children, attributes);
            };
        /**
         * Form-associated/Grouping/Text-level
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, children: Node | (string | Node)[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         * (selector?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "article":
        case "aside":
        case "b":
        case "blockquote":
        case "br":
        case "button":
        case "button[type=button]":
            if (tagName === "button[type=button]") {
                tagName = "button";
            }
        case "reset":
        case "button[type=reset]":
            if (tagName === "button[type=reset]") {
                tagName = "reset";
            }
        case "submit":
        case "button[type=submit]":
            if (tagName === "button[type=submit]") {
                tagName = "submit";
            }
        case "canvas":
        case "code":
        case "del":
        case "div":
        case "em":
        case "footer":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
        case "header":
        case "hr":
        case "i":
        case "ins":
        case "kbd":
        case "li":
        case "main":
        case "mark":
        case "meter":
        case "nav":
        case "ol":
        case "p":
        case "pre":
        case "progress":
        case "q":
        case "s":
        case "section":
        case "small":
        case "span":
        case "strong":
        case "sub":
        case "sup":
        case "textarea":
        case "u":
        case "ul":
            return function (selector, children = [], attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    // eslint-disable-next-line no-lonely-if
                    if (selector !== undefined && Array.isArray(selector)) {
                        children = selector;
                    }
                    else if (selector !== undefined && typeof selector === "string") {
                        children = [selector];
                    }
                }
                // children
                if (children !== undefined && ((typeof children === "string") || (typeof children === "object" && children instanceof Element))) {
                    children = [children];
                }
                else if (children !== undefined && Array.isArray(children)) ;
                else if (children !== undefined && typeof children === "object" && children instanceof Element) {
                    attributes = Object.assign(Object.assign({}, attributes), children);
                    children = [];
                }
                // attributes
                return ElementTagNameMap[tagName](children, attributes);
            };
        /**
         * Embedded
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, sources: string | string[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, sources?: string | string[], attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "audio":
        case "img":
        case "picture":
        case "video":
            return function (selector, sources = [], attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    // eslint-disable-next-line no-lonely-if
                    if (selector !== undefined && Array.isArray(selector)) {
                        sources = selector;
                    }
                    else if (selector !== undefined && typeof selector === "string") {
                        sources = [selector];
                    }
                }
                // sources
                if (sources !== undefined && Array.isArray(sources)) ;
                else if (sources !== undefined && typeof sources === "object") {
                    attributes = Object.assign(Object.assign({}, attributes), sources);
                    sources = [];
                }
                // attributes
                return ElementTagNameMap[tagName](sources, attributes);
            };
        /**
         * Field Set
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, legend: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, legend?: string, children: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         * (selector?: string, legend?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "fieldset":
            return function (selector, legend, children = [], attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    legend = selector;
                }
                // legend
                if (legend !== undefined && typeof legend === "string") ;
                else {
                    children = legend;
                }
                // children
                if (children !== undefined && ((typeof children === "string") || (typeof children === "object" && children instanceof Element))) {
                    children = [children];
                }
                else if (children !== undefined && Array.isArray(children)) ;
                else if (children !== undefined && typeof children === "object" && children instanceof Element) {
                    attributes = Object.assign(Object.assign({}, attributes), children);
                }
                // attributes
                return ElementTagNameMap[tagName](legend, children, attributes);
            };
        /**
         * Figure
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector): NodeTagNameMap[NodeTagName]
         * (selector?: string, figcaption: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, figcaption?: string, children: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         * (selector?: string, figcaption?: string, children?: Node | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "figure":
            return function (selector, figcaption, children = [], attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    figcaption = selector;
                }
                // figcaption
                if (figcaption !== undefined && typeof figcaption === "string") ;
                else if (typeof figcaption === "object") {
                    attributes = Object.assign(Object.assign({}, attributes), figcaption);
                }
                // children
                if (children !== undefined && ((typeof children === "string") || (typeof children === "object" && children instanceof Element))) {
                    children = [children];
                }
                else if (children !== undefined && Array.isArray(children)) ;
                else if (children !== undefined && typeof children === "object" && children instanceof Element) {
                    attributes = Object.assign(Object.assign({}, attributes), children);
                }
                // attributes
                return ElementTagNameMap[tagName](figcaption, children, attributes);
            };
        /**
         * File
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, accept: string | string[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, accept?: string | string[], required: boolean): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, accept?: string | string[], required?: boolean, attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "file":
            return function (selector, name, accept, required, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                    if (attributes.id !== undefined) {
                        attributes.name = attributes.id;
                    }
                }
                else {
                    name = selector;
                }
                // name
                if (name !== undefined && typeof name === "string") {
                    if (/\w+/i.test(name)) {
                        attributes.name = name;
                    }
                    else if (name.startsWith(".") || name.includes("/")) {
                        accept = name;
                    }
                }
                else if (typeof name === "boolean") {
                    required = name;
                }
                // accept
                if (accept !== undefined && typeof accept === "string") {
                    attributes.accept = accept;
                }
                else {
                    required = accept;
                }
                // required
                if (required !== undefined && typeof required === "boolean") {
                    attributes.required = required;
                }
                // attributes
                return ElementTagNameMap[tagName](Object.assign(Object.assign({}, attributes), { "type": tagName }));
            };
        /**
         * IFrame
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, source: string[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, source?: string[], attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "iframe":
            return function (selector, source, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    source = selector;
                }
                // source
                if (source !== undefined && typeof source === "string" && URL_PATHNAME.test(source)) {
                    attributes.src = source;
                }
                else if (source !== undefined && typeof source === "object") {
                    attributes = Object.assign(Object.assign({}, attributes), source);
                }
                // attributes
                return ElementTagNameMap[tagName]([], attributes);
            };
        /**
         * Input
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, value: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, value?: string, required: boolean): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, value?: string, required?: boolean, attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "checkbox":
        case "color":
        case "date":
        case "datetime":
            if (tagName === "datetime") {
                tagName = "datetime-local";
            }
        case "datetime-local":
        case "email":
        case "hidden":
        case "month":
        case "number":
        case "password":
        case "radio":
        case "range":
        case "tel":
        case "text":
        case "time":
        case "url":
        case "week":
            return function (selector, name, value, required, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                    if (attributes.id !== undefined) {
                        attributes.name = attributes.id;
                    }
                }
                else {
                    name = selector;
                }
                // name
                if (name !== undefined && typeof name === "string" && typeof value !== "string") {
                    attributes.name = name;
                }
                else if (typeof name === "boolean") {
                    value = name;
                }
                // value
                if (value !== undefined && typeof value === "string" || !isNaN(Number(value))) {
                    attributes.value = value;
                }
                else {
                    required = value;
                }
                // required
                if (required !== undefined && typeof required === "boolean") {
                    attributes.required = required;
                }
                // attributes
                return ElementTagNameMap[tagName](Object.assign(Object.assign({}, attributes), { "type": tagName }));
            };
        /**
         * Label
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector): NodeTagNameMap[NodeTagName]
         * (selector?, forValue: string, textContent: string | (string | Node)[]): NodeTagNameMap[NodeTagName]
         * (selector?, forValue?: string, textContent?: string | (string | Node)[], attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "label":
            return function (selector, forValue, textContent = [], attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    forValue = selector;
                    textContent = forValue;
                }
                // children
                if (textContent !== undefined && ((typeof textContent === "string") || (typeof textContent === "object" && textContent instanceof Element))) {
                    textContent = [textContent];
                }
                else if (textContent !== undefined && Array.isArray(textContent)) ;
                else if (textContent !== undefined && typeof textContent === "object") {
                    attributes = Object.assign(Object.assign({}, attributes), textContent);
                    textContent = [];
                }
                // attributes
                return ElementTagNameMap[tagName](textContent, attributes);
            };
        /**
         * Search
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, value: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, value?: string, attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "search":
            return function (selector, value, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    value = selector;
                }
                // value
                if (value !== undefined && typeof value === "string") {
                    attributes.value = value;
                }
                else if (value !== undefined && typeof value === "object") {
                    attributes = Object.assign(Object.assign({}, attributes), value);
                }
                // attributes
                return ElementTagNameMap[tagName](Object.assign(Object.assign({}, attributes), { "type": tagName }));
            };
        /**
         * Select
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector: string, name: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, options: object[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, options?: object[], required: boolean): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, options?: object[], required?: boolean, attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "select":
            return function (selector, name, options, required, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    options = selector;
                }
                // name
                if (name !== undefined && typeof name === "string" && typeof options !== "string") {
                    attributes.name = name;
                }
                else if (Array.isArray(name)) {
                    options = name;
                }
                // options
                if (options !== undefined && Array.isArray(options)) ;
                else if (typeof options === "boolean") {
                    required = options;
                }
                // required
                if (required !== undefined && typeof required === "boolean") {
                    attributes.required = required;
                }
                // attributes
                return ElementTagNameMap[tagName](options, Object.assign(Object.assign({}, attributes), { "type": tagName }));
            };
        /**
         * Table
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, caption: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, caption?: string, tableHeader: string[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, caption?: string, tableHeader: string[], attributes: object): NodeTagNameMap[NodeTagName]
         */
        case "table":
            return function (selector, caption, tableHeader = [], attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    attributes = Object.assign(Object.assign({}, attributes), parseSelector(selector));
                }
                else {
                    caption = selector;
                }
                // caption
                if (caption !== undefined && typeof caption === "string") ;
                else if (caption !== undefined && Array.isArray(caption)) {
                    tableHeader = caption;
                }
                // tableHeader
                if (tableHeader !== undefined && Array.isArray(tableHeader)) ;
                else if (tableHeader !== undefined && typeof tableHeader === "object") {
                    attributes = Object.assign(Object.assign({}, attributes), tableHeader);
                }
                // attributes
                return ElementTagNameMap[tagName](caption, tableHeader, attributes);
            };
        default:
            throw new Error("Unrecognized element `" + tagName + "`.");
    }
}
const a = createPrimitive("a");
const article = createPrimitive("article");
const aside = createPrimitive("aside");
const audio = createPrimitive("audio");
const b = createPrimitive("b");
const blockquote = createPrimitive("blockquote");
const br = createPrimitive("br");
const button = createPrimitive("button");
const canvas = createPrimitive("canvas");
const checkbox = createPrimitive("checkbox");
const code = createPrimitive("code");
const color = createPrimitive("color");
const date = createPrimitive("date");
const datetime = createPrimitive("datetime-local");
const del = createPrimitive("del");
const details = createPrimitive("details");
const div = createPrimitive("div");
const em = createPrimitive("em");
const email = createPrimitive("email");
const fieldset = createPrimitive("fieldset");
const figure = createPrimitive("figure");
const file = createPrimitive("file");
const footer = createPrimitive("footer");
const form = createPrimitive("form");
const h1 = createPrimitive("h1");
const h2 = createPrimitive("h2");
const h3 = createPrimitive("h3");
const h4 = createPrimitive("h4");
const h5 = createPrimitive("h5");
const h6 = createPrimitive("h6");
const header = createPrimitive("header");
const hidden = createPrimitive("hidden");
const hr = createPrimitive("hr");
const i = createPrimitive("i");
const iframe = createPrimitive("iframe");
const img = createPrimitive("img");
const ins = createPrimitive("ins");
const kbd = createPrimitive("kbd");
const label = createPrimitive("label");
const li = createPrimitive("li");
const main = createPrimitive("main");
const mark = createPrimitive("mark");
const meter = createPrimitive("meter");
const month = createPrimitive("month");
const nav = createPrimitive("nav");
const number = createPrimitive("number");
const ol = createPrimitive("ol");
const p = createPrimitive("p");
const password = createPrimitive("password");
const picture = createPrimitive("picture");
const pre = createPrimitive("pre");
const progress = createPrimitive("progress");
const q = createPrimitive("q");
const radio = createPrimitive("radio");
const range = createPrimitive("range");
const reset = createPrimitive("reset");
const s = createPrimitive("s");
const search = createPrimitive("search");
const section = createPrimitive("section");
const select = createPrimitive("select");
const small = createPrimitive("small");
const span = createPrimitive("span");
const strong = createPrimitive("strong");
const sub = createPrimitive("sub");
const submit = createPrimitive("submit");
const sup = createPrimitive("sup");
const table = createPrimitive("table");
const tel = createPrimitive("tel");
const text = createPrimitive("text");
const textarea = createPrimitive("textarea");
const time = createPrimitive("time");
const u = createPrimitive("u");
const ul = createPrimitive("ul");
const url = createPrimitive("url");
const video = createPrimitive("video");
const week = createPrimitive("week");
globalThis.a = a;
globalThis.article = article;
globalThis.aside = aside;
globalThis.audio = audio;
globalThis.b = b;
globalThis.blockquote = blockquote;
globalThis.br = br;
globalThis.button = button;
globalThis.canvas = canvas;
globalThis.checkbox = checkbox;
globalThis.code = code;
globalThis.color = color;
globalThis.date = date;
globalThis.datetime = datetime;
globalThis.del = del;
globalThis.details = details;
globalThis.div = div;
globalThis.em = em;
globalThis.email = email;
globalThis.fieldset = fieldset;
globalThis.figure = figure;
globalThis.file = file;
globalThis.footer = footer;
globalThis.form = form;
globalThis.h1 = h1;
globalThis.h2 = h2;
globalThis.h3 = h3;
globalThis.h4 = h4;
globalThis.h5 = h5;
globalThis.h6 = h6;
globalThis.header = header;
globalThis.hidden = hidden;
globalThis.hr = hr;
globalThis.i = i;
globalThis.iframe = iframe;
globalThis.img = img;
globalThis.ins = ins;
globalThis.kbd = kbd;
globalThis.label = label;
globalThis.li = li;
globalThis.main = main;
globalThis.mark = mark;
globalThis.meter = meter;
globalThis.month = month;
globalThis.nav = nav;
globalThis.number = number;
globalThis.ol = ol;
globalThis.p = p;
globalThis.password = password;
globalThis.picture = picture;
globalThis.pre = pre;
globalThis.progress = progress;
globalThis.q = q;
globalThis.radio = radio;
globalThis.range = range;
globalThis.reset = reset;
globalThis.s = s;
globalThis.search = search;
globalThis.section = section;
globalThis.select = select;
globalThis.small = small;
globalThis.span = span;
globalThis.strong = strong;
globalThis.sub = sub;
globalThis.submit = submit;
globalThis.sup = sup;
globalThis.table = table;
globalThis.tel = tel;
globalThis.text = text;
globalThis.textarea = textarea;
globalThis.time = time;
globalThis.u = u;
globalThis.ul = ul;
globalThis.url = url;
globalThis.video = video;
globalThis.week = week;
function createTemplate(tagName, options) {
    if (!tagName.includes("-")) {
        tagName += "-component";
    }
    customElements.define(tagName, class extends HTMLElement {
        constructor() {
            super();
            this.events = {};
        }
        on(event, listener) {
            if (this.events[event] === undefined) {
                this.events[event] = [];
            }
            this.events[event].push(listener);
            return listener;
        }
        off(event, listener) {
            if (event === undefined && listener === undefined) {
                this.events = {};
            }
            else if (listener === undefined) {
                delete this.events[event];
            }
            else if (this.events[event].indexOf(listener) !== -1) {
                this.events[event].splice(this.events[event].indexOf(listener), 1);
            }
        }
        emit(event, ...args) {
            if (this.events[event] !== undefined) {
                for (const listener of this.events[event]) {
                    listener(...args);
                }
            }
            if (event !== "*") {
                this.emit("*", ...args);
            }
        }
        once(event, listener) {
            return this.on(event, () => {
                this.emit(event);
                this.off(event, listener);
            });
        }
        /**
         * Invoked each time the custom element is appended into a document-connected element. This
         * will happen each time the node is moved, and may happen before the element's contents
         * have been fully parsed.
         */
        connectedCallback() {
        }
        /**
         * Invoked each time the custom element is disconnected from the document's DOM.
         */
        disconnectedCallback() {
        }
        /**
         * Invoked each time the custom element is moved to a new document.
         */
        adoptedCallback() {
        }
        /**
         * Invoked each time one of the custom element's attributes is added, removed, or changed.
         * Which attributes to notice change for is specified in a static get `observedAttributes`
         * method.
         */
        attributeChangedCallback() {
        }
    }, options);
    return function (...args) {
        return new (customElements.get(tagName))(...args);
    };
}
globalThis.createTemplate = createTemplate;

//export { a, article, aside, audio, b, blockquote, br, button, canvas, checkbox, code, color, createTemplate, date, datetime, del, details, div, em, email, fieldset, figure, file, footer, form, h1, h2, h3, h4, h5, h6, header, hidden, hr, i, iframe, img, ins, kbd, label, li, main, mark, meter, month, nav, number, ol, p, password, picture, pre, progress, q, radio, range, reset, s, search, section, select, small, span, strong, sub, submit, sup, table, tel, text, textarea, time, u, ul, url, video, week };
