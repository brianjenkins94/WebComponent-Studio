export abstract class EventEmitter {
	private events = {};

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

	public emit(event: string, ...args: any[]): void {
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
}
