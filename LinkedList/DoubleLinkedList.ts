type Data = string | number;

class ListNode {
  prev: ListNode | null;
  next: ListNode | null;
  data: Data;
  constructor(data: Data, prev: ListNode | null = null, next: ListNode | null = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

class DoubleLinkedList {
  head: ListNode;
  tail: ListNode;
  constructor(data: Data) {
    this.head = new ListNode(data);
    this.tail = this.head
  }

  insert(data: Data): void {
    if (this.head === null) {
      this.head = new ListNode(data);
      this.tail = this.head;
    } else {
      let node = this.head;
      while (node.next) {
        node = node.next;
      }
      let newNode = new ListNode(data);
      node.next = newNode;
      newNode.prev = node;
      this.tail = newNode;
    }
  }

  desc(): void {
    let node = this.head;
    while (node){
      console.log(node.data);
      if (!!node.next) node = node.next;
      else break;
    }
  }

  searchFromHead(data: Data): ListNode | null {
    let node = this.head
    if (node == null) {
      return null;
    }
    while (node !== null) {
      if (node.data === data)
        return node;
      else
        if (!!node.next) node = node.next;
        return null;
    }
    return null;
  }
}

let doubleLinkedList = new DoubleLinkedList(0);
for (let data = 1; data < 10; data++) {
  doubleLinkedList.insert(data);
}

doubleLinkedList.desc()

export {};