class EventEmitter {
    constructor() {
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
}

class Node extends EventEmitter {
    constructor(type) {
        super();
        this.attributes = {};
        this.children = [];
        this.type = type;
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

class AnchorNode extends Node {
    constructor(tagName, textContent, href, extras) {
        super(tagName);
        this.textContent = textContent;
        this.attributes.href = href;
        this.attributes = Object.assign(Object.assign({}, extras), this.attributes);
    }
    get fragment() {
        this.cachedFragment = document.createDocumentFragment();
        const anchorNode = document.createElement(this.type);
        anchorNode.textContent = this.textContent;
        for (const [key, value] of Object.entries(this.attributes)) {
            anchorNode.setAttribute(key, String(value));
        }
        this.cachedFragment.appendChild(anchorNode);
        return this.cachedFragment;
    }
}

// <summary> should be part of a <details>
class DetailsNode extends Node {
    constructor(tagName, summary, extras) {
        super(tagName);
        this.summary = summary;
        this.attributes = Object.assign(Object.assign({}, extras), this.attributes);
    }
    get fragment() {
        this.cachedFragment = document.createDocumentFragment();
        const detailsNode = document.createElement(this.type);
        if (this.summary !== undefined) {
            const summary = document.createElement("summary");
            summary.innerHTML = this.summary;
            detailsNode.append(summary);
        }
        for (const [key, value] of Object.entries(this.attributes)) {
            detailsNode.setAttribute(key, String(value));
        }
        this.cachedFragment.appendChild(detailsNode);
        return this.cachedFragment;
    }
}

// <source> should be a part of a <picture>, <audio> or <video>
// <track> should be a part of a <audio> or <video>
class EmbeddedNode extends Node {
    constructor(tagName, sources, extras) {
        super(tagName);
        this.sources = sources;
        this.attributes = Object.assign(Object.assign({}, extras), this.attributes);
    }
    get fragment() {
        this.cachedFragment = document.createDocumentFragment();
        const embeddedNode = document.createElement(this.type);
        if (/^audio|picture|video$/i.test(this.type)) {
            // TODO: Handle type
            for (const source of this.sources) {
                const sourceNode = document.createElement("source");
                sourceNode.setAttribute("src", source);
                embeddedNode.append(sourceNode);
            }
        }
        else {
            // TODO: Handle multiple `src`s
            embeddedNode.setAttribute("src", this.sources[0]);
        }
        for (const [key, value] of Object.entries(this.attributes)) {
            embeddedNode.setAttribute(key, String(value));
        }
        this.cachedFragment.appendChild(embeddedNode);
        return this.cachedFragment;
    }
}

// <legend> should be part of a <fieldset>
class FieldSetNode extends Node {
    constructor(tagName, legend, extras) {
        super(tagName);
        this.legend = legend;
        this.attributes = Object.assign(Object.assign({}, extras), this.attributes);
    }
    get fragment() {
        this.cachedFragment = document.createDocumentFragment();
        const fieldSetNode = document.createElement(this.type);
        if (this.legend !== undefined) {
            const legend = document.createElement("legend");
            legend.innerHTML = this.legend;
            fieldSetNode.append(legend);
        }
        for (const [key, value] of Object.entries(this.attributes)) {
            fieldSetNode.setAttribute(key, String(value));
        }
        this.cachedFragment.appendChild(fieldSetNode);
        return this.cachedFragment;
    }
}

// <figcaption> should be part of a <figure>
class FigureNode extends Node {
    constructor(tagName, caption, extras) {
        super(tagName);
        this.caption = caption;
        this.attributes = Object.assign(Object.assign({}, extras), this.attributes);
    }
    get fragment() {
        this.cachedFragment = document.createDocumentFragment();
        const figureNode = document.createElement(this.type);
        if (this.caption !== undefined) {
            const caption = document.createElement("caption");
            caption.innerHTML = this.caption;
            figureNode.append(caption);
        }
        for (const [key, value] of Object.entries(this.attributes)) {
            figureNode.setAttribute(key, String(value));
        }
        this.cachedFragment.appendChild(figureNode);
        return this.cachedFragment;
    }
}

class GroupingNode extends Node {
    constructor(tagName, extras) {
        super(tagName);
        this.attributes = Object.assign(Object.assign({}, extras), this.attributes);
    }
    get fragment() {
        this.cachedFragment = document.createDocumentFragment();
        const groupingNode = document.createElement(this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            groupingNode.setAttribute(key, String(value));
        }
        this.cachedFragment.appendChild(groupingNode);
        return this.cachedFragment;
    }
}

// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>
class SelectNode extends Node {
    constructor(tagName, options, extras) {
        super(tagName);
        this.options = options;
        this.attributes = Object.assign(Object.assign({}, extras), this.attributes);
    }
    get fragment() {
        // TODO
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
class TableNode extends Node {
    constructor(tagName, caption, extras) {
        super(tagName);
        this.caption = caption;
        this.attributes = Object.assign(Object.assign({}, extras), this.attributes);
    }
    get fragment() {
        this.cachedFragment = document.createDocumentFragment();
        const tableNode = document.createElement(this.type);
        if (this.caption !== undefined) {
            const caption = document.createElement("caption");
            caption.innerHTML = this.caption;
            tableNode.append(caption);
        }
        tableNode.append(document.createElement("thead"));
        tableNode.append(document.createElement("tbody"));
        tableNode.append(document.createElement("tfoot"));
        for (const [key, value] of Object.entries(this.attributes)) {
            tableNode.setAttribute(key, String(value));
        }
        this.cachedFragment.appendChild(tableNode);
        return this.cachedFragment;
    }
}

class TextLevelNode extends Node {
    constructor(tagName, textContent, extras) {
        super(tagName);
        this.textContent = textContent;
        this.attributes = Object.assign(Object.assign({}, extras), this.attributes);
    }
    get fragment() {
        this.cachedFragment = document.createDocumentFragment();
        const textLevelNode = document.createElement(this.type);
        textLevelNode.innerHTML = this.textContent;
        for (const [key, value] of Object.entries(this.attributes)) {
            textLevelNode.setAttribute(key, String(value));
        }
        this.cachedFragment.appendChild(textLevelNode);
        return this.cachedFragment;
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
function primeConstructor(Node, type) {
    return function (...args) {
        return new Node(type, ...args);
    };
}
const NodeTagNameMap = {
    // Text-Level
    "b": primeConstructor(TextLevelNode, "b"),
    "blockquote": primeConstructor(TextLevelNode, "blockquote"),
    "code": primeConstructor(TextLevelNode, "code"),
    "del": primeConstructor(TextLevelNode, "del"),
    "em": primeConstructor(TextLevelNode, "em"),
    "h1": primeConstructor(TextLevelNode, "h1"),
    "h2": primeConstructor(TextLevelNode, "h2"),
    "h3": primeConstructor(TextLevelNode, "h3"),
    "h4": primeConstructor(TextLevelNode, "h4"),
    "h5": primeConstructor(TextLevelNode, "h5"),
    "h6": primeConstructor(TextLevelNode, "h6"),
    "i": primeConstructor(TextLevelNode, "i"),
    "ins": primeConstructor(TextLevelNode, "ins"),
    "kbd": primeConstructor(TextLevelNode, "kbd"),
    "label": primeConstructor(TextLevelNode, "label"),
    "li": primeConstructor(TextLevelNode, "li"),
    "mark": primeConstructor(TextLevelNode, "mark"),
    "p": primeConstructor(TextLevelNode, "p"),
    "pre": primeConstructor(TextLevelNode, "pre"),
    "q": primeConstructor(TextLevelNode, "q"),
    "s": primeConstructor(TextLevelNode, "s"),
    "small": primeConstructor(TextLevelNode, "small"),
    "span": primeConstructor(TextLevelNode, "span"),
    "strong": primeConstructor(TextLevelNode, "strong"),
    "sub": primeConstructor(TextLevelNode, "sub"),
    "sup": primeConstructor(TextLevelNode, "sup"),
    "u": primeConstructor(TextLevelNode, "u"),
    // Embedded
    "audio": primeConstructor(EmbeddedNode, "audio"),
    "img": primeConstructor(EmbeddedNode, "img"),
    "picture": primeConstructor(EmbeddedNode, "picture"),
    "video": primeConstructor(EmbeddedNode, "video"),
    // Grouping
    "article": primeConstructor(GroupingNode, "article"),
    "aside": primeConstructor(GroupingNode, "aside"),
    "br": primeConstructor(GroupingNode, "br"),
    "canvas": primeConstructor(GroupingNode, "canvas"),
    "div": primeConstructor(GroupingNode, "div"),
    "footer": primeConstructor(GroupingNode, "footer"),
    "header": primeConstructor(GroupingNode, "header"),
    "hr": primeConstructor(GroupingNode, "hr"),
    "main": primeConstructor(GroupingNode, "main"),
    "nav": primeConstructor(GroupingNode, "nav"),
    "ol": primeConstructor(GroupingNode, "ol"),
    "section": primeConstructor(GroupingNode, "section"),
    "ul": primeConstructor(GroupingNode, "ul"),
    // Form-associated
    "form": primeConstructor(GroupingNode, "form"),
    "meter": primeConstructor(GroupingNode, "meter"),
    "progress": primeConstructor(GroupingNode, "progress"),
    "textarea": primeConstructor(GroupingNode, "textarea"),
    // IFrame
    "iframe": primeConstructor(GroupingNode, "iframe"),
    // FieldSet
    "fieldset": primeConstructor(FieldSetNode, "fieldset"),
    // Button-like
    "button": primeConstructor(GroupingNode, "button"),
    "inputButton": primeConstructor(GroupingNode, "input"),
    "reset": primeConstructor(GroupingNode, "button"),
    "inputReset": primeConstructor(GroupingNode, "input"),
    "submit": primeConstructor(GroupingNode, "button"),
    "inputSubmit": primeConstructor(GroupingNode, "input"),
    "search": primeConstructor(GroupingNode, "input"),
    // File
    "file": primeConstructor(GroupingNode, "input"),
    // Input
    "checkbox": primeConstructor(GroupingNode, "input"),
    "color": primeConstructor(GroupingNode, "input"),
    "date": primeConstructor(GroupingNode, "input"),
    "datetime": primeConstructor(GroupingNode, "input"),
    "email": primeConstructor(GroupingNode, "input"),
    "hidden": primeConstructor(GroupingNode, "input"),
    "image": primeConstructor(GroupingNode, "input"),
    "month": primeConstructor(GroupingNode, "input"),
    "number": primeConstructor(GroupingNode, "input"),
    "password": primeConstructor(GroupingNode, "input"),
    "radio": primeConstructor(GroupingNode, "input"),
    "range": primeConstructor(GroupingNode, "input"),
    "tel": primeConstructor(GroupingNode, "input"),
    "text": primeConstructor(GroupingNode, "input"),
    "time": primeConstructor(GroupingNode, "input"),
    "url": primeConstructor(GroupingNode, "input"),
    "week": primeConstructor(GroupingNode, "input"),
    // Select
    "select": primeConstructor(SelectNode, "select"),
    // Figure
    "figure": primeConstructor(FigureNode, "figure"),
    // Details
    "details": primeConstructor(DetailsNode, "details"),
    // Table
    "table": primeConstructor(TableNode, "table"),
    // Anchor
    "a": primeConstructor(AnchorNode, "a")
};

// SOURCE: https://www.w3.org/TR/selectors-3/#lex
const CSS_SELECTOR = /^(?:#|\.)-?(?:[_a-z]|[\240-\377]|[0-9a-f]{1,6})(?:[_a-z0-9-]|[\240-\377]|[0-9a-f]{1,6})*$/i;
// SOURCE: https://tools.ietf.org/html/rfc3986#appendix-B
const URL_PATHNAME = /(?:[^?#]*)(?:\\?(?:[^#]*))?(?:#(?:.*))?$/i;
// eslint-disable-next-line complexity
function createPrimitive(tagName) {
    switch (tagName) {
        /**
         * Text-level
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, textContent: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, textContent?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "b":
        case "blockquote":
        case "code":
        case "del":
        case "em":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
        case "i":
        case "ins":
        case "kbd":
        case "li":
        case "mark":
        case "p":
        case "pre":
        case "q":
        case "s":
        case "small":
        case "span":
        case "strong":
        case "sub":
        case "sup":
        case "u":
            return function (selectors, textContent, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    textContent = selectors;
                }
                // textContent
                if (textContent !== undefined && typeof textContent !== "object") {
                    return NodeTagNameMap[tagName](textContent, extras);
                }
                else if (typeof textContent === "object") {
                    extras = Object.assign(Object.assign({}, textContent), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * Label
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors): NodeTagNameMap[NodeTagName]
         * (selectors?, for, textContent): NodeTagNameMap[NodeTagName]
         * (selectors?, for, textContent, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "label":
            return function (selectors, forValue, textContent, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    forValue = selectors;
                    textContent = forValue;
                }
                // extras
                return NodeTagNameMap[tagName](forValue, textContent, extras);
            };
        /**
         * Embedded
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, sources: string | string[]): NodeTagNameMap[NodeTagName]
         * (selectors?: string, sources?: string | string[], extras: object): NodeTagNameMap[NodeTagName]
         */
        case "audio":
        case "img":
        case "picture":
        case "video":
            return function (selectors, sources, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    // eslint-disable-next-line no-lonely-if
                    if (Array.isArray(sources)) {
                        sources = selectors;
                    }
                    else if (typeof selectors === "string") {
                        sources = [selectors];
                    }
                }
                // sources
                if (sources !== undefined && Array.isArray(sources)) {
                    return NodeTagNameMap[tagName](sources, extras);
                }
                else if (typeof sources === "object") {
                    extras = Object.assign(Object.assign({}, sources), extras);
                }
                // extras
                return NodeTagNameMap[tagName](undefined, extras);
            };
        /**
         * Grouping (+Sectioning/Form-associated)
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "article":
        case "aside":
        case "br":
        case "canvas":
        case "div":
        case "footer":
        case "header":
        case "hr":
        case "main":
        case "meter":
        case "nav":
        case "ol":
        case "progress":
        case "section":
        case "textarea":
        case "ul":
            return function (selectors, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else if (typeof selectors === "object") {
                    extras = Object.assign(Object.assign({}, selectors), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * IFrame, Image
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, source: string[]): NodeTagNameMap[NodeTagName]
         * (selectors?: string, source?: string[], extras: object): NodeTagNameMap[NodeTagName]
         */
        case "iframe":
        case "image":
            return function (selectors, source, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    source = selectors;
                }
                // source
                if (typeof source === "string" && URL_PATHNAME.test(source)) {
                    extras.src = source;
                }
                else if (typeof source === "object") {
                    extras = Object.assign(Object.assign({}, source), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * Field Set
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, legend: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, legend?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "fieldset":
            return function (selectors, legend, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    legend = selectors;
                }
                // source
                if (typeof legend === "string") {
                    return NodeTagNameMap[tagName](legend, extras);
                }
                else {
                    extras = Object.assign(Object.assign({}, legend), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * Form
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, method: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, method?: string, action: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, method?: string, action?: string, encoding: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, method?: string, action?: string, encoding?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "form":
            return function (selectors, method, action, encoding, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    method = selectors;
                }
                // method
                if (method !== undefined && typeof method === "string" && /^post|get|dialog$/i.test(method)) {
                    extras.method = method;
                }
                else {
                    action = method;
                }
                // action
                if (action !== undefined && typeof action === "string" && URL_PATHNAME.test(action)) {
                    extras.action = action;
                }
                else {
                    action = encoding;
                }
                // encoding
                if (encoding !== undefined && typeof encoding === "string" && /^application\/x-www-form-urlencoded|multipart\/form-data|text\/plain$/i.test(encoding)) {
                    extras.enctype = action;
                }
                else if (typeof encoding === "object") {
                    extras = Object.assign(Object.assign({}, encoding), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * Button-like
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, value: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, value?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "button[type=button]":
            if (tagName === "button[type=button]") {
                tagName = "button";
            }
        case "button[type=reset]":
            if (tagName === "button[type=reset]") {
                tagName = "reset";
            }
        case "button":
        case "button[type=submit]":
            if (tagName === "button[type=submit]") {
                tagName = "submit";
            }
        case "submit":
        case "input[type=button]":
            if (tagName === "input[type=button]") {
                tagName = "inputButton";
            }
        case "input[type=reset]":
            if (tagName === "input[type=reset]") {
                tagName = "inputReset";
            }
        case "reset":
        case "input[type=submit]":
            if (tagName === "input[type=submit]") {
                tagName = "inputSubmit";
            }
        case "search":
            return function (selectors, value, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    value = selectors;
                }
                // value
                if (value !== undefined && Array.isArray(value)) {
                    return NodeTagNameMap[tagName](value, extras);
                }
                else if (typeof value === "object") {
                    extras = Object.assign(Object.assign({}, value), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * File
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, name: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, name?: string, accept: string | string[]): NodeTagNameMap[NodeTagName]
         * (selectors?: string, name?: string, accept?: string | string[], required: boolean): NodeTagNameMap[NodeTagName]
         * (selectors?: string, name?: string, accept?: string | string[], required?: boolean, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "file":
            return function (selectors, name, accept, required, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                    if (extras.id !== undefined) {
                        extras.name = extras.id;
                    }
                }
                else {
                    name = selectors;
                }
                // name
                if (name !== undefined && typeof name === "string") {
                    if (/\w+/i.test(name)) {
                        extras.name = name;
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
                    extras.accept = accept;
                }
                else {
                    required = accept;
                }
                // required
                if (required !== undefined && typeof required === "boolean") {
                    extras.required = required;
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * Input
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, name: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, name?: string, value: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, name?: string, value?: string, required: boolean): NodeTagNameMap[NodeTagName]
         * (selectors?: string, name?: string, value?: string, required?: boolean, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "checkbox":
        case "color":
        case "date":
        case "datetime":
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
            return function (selectors, name, value, required, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                    if (extras.id !== undefined) {
                        extras.name = extras.id;
                    }
                }
                else {
                    name = selectors;
                }
                // name
                if (name !== undefined && typeof name === "string" && typeof value !== "string") {
                    extras.name = name;
                }
                else if (typeof name === "boolean") {
                    value = name;
                }
                // value
                if (value !== undefined && typeof value === "string") {
                    extras.value = value;
                }
                else {
                    required = value;
                }
                // required
                if (required !== undefined && typeof required === "boolean") {
                    extras.required = required;
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * Select
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, options: object[]): NodeTagNameMap[NodeTagName]
         * (selectors?: string, options?: object[], extras: object): NodeTagNameMap[NodeTagName]
         */
        case "select":
            return function (selectors, options, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    options = selectors;
                }
                // method
                if (options !== undefined && Array.isArray(options)) {
                    return NodeTagNameMap[tagName](extras).push(options);
                }
                else if (typeof options === "object") {
                    extras = Object.assign(Object.assign({}, options), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * Figure
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors): NodeTagNameMap[NodeTagName]
         * (selectors?: string, figcaption: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, figcaption?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "figure":
            return function (selectors, figcaption, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    figcaption = selectors;
                }
                // figcaption
                if (figcaption !== undefined && typeof figcaption === "string") {
                    return NodeTagNameMap[tagName](figcaption, extras);
                }
                else if (typeof figcaption === "object") {
                    extras = Object.assign(Object.assign({}, figcaption), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * Details
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, summary: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, summary?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "details":
            return function (selectors, summary, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                    return NodeTagNameMap[tagName]();
                }
                else {
                    summary = selectors;
                }
                // summary
                if (summary !== undefined && typeof summary === "string") {
                    return NodeTagNameMap[tagName](summary, extras);
                }
                else if (typeof summary === "object") {
                    extras = Object.assign(Object.assign({}, summary), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * Table
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, caption: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, caption?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "table":
            return function (selectors, caption, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    caption = selectors;
                }
                // caption
                if (caption !== undefined && typeof caption === "string") {
                    return NodeTagNameMap[tagName](caption, extras);
                }
                else if (typeof caption === "object") {
                    extras = Object.assign(Object.assign({}, caption), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        /**
         * Anchor
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selectors: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, href): NodeTagNameMap[NodeTagName]
         * (selectors?: string, textContent?: string, href: string): NodeTagNameMap[NodeTagName]
         * (selectors?: string, textContent?: string, href?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "a":
            return function (selectors, textContent, href, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|\./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    textContent = selectors;
                }
                // textContent
                if (textContent !== undefined && typeof textContent === "string") {
                    return NodeTagNameMap[tagName](textContent, href, extras);
                }
                else {
                    href = textContent;
                }
                // href
                if (href !== undefined && typeof href === "string" && URL_PATHNAME.test(href)) {
                    return NodeTagNameMap[tagName](href, href, extras);
                }
                else if (typeof textContent === "object") {
                    extras = Object.assign(Object.assign({}, textContent), extras);
                }
                // extras
                return NodeTagNameMap[tagName](extras);
            };
        default:
            throw new Error("Unrecognized element `" + tagName + "`.");
    }
}
const b = createPrimitive("b");
globalThis.b = b;
const blockquote = createPrimitive("blockquote");
globalThis.blockquote = blockquote;
const code = createPrimitive("code");
globalThis.code = code;
const del = createPrimitive("del");
globalThis.del = del;
const em = createPrimitive("em");
globalThis.em = em;
const h1 = createPrimitive("h1");
globalThis.h1 = h1;
const h2 = createPrimitive("h2");
globalThis.h2 = h2;
const h3 = createPrimitive("h3");
globalThis.h3 = h3;
const h4 = createPrimitive("h4");
globalThis.h4 = h4;
const h5 = createPrimitive("h5");
globalThis.h5 = h5;
const h6 = createPrimitive("h6");
globalThis.h6 = h6;
const i = createPrimitive("i");
globalThis.i = i;
const ins = createPrimitive("ins");
globalThis.ins = ins;
const kbd = createPrimitive("kbd");
globalThis.kbd = kbd;
const li = createPrimitive("li");
globalThis.li = li;
const mark = createPrimitive("mark");
globalThis.mark = mark;
const p = createPrimitive("p");
globalThis.p = p;
const pre = createPrimitive("pre");
globalThis.pre = pre;
const q = createPrimitive("q");
globalThis.q = q;
const s = createPrimitive("s");
globalThis.s = s;
const small = createPrimitive("small");
globalThis.small = small;
const span = createPrimitive("span");
globalThis.span = span;
const strong = createPrimitive("strong");
globalThis.strong = strong;
const sub = createPrimitive("sub");
globalThis.sub = sub;
const sup = createPrimitive("sup");
globalThis.sup = sup;
const u = createPrimitive("u");
globalThis.u = u;
const label = createPrimitive("label");
globalThis.label = label;
const audio = createPrimitive("audio");
globalThis.audio = audio;
const img = createPrimitive("img");
globalThis.img = img;
const picture = createPrimitive("picture");
globalThis.picture = picture;
const video = createPrimitive("video");
globalThis.video = video;
const article = createPrimitive("article");
globalThis.article = article;
const aside = createPrimitive("aside");
globalThis.aside = aside;
const br = createPrimitive("br");
globalThis.br = br;
const canvas = createPrimitive("canvas");
globalThis.canvas = canvas;
const div = createPrimitive("div");
globalThis.div = div;
const footer = createPrimitive("footer");
globalThis.footer = footer;
const header = createPrimitive("header");
globalThis.header = header;
const hr = createPrimitive("hr");
globalThis.hr = hr;
const main = createPrimitive("main");
globalThis.main = main;
const meter = createPrimitive("meter");
globalThis.meter = meter;
const nav = createPrimitive("nav");
globalThis.nav = nav;
const ol = createPrimitive("ol");
globalThis.ol = ol;
const progress = createPrimitive("progress");
globalThis.progress = progress;
const section = createPrimitive("section");
globalThis.section = section;
const textarea = createPrimitive("textarea");
globalThis.textarea = textarea;
const ul = createPrimitive("ul");
globalThis.ul = ul;
const iframe = createPrimitive("iframe");
globalThis.iframe = iframe;
const fieldset = createPrimitive("fieldset");
globalThis.fieldset = fieldset;
const form = createPrimitive("form");
globalThis.form = form;
const button = createPrimitive("button");
globalThis.button = button;
const reset = createPrimitive("reset");
globalThis.reset = reset;
const submit = createPrimitive("submit");
globalThis.submit = submit;
const inputButton = createPrimitive("input[type=button]");
globalThis.inputButton = inputButton;
const inputReset = createPrimitive("input[type=reset]");
globalThis.inputReset = inputReset;
const inputSubmit = createPrimitive("input[type=submit]");
globalThis.inputSubmit = inputSubmit;
const search = createPrimitive("search");
globalThis.search = search;
const file = createPrimitive("file");
globalThis.file = file;
const checkbox = createPrimitive("checkbox");
globalThis.checkbox = checkbox;
const color = createPrimitive("color");
globalThis.color = color;
const date = createPrimitive("date");
globalThis.date = date;
const datetime = createPrimitive("datetime");
globalThis.datetime = datetime;
const email = createPrimitive("email");
globalThis.email = email;
const hidden = createPrimitive("hidden");
globalThis.hidden = hidden;
const month = createPrimitive("month");
globalThis.month = month;
const number = createPrimitive("number");
globalThis.number = number;
const password = createPrimitive("password");
globalThis.password = password;
const radio = createPrimitive("radio");
globalThis.radio = radio;
const range = createPrimitive("range");
globalThis.range = range;
const tel = createPrimitive("tel");
globalThis.tel = tel;
const text = createPrimitive("text");
globalThis.text = text;
const time = createPrimitive("time");
globalThis.time = time;
const url = createPrimitive("url");
globalThis.url = url;
const week = createPrimitive("week");
globalThis.week = week;
const select = createPrimitive("select");
globalThis.select = select;
const figure = createPrimitive("figure");
globalThis.figure = figure;
const details = createPrimitive("details");
globalThis.details = details;
const table = createPrimitive("table");
globalThis.table = table;
const a = createPrimitive("a");
globalThis.a = a;

//export { a, article, aside, audio, b, blockquote, br, button, canvas, checkbox, code, color, date, datetime, del, details, div, em, email, fieldset, figure, file, footer, form, h1, h2, h3, h4, h5, h6, header, hidden, hr, i, iframe, img, inputButton, inputReset, inputSubmit, ins, kbd, label, li, main, mark, meter, month, nav, number, ol, p, password, picture, pre, progress, q, radio, range, reset, s, search, section, select, small, span, strong, sub, submit, sup, table, tel, text, textarea, time, u, ul, url, video, week };
