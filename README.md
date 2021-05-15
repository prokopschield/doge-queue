# doge-queue

Super easy way to queue data!

#### TypeScript

```
import Queue from 'doge-queue';

let callback = console.log;
let delay = 3000;

const queue = new Queue<string>(callback, delay);

queue.emit('one', 'two', 'three', 'four');
```

#### JavaScript

```
const Queue = require('doge-queue');

let callback = console.log;
let delay = 3000;

const queue = new Queue(callback, delay);

queue.emit('one', 'two', 'three', 'four');
```
