## 자바스크립트로 배워보는 자료구조

안녕하세요. 프론트엔드 개발자 김상헌입니다. 오늘은 자바스크립트(타입스크립트)를 가지고 이해해보는 자료구조 첫번째로 연결 리스트를 배워봅시다.

## 1. 연결 리스트(Linked List)구조

- 링크드 리스트는 떨어진 곳에 존재하는 데이터를 화살표로 연결해서 관리하는 데이터 구조를 의미

- c언어에서는 중요하지만, 자바스크립트(타입스크립트)에서는 배열 타입이 연결리스트의 기능을 모두 지원합니다. (예를 들어 splice)

## 2.  링크드 리스트 기본 구조와 용어

- 링크드 리스트 기본 구조와 용어
  - 노드(Node): 데이터 저장 단위 (데이터값, 포인터) 로 구성
  - 포인터(pointer): 각 노드 안에서, 다음이나 이전의 노드와의 연결 정보를 가지고 있는 공간

<br>
* 일반적인 링크드 리스트 형태
<img src="https://www.fun-coding.org/00_Images/linkedlist.png" />
(출처: wikipedia, https://en.wikipedia.org/wiki/Linked_list)

### 3. 링크드 리스트의 장단점 (전통적인 C언어에서의 배열과 링크드 리스트)

- 장점
  - 미리 데이터 공간을 미리 할당하지 않아도 됨
    - 배열은 **미리 데이터 공간을 할당** 해야 함
- 단점
  - 연결을 위한 별도 데이터 공간이 필요하므로, 저장공간 효율이 높지 않음
  - 연결 정보를 찾는 시간이 필요하므로 접근 속도가 느림
  - 중간 데이터 삭제시, 앞뒤 데이터의 연결을 재구성해야 하는 부가적인 작업 필요

#### 아래 코드를 보고 이해가 되시면 좋겠습니다. 기회가 된다면 주석 처리해서 정리해보겠습니다.

```typescript
type Data = number | string;

class ListNode {
  constructor(public data: Data, public next: ListNode | null = null) {}
}

export default class LinkedList {
  head: ListNode | null;
  constructor(data: Data) {
    this.head = new ListNode(data);
  }

  /**
   *
   * @description 링크드리스트의 마지막인덱스에 삽입한다.
   * @param {Data} data
   * @memberof LinkedList
   */
  add(data: Data): void {
    if (!this.head) {
      this.head = new ListNode(data);
    } else {
      let node = this.head;
      while (node.next) node = node.next;
      node.next = new ListNode(data);
    }
  }

  /**
   *
   * @description 순회하면서 리스트 출력
   * @memberof LinkedList
   */
  desc(): void {
    let node = this.head;
    console.log("연결리스트를 출력합니다.");
    while (node) {
      console.log(node.data);
      if (!!node.next) {
        node = node.next;
      } else {
        break;
      }
    }
  }

  /**
   *
   * @description 중간에 노드삽입
   * @param {ListNode} Node
   * @param {Data} prevData
   * @memberof LinkedList
   */
  insertion(Node: ListNode, prevData: Data): void {
    let node = this.findNode(prevData);
    if (!!node) {
      let node_next: typeof node.next = node.next;
      node.next = Node;
      Node.next = node_next;
    } else {
      console.log("찾고자하는 데이터가 없어 연결리스트 마지막에 추가합니다.");
      this.add(Node.data);
    }
  }

  /**
   *
   * @description 데이터를 받아서 검색한 뒤 해당 노드를 리턴해준다.
   * @private
   * @param {Data} data
   * @returns {ListNode}
   * @memberof LinkedList
   *
   */
  private findNode(data: Data): ListNode | null {
    let node = this.head;
    let search: boolean = true;

    while (search) {
      if (!!node) {
        if (node.data === data) {
          search = false;
        } else {
          if (!!node.next) {
            node = node.next;
          } else {
            break;
          }
        }
      }
    }
    if (search === true) {
      return null;
    } else {
      return node;
    }
  }

  /**
   *
   * @description 노드를 삭제해줍니다. (해당 데이터에 맞는 노드)
   * @param {Data} data
   * @returns {void}
   * @memberof LinkedList
   */
  deleteNode(data: Data): void {
    if (!this.head) {
      console.log("해당 값을 가진 노드가 없습니다.");
      return;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
    } else {
      let node = this.head;
      while (!!node.next) {
        // 다음 노드의 데이터와 일치하는 경우 (다음 노드 있음)
        if (node.next.data == data) {
          // 일치하는 데이터를 그다음 데이터로 덮어씌운다.
          node.next = node.next.next;
          return;
        } else node = node.next;
      }
    }
  }
}

let linkedList1 = new LinkedList(0);

for (let i = 1; i < 10; i++) {
  linkedList1.add(i);
}

linkedList1.desc();

linkedList1.insertion(new ListNode(1.5), 3);

linkedList1.desc();

linkedList1.deleteNode(9);

linkedList1.desc();

export {};
```

## 더블 링크드 리스트

- 이전 노드에 대해서도 연결값을 가져 tail을 가지는 doubleLinkedList코드는 참고용으로 하시면 좋을 것 같습니다.

```typescript
type Data = string | number;

class ListNode {
  prev: ListNode | null;
  next: ListNode | null;
  data: Data;
  constructor(
    data: Data,
    prev: ListNode | null = null,
    next: ListNode | null = null
  ) {
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
    this.tail = this.head;
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
    while (node) {
      console.log(node.data);
      if (!!node.next) node = node.next;
      else break;
    }
  }

  searchFromHead(data: Data): ListNode | null {
    let node = this.head;
    if (node == null) {
      return null;
    }
    while (node !== null) {
      if (node.data === data) return node;
      else if (!!node.next) node = node.next;
      return null;
    }
    return null;
  }
}

let doubleLinkedList = new DoubleLinkedList(0);
for (let data = 1; data < 10; data++) {
  doubleLinkedList.insert(data);
}

doubleLinkedList.desc();
```

> 출처: 패스트캠퍼스 알고리즘 강의 복습 차원에서 나동빈 강사님꼐서 가르쳐주시는 파이썬으로 가르쳐주시는 자료구조를 자바스크립트(타입스크립트) 코드로 변환하면서, 부족한 예외처리들을 채워놓았습니다.
