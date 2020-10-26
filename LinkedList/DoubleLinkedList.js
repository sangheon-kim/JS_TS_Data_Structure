"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListNode = /** @class */ (function () {
    function ListNode(data, prev, next) {
        if (prev === void 0) { prev = null; }
        if (next === void 0) { next = null; }
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
    return ListNode;
}());
var DoubleLinkedList = /** @class */ (function () {
    function DoubleLinkedList(data) {
        this.head = new ListNode(data);
        this.tail = this.head;
    }
    DoubleLinkedList.prototype.insert = function (data) {
        if (this.head === null) {
            this.head = new ListNode(data);
            this.tail = this.head;
        }
        else {
            var node = this.head;
            while (node.next) {
                node = node.next;
            }
            var newNode = new ListNode(data);
            node.next = newNode;
            newNode.prev = node;
            this.tail = newNode;
        }
    };
    DoubleLinkedList.prototype.desc = function () {
        var node = this.head;
        while (node) {
            console.log(node.data);
            if (!!node.next)
                node = node.next;
            else
                break;
        }
    };
    DoubleLinkedList.prototype.searchFromHead = function (data) {
        var node = this.head;
        if (node == null) {
            return null;
        }
        while (node !== null) {
            if (node.data === data)
                return node;
            else if (!!node.next)
                node = node.next;
            return null;
        }
        return null;
    };
    return DoubleLinkedList;
}());
var doubleLinkedList = new DoubleLinkedList(0);
for (var data = 1; data < 10; data++) {
    doubleLinkedList.insert(data);
}
doubleLinkedList.desc();
