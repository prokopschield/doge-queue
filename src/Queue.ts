export type Callback<Returned> = (ret: Returned) => void;

export class Queue<QueuedEntity> {

	constructor (callback: Callback<QueuedEntity>, delay: number) {
		this.__callback = callback;
		this.__delay = delay;
		this.__skip = 0;

		this.__trigger();
	}

	private __callback: Callback<QueuedEntity>;
	private __delay: number;
	private __skip: number;

	get callback (): Callback<QueuedEntity> {
		return this.__callback;
	}

	set callback (cb: Callback<QueuedEntity>) {
		this.__callback = cb;
	}

	get delay (): number {
		return this.__delay;
	}

	set delay (delay: number) {
		this.__delay = delay;
		this.skip;
	}

	get skip (): number {
		return ++this.__skip;
	}

	set skip (triggers: number) {
		this.__skip += triggers;
	}

	queue: QueuedEntity[] = [];

	private __wake: Function = () => {};

	private __trigger () {
		if (this.__skip <= 0) {
			if (this.queue.length) {
				const entity = this.queue.shift();
				entity && this.__callback(entity);
			} else return void new Promise(resolve => this.__wake = () => {
				this.__wake = () => {};
				resolve(setTimeout(() => this.__trigger()));
			});
		} else --this.__skip;
		setTimeout(() => this.__trigger(), this.__delay);
	}

	emit (...entities: QueuedEntity[]) {
		for (const entity of entities) {
			this.queue.push(entity);
		}
		this.__wake();
	}
}

export default Queue;
module.exports = Queue;

Object.assign(Queue, {
	default: Queue,
	Queue,
});
