const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;

    }

    append(data) {
        var node = new Node(data);
        if (!this._head) {
            this._head = node;
            this._tail = node;
        } else {
            var current = this._head;
            while (current.next) {
                current = current.next;
            }
            node.prev = current;
            current.next = node;
            this._tail = current.next;
        }
        this.length++;
        return this;

    }

    head() {
        return (this._head) ? this._head.data : null;
    }

    tail() {
        return (this._tail) ? this._tail.data : null;
    }

    at(index) {
        let current = this._head;
        let count = 0;
        if (index < 0 || index > this.length || this.length === 0) {
            return new Error();
        }
        while (count < index) {
            current = current.next;
            count++;
        }
        return current.data;

    }

    insertAt(index, data) {
        let buffer = null;

        if (index === 0) {
            buffer = new Node(data, null, this._head);
            this._head.prev = buffer;
            this._head = buffer;
        } else if (index === this.length - 1) {
            buffer = new Node(data, this._tail.prev, this._tail);
            this._tail.prev.next = buffer;
            this._tail.prev = buffer;
        } else {
            let node = this.find(index);
            buffer = new Node(data, node, node.next);
            node.next.prev = buffer;
            node.next = buffer;
        }

        this.length++;
        return this;

    }
    find(index) {
        let counter = 0;
        let currentNode = this._head;

        while (counter !== index) {
            currentNode = currentNode.next;
            counter++;
        }

        return currentNode;
    }


    isEmpty() {
        return (this.length === 0);
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let current = this._head;
        let length = this.length;
        let count = 0;

        let beforeNodeToDelete = null;
        let nodeToDelete = null;
        let deletedNode = null;

        // 1-ый случай: неверная позиция
        if (index < 0 || index > length) {
            throw new Error();
        }

        // 2-ой случай: первый узел удален
        if (index === 1) {
            this.head = current.next;
            deletedNode = current;
            current = null;
            this.length--;

            return deletedNode;
        }

        // 3-ий: все прочие узлы удалены
        while (count < index) {
            beforeNodeToDelete = current;
            nodeToDelete = current.next;
            count++;
        }

        beforeNodeToDelete.next = nodeToDelete.next;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
        this.length--;

        return deletedNode;
    }

    reverse() {
        let buffer = this._tail;
        this._tail = this._head;
        this._head = buffer;

        let currentItem = this._head;
        let nextItem;
        let prevItem;
        for (let i = 0; i < this.length; i++) {
            nextItem = currentItem.prev;
            prevItem = currentItem.next;
            currentItem.next = nextItem;
            currentItem.prev = prevItem;
            currentItem = currentItem.next;
        }
        return this;
    }

    indexOf(data) {
        let i = 0;
        let node = this._head;

        while (i < this.length) {
            if (node.data === data) {
                return i;
            }
            node = node.next;
            i++;
        }

        return -1;
    }
}

module.exports = LinkedList;