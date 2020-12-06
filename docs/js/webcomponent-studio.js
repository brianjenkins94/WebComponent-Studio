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
            if (value !== undefined) {
                anchorNode.setAttribute(key, value);
            }
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
            if (value !== undefined) {
                detailsNode.setAttribute(key, value);
            }
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
            if (value !== undefined) {
                embeddedNode.setAttribute(key, value);
            }
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
            const legendNode = document.createElement("legend");
            legendNode.innerHTML = this.legend;
            fieldSetNode.append(legendNode);
        }
        for (const [key, value] of Object.entries(this.attributes)) {
            if (value !== undefined) {
                fieldSetNode.setAttribute(key, value);
            }
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
            if (value !== undefined) {
                figureNode.setAttribute(key, value);
            }
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
            if (value !== undefined) {
                groupingNode.setAttribute(key, value);
            }
        }
        for (const childNode of this.children) {
            groupingNode.appendChild(childNode.fragment);
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
        this.cachedFragment = document.createDocumentFragment();
        const selectNode = document.createElement(this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            if (value !== undefined) {
                selectNode.setAttribute(key, value);
            }
        }
        (function recurse(options, parent) {
            for (const option of options) {
                let node;
                if (Array.isArray(option["value"])) {
                    node = document.createElement("optgroup");
                    node.setAttribute("label", option["key"]);
                    recurse(option["value"], node);
                }
                else {
                    node = document.createElement("option");
                    if (option["key"] !== undefined) {
                        node.appendChild(document.createTextNode(option["key"]));
                    }
                    if (option["value"] !== undefined) {
                        node.value = option["value"];
                    }
                    else {
                        node.value = option["key"];
                    }
                }
                if (option["disabled"] === true) {
                    node.setAttribute("disabled", true);
                }
                if (option["required"] === true) {
                    node.setAttribute("required", true);
                }
                if (option["selected"] === true) {
                    node.setAttribute("selected", true);
                }
                parent.appendChild(node);
            }
        })(this.options, selectNode);
        this.cachedFragment.appendChild(selectNode);
        return this.cachedFragment;
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
            if (value !== undefined) {
                tableNode.setAttribute(key, value);
            }
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
            if (value !== undefined) {
                textLevelNode.setAttribute(key, value);
            }
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
    "button": primeConstructor(TextLevelNode, "button"),
    "reset": primeConstructor(TextLevelNode, "button"),
    "submit": primeConstructor(TextLevelNode, "button"),
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
    "inputButton": primeConstructor(GroupingNode, "input"),
    "inputReset": primeConstructor(GroupingNode, "input"),
    "inputSubmit": primeConstructor(GroupingNode, "input"),
    // Search
    "search": primeConstructor(GroupingNode, "input"),
    // File
    "file": primeConstructor(GroupingNode, "input"),
    // Input
    "checkbox": primeConstructor(GroupingNode, "input"),
    "color": primeConstructor(GroupingNode, "input"),
    "date": primeConstructor(GroupingNode, "input"),
    "datetime-local": primeConstructor(GroupingNode, "input"),
    "email": primeConstructor(GroupingNode, "input"),
    "hidden": primeConstructor(GroupingNode, "input"),
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
    // Image Input
    "image": primeConstructor(GroupingNode, "input"),
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

// SOURCE: https://www.w3.org/TR/selector-3/#lex
const CSS_SELECTOR = /^(?:(?:#|\.)-?(?:[_a-z]|[\240-\377]|[0-9a-f]{1,6})(?:[_a-z0-9-]|[\240-\377]|[0-9a-f]{1,6})*)+$/i;
// SOURCE: https://tools.ietf.org/html/rfc3986#appendix-B
const URL_PATHNAME = /(?:[^?#]*)(?:\\?(?:[^#]*))?(?:#(?:.*))?$/i;
function parseSelector(selector) {
    let id;
    const classes = [];
    for (const match of selector.replace(/\s+/g, " ").split(/(?=#|\.)/)) {
        if (match.startsWith("#")) {
            id = match.substring(1);
        }
        else if (match.startsWith(".")) {
            classes.push(match.substring(1));
        }
    }
    return {
        "id": id,
        "classes": classes
    };
}
// eslint-disable-next-line complexity
function createPrimitive(tagName) {
    switch (tagName) {
        /**
         * Text-level
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, textContent: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, textContent?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "b":
        case "blockquote":
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
            return function (selector, textContent, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    textContent = selector;
                }
                // textContent
                if (textContent !== undefined && typeof textContent !== "object") {
                    return NodeTagNameMap[tagName](textContent, attributes);
                }
                else if (typeof textContent === "object") {
                    attributes = Object.assign(Object.assign({}, textContent), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](attributes);
            };
        /**
         * Label
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector): NodeTagNameMap[NodeTagName]
         * (selector?, for, textContent): NodeTagNameMap[NodeTagName]
         * (selector?, for, textContent, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "label":
            return function (selector, forValue, textContent, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    forValue = selector;
                    textContent = forValue;
                }
                // extras
                return NodeTagNameMap[tagName](forValue, textContent, attributes);
            };
        /**
         * Embedded
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, sources: string | string[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, sources?: string | string[], extras: object): NodeTagNameMap[NodeTagName]
         */
        case "audio":
        case "img":
        case "picture":
        case "video":
            return function (selector, sources, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    // eslint-disable-next-line no-lonely-if
                    if (Array.isArray(sources)) {
                        sources = selector;
                    }
                    else if (typeof selector === "string") {
                        sources = [selector];
                    }
                }
                // sources
                if (sources !== undefined && Array.isArray(sources)) ;
                else if (typeof sources === "object") {
                    attributes = Object.assign(Object.assign({}, sources), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](sources, attributes);
            };
        /**
         * Grouping (+Sectioning/Form-associated)
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, extras: object): NodeTagNameMap[NodeTagName]
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
            return function (selector, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else if (typeof selector === "object") {
                    attributes = Object.assign(Object.assign({}, selector), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](attributes);
            };
        /**
         * IFrame
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, source: string[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, source?: string[], extras: object): NodeTagNameMap[NodeTagName]
         */
        case "iframe":
            return function (selector, source, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    source = selector;
                }
                // source
                if (typeof source === "string" && URL_PATHNAME.test(source)) {
                    attributes.src = source;
                }
                else if (typeof source === "object") {
                    attributes = Object.assign(Object.assign({}, source), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](attributes);
            };
        /**
         * Field Set
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, legend: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, legend?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "fieldset":
            return function (selector, legend, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    legend = selector;
                }
                // source
                if (typeof legend === "string") {
                    return NodeTagNameMap[tagName](legend, attributes);
                }
                else {
                    attributes = Object.assign(Object.assign({}, legend), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](attributes);
            };
        /**
         * Form
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, method: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, method?: string, action: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, method?: string, action?: string, encoding: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, method?: string, action?: string, encoding?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "form":
            return function (selector, method, action, encoding, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
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
                else if (typeof encoding === "object") {
                    attributes = Object.assign(Object.assign({}, encoding), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](attributes);
            };
        /**
         * Button-like
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, value: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, value?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "input[type=button]":
            if (tagName === "input[type=button]") {
                tagName = "inputButton";
            }
        case "input[type=reset]":
            if (tagName === "input[type=reset]") {
                tagName = "inputReset";
            }
        case "input[type=submit]":
            if (tagName === "input[type=submit]") {
                tagName = "inputSubmit";
            }
            return function (selector, value, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    value = selector;
                }
                // value
                if (value !== undefined && typeof value === "string") {
                    attributes.value = value;
                }
                else if (typeof value === "object") {
                    attributes = Object.assign(Object.assign({}, value), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](Object.assign(Object.assign({}, attributes), { "type": tagName.substring("input".length).toLowerCase() }));
            };
        /**
         * Search
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, value: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, value?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "search":
            return function (selector, value, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    value = selector;
                }
                // value
                if (value !== undefined && typeof value === "string") {
                    attributes.value = value;
                }
                else if (typeof value === "object") {
                    attributes = Object.assign(Object.assign({}, value), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](Object.assign(Object.assign({}, attributes), { "type": tagName }));
            };
        /**
         * File
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, accept: string | string[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, accept?: string | string[], required: boolean): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, accept?: string | string[], required?: boolean, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "file":
            return function (selector, name, accept, required, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
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
                // extras
                return NodeTagNameMap[tagName](Object.assign(Object.assign({}, attributes), { "type": tagName }));
            };
        /**
         * Input
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, value: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, value?: string, required: boolean): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, value?: string, required?: boolean, extras: object): NodeTagNameMap[NodeTagName]
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
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
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
                // extras
                return NodeTagNameMap[tagName](Object.assign(Object.assign({}, attributes), { "type": tagName }));
            };
        /**
         * Image Input
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, source: string[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, source?: string[], extras: object): NodeTagNameMap[NodeTagName]
         */
        case "image":
            return function (selector, source, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    source = selector;
                }
                // source
                if (typeof source === "string" && URL_PATHNAME.test(source)) {
                    attributes.src = source;
                }
                else if (typeof source === "object") {
                    attributes = Object.assign(Object.assign({}, source), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](Object.assign(Object.assign({}, attributes), { "type": tagName }));
            };
        /**
         * Select
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector: string, name: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, options: object[]): NodeTagNameMap[NodeTagName]
         * (selector?: string, name?: string, options?: object[], extras: object): NodeTagNameMap[NodeTagName]
         */
        case "select":
            return function (selector, name, options, required, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
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
                // extras
                return NodeTagNameMap[tagName](options, Object.assign(Object.assign({}, attributes), { "type": tagName }));
            };
        /**
         * Figure
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector): NodeTagNameMap[NodeTagName]
         * (selector?: string, figcaption: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, figcaption?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "figure":
            return function (selector, figcaption, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    figcaption = selector;
                }
                // figcaption
                if (figcaption !== undefined && typeof figcaption === "string") {
                    return NodeTagNameMap[tagName](figcaption, attributes);
                }
                else if (typeof figcaption === "object") {
                    attributes = Object.assign(Object.assign({}, figcaption), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](attributes);
            };
        /**
         * Details
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, summary: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, summary?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "details":
            return function (selector, summary, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                    if (summary !== undefined && typeof summary === "string") {
                        return NodeTagNameMap[tagName](summary, attributes);
                    }
                    else if (typeof summary === "object") {
                        summary = attributes;
                    }
                    return NodeTagNameMap[tagName](attributes);
                }
                else {
                    summary = selector;
                }
                // summary
                if (summary !== undefined && typeof summary === "string") {
                    return NodeTagNameMap[tagName](summary, attributes);
                }
                else if (typeof summary === "object") {
                    attributes = Object.assign(Object.assign({}, summary), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](undefined, attributes);
            };
        /**
         * Table
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, caption: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, caption?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "table":
            return function (selector, caption, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    caption = selector;
                }
                // caption
                if (caption !== undefined && typeof caption === "string") {
                    return NodeTagNameMap[tagName](caption, attributes);
                }
                else if (typeof caption === "object") {
                    attributes = Object.assign(Object.assign({}, caption), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](attributes);
            };
        /**
         * Anchor
         *
         * (): NodeTagNameMap[NodeTagName]
         * (selector: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, href): NodeTagNameMap[NodeTagName]
         * (selector?: string, textContent?: string, href: string): NodeTagNameMap[NodeTagName]
         * (selector?: string, textContent?: string, href?: string, extras: object): NodeTagNameMap[NodeTagName]
         */
        case "a":
            return function (selector, textContent, href, attributes = {}) {
                if (selector !== undefined && typeof selector === "string" && CSS_SELECTOR.test(selector)) {
                    const { id, classes } = parseSelector(selector);
                    attributes.id = id;
                    attributes.class = classes && classes.join(" ");
                }
                else {
                    textContent = selector;
                }
                // textContent
                if (textContent !== undefined && typeof textContent === "string") {
                    return NodeTagNameMap[tagName](textContent, href, attributes);
                }
                else {
                    href = textContent;
                }
                // href
                if (href !== undefined && typeof href === "string" && URL_PATHNAME.test(href)) {
                    return NodeTagNameMap[tagName](href, href, attributes);
                }
                else if (typeof textContent === "object") {
                    attributes = Object.assign(Object.assign({}, textContent), attributes);
                }
                // extras
                return NodeTagNameMap[tagName](attributes);
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
const datetime = createPrimitive("datetime-local");
globalThis.datetime = datetime;
const email = createPrimitive("email");
globalThis.email = email;
const hidden = createPrimitive("hidden");
globalThis.hidden = hidden;
const image = createPrimitive("image");
globalThis.image = image;
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

//export { a, article, aside, audio, b, blockquote, br, button, canvas, checkbox, code, color, date, datetime, del, details, div, em, email, fieldset, figure, file, footer, form, h1, h2, h3, h4, h5, h6, header, hidden, hr, i, iframe, image, img, inputButton, inputReset, inputSubmit, ins, kbd, label, li, main, mark, meter, month, nav, number, ol, p, password, picture, pre, progress, q, radio, range, reset, s, search, section, select, small, span, strong, sub, submit, sup, table, tel, text, textarea, time, u, ul, url, video, week };
