import type { IEventEmitter } from "./EventEmitter";
import type { ElementAttributesMap } from "../types/attributes";
import type { TopLevelElementMap } from "../types/elements";
import { FlowContent, InteractiveContent, PhrasingContent } from "../types/content";

export abstract class Element<TagName extends keyof TopLevelElementMap> implements IEventEmitter {
	protected template: HTMLElement;
	protected attributes: ElementAttributesMap[TagName] = {};
	protected readonly type: keyof TopLevelElementMap;
	protected readonly children: string[] = [];
	private events = {};

	// Initialization

	public constructor(type: keyof TopLevelElementMap) {
		this.type = type;

		this.template = document.createElement(this.type);
	}

	// Event Emitter

	public on(event: string, listener: () => void): () => void {
		if (this.events[event] === undefined) {
			this.events[event] = [];
		}

		this.events[event].push(listener);

		return listener;
	}

	public off(event?: string, listener?: () => void): void {
		if (event === undefined && listener === undefined) {
			this.events = {};
		} else if (listener === undefined) {
			delete this.events[event];
		} else if (this.events[event].indexOf(listener) !== -1) {
			this.events[event].splice(this.events[event].indexOf(listener), 1);
		}
	}

	public emit(event: string, ...args: unknown[]): void {
		if (this.events[event] !== undefined) {
			for (const listener of this.events[event]) {
				listener(...args);
			}
		}

		if (event !== "*") {
			this.emit("*", ...args);
		}
	}

	public once(event: string, listener: () => void): () => void {
		return this.on(event, () => {
			this.emit(event);

			this.off(event, listener);
		});
	}

	// Array-like

	public length(): number {
		return this.children.length;
	}

	public toString(): string {
		throw new Error("Method not implemented.");
	}

	public toLocaleString(): string {
		throw new Error("Method not implemented.");
	}

	public pop(): string {
		throw new Error("Method not implemented.");
	}

	// eslint-disable-next-line complexity
	public push(...items: (string | Element<TagName>)[]): this {
		for (const item of items) {
			if (typeof item === "string") {
				this.children.push(item);
			} else {
				switch (this.type) {
					// Flow content

					// excluding self
					case "form":
						if (this.type === item.type) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					// excluding <header> and <footer>
					case "footer":
					case "header":
						if ((this.type === "header" || this.type === "footer") && (item.type === "header" || item.type === "footer")) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					// (excluding interactive content) or phrasing content
					case "a":
						if (this.type === "a" && (InteractiveContent.includes(item.type) || !PhrasingContent.includes(item.type))) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					case "article":
					case "aside":
					case "blockquote":
					case "details":
					case "div":
					case "fieldset":
					case "figure":
					case "main":
					case "nav":
					case "section":
						if (!FlowContent.includes(item.type)) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}
						break;

					// Phrasing content

					// excluding self
					case "label":
					case "meter":
					case "progress":
						if (this.type === item.type) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					// excluding Interactive content
					case "button":
						if (this.type === "button" && InteractiveContent.includes(item.type)) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					case "b":
					case "code":
					case "em":
					case "h1":
					case "h2":
					case "h3":
					case "h4":
					case "h5":
					case "h6":
					case "i":
					case "kbd":
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
						if (!PhrasingContent.includes(item.type)) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}
						break;

					// No content
					case "br":
					case "hr":
					case "iframe":
					case "img":
					case "input":
						throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");

					// `<img>`-only
					case "picture":
						if (item.type !== "img") {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					// No <audio> or <video>
					case "audio":
					case "video":
						if ((this.type === "audio" || this.type === "video") && (item.type === "audio" || item.type === "video")) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					// No interactive content except for <a>, <button>, and <input> elements whose type attribute is checkbox, radio, or button
					case "canvas":
						if (InteractiveContent.includes(item.type) && !(item.type === "a" || item.type === "button" || item.type === "input")) {
							throw new Error("<" + item.type + "> is not a permitted child of <" + this.type + ">.");
						}

					case "del":
					case "ins":
					default:
				}

				this.children.push(item.toString());
			}
		}

		return this;
	}

	public concat(...items: ConcatArray<string>[]): string[];
	public concat(...items: (string | ConcatArray<string>)[]): string[];
	public concat(...items: any[]) {
		throw new Error("Method not implemented.");
	}

	public join(separator?: string): string {
		throw new Error("Method not implemented.");
	}

	public reverse(): string[] {
		throw new Error("Method not implemented.");
	}

	public shift(): string {
		throw new Error("Method not implemented.");
	}

	public slice(start?: number, end?: number): string[] {
		throw new Error("Method not implemented.");
	}

	public sort(compareFn?: (a: string, b: string) => number): this {
		throw new Error("Method not implemented.");
	}

	public splice(start: number, deleteCount?: number): string[];
	public splice(start: number, deleteCount: number, ...items: string[]): string[];
	public splice(start: any, deleteCount?: any, ...rest: any[]) {
		throw new Error("Method not implemented.");
	}

	public unshift(...items: string[]): this {
		throw new Error("Method not implemented.");
	}

	public indexOf(searchElement: string, fromIndex?: number): number {
		throw new Error("Method not implemented.");
	}

	public lastIndexOf(searchElement: string, fromIndex?: number): number {
		throw new Error("Method not implemented.");
	}

	public every<S extends string>(predicate: (value: string, index: number, array: string[]) => value is S, thisArg?: any): this is S[];
	public every(predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any): boolean;
	public every(predicate: any, thisArg?: any) {
		throw new Error("Method not implemented.");
	}

	public some(predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any): boolean {
		throw new Error("Method not implemented.");
	}

	public forEach(callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any): void {
		throw new Error("Method not implemented.");
	}

	public map<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any): U[] {
		throw new Error("Method not implemented.");
	}

	public filter<S extends string>(predicate: (value: string, index: number, array: string[]) => value is S, thisArg?: any): S[];
	public filter(predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any): string[];
	public filter(predicate: any, thisArg?: any) {
		throw new Error("Method not implemented.");
	}

	public reduce(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
	public reduce(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
	public reduce<U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U;
	public reduce(callbackfn: any, initialValue?: any) {
		throw new Error("Method not implemented.");
	}

	public reduceRight(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
	public reduceRight(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
	public reduceRight<U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U;
	public reduceRight(callbackfn: any, initialValue?: any) {
		throw new Error("Method not implemented.");
	}

	public find<S extends string>(predicate: (this: void, value: string, index: number, obj: string[]) => value is S, thisArg?: any): S;
	public find(predicate: (value: string, index: number, obj: string[]) => unknown, thisArg?: any): string;
	public find(predicate: any, thisArg?: any) {
		throw new Error("Method not implemented.");
	}

	public findIndex(predicate: (value: string, index: number, obj: string[]) => unknown, thisArg?: any): number {
		throw new Error("Method not implemented.");
	}

	public fill(value: string, start?: number, end?: number): this {
		throw new Error("Method not implemented.");
	}

	public copyWithin(target: number, start: number, end?: number): this {
		throw new Error("Method not implemented.");
	}

	public [Symbol.iterator]() {
		throw new Error("Method not implemented.");
	}

	public entries(): IterableIterator<[number, string]> {
		throw new Error("Method not implemented.");
	}

	public keys(): IterableIterator<number> {
		throw new Error("Method not implemented.");
	}

	public values(): IterableIterator<string> {
		throw new Error("Method not implemented.");
	}

	public [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; } {
		throw new Error("Method not implemented.");
	}

	public includes(searchElement: string, fromIndex?: number): boolean {
		throw new Error("Method not implemented.");
	}
}
