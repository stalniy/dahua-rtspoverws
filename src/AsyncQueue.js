export class AsyncQueue {
  constructor(cb) {
    this.queue = new SimpleQueue();
    this.isProcessing = false;
    this.cb = cb;
  }

  add(item) {
    this.queue.push(item);
  }

  async process() {
    if (this.isProcessing) return;

    try {
      this.isProcessing = true;
      while (!this.queue.isEmpty()) {
        const message = this.queue.shift();
        await this.cb(message);
      }
    } finally {
      this.isProcessing = false;
      if (!this.queue.isEmpty()) {
        setImmediate(() => this.process());
      }
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SimpleQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(item) {
    const newNode = new Node(item);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  shift() {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.head.data;
    this.head = this.head.next;
    this.size--;

    if (this.size === 0) {
      this.tail = null;
    }

    return item;
  }

  isEmpty() {
    return this.size === 0;
  }
}
