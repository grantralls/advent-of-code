class Node<T> {
    private data: T;
    private next: Node<T> | null = null;

    constructor(data: T) {
        this.data = data;
    }

    public get getData() {
        return this.data;
    }

    public get getNext() {
        return this.next;
    }

    public set setNext(next: Node<T> | null) {
        this.next = next;
    }
}

export class Queue<T> {
    private length: number = 0;
    private first: Node<T> | null = null;
    private last: Node<T> | null = null;

    constructor() {
        this.length = 0;
        this.first = null;
        this.last = null;
    }

    public get getLength() {
        return this.length;
    }

    public get getFirst() {
        return this.first;
    }

    public enqueue(value: T) {
        const node = new Node(value);

        if (this.first === null || this.last === null) {
            this.first = node;
            this.last = node;
        } else {
            this.last.setNext = node;
            this.last = node;
        }

        this.length++;
    }

    public dequeue() {
        if (this.first === null) {
            return null;
        }

        const node = this.first;

        if (this.first === this.last) {
            this.last = null;
        }

        this.first = this.first.getNext;
        this.length--;

        return node.getData;
    }
}
