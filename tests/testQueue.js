const Queue = require('..');

module.exports = () => {
	return new Promise(resolve => {
		const queue = new Queue((c) => c(), 250);

		for (let i=20; i; --i) {
			queue.emit(() => console.log(i));
		}

		queue.emit(() => queue.skip += 3);
		queue.emit(() => console.log(`Everything seems to work! :)`));
		queue.emit(resolve);
	});
}
