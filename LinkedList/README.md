## 자바스크립트로 배워보는 자료구조

안녕하세요. 프론트엔드 개발팀 김상헌입니다. 오늘은 자바스크립트(타입스크립트)를 가지고 이해해보는 자료구조 첫번째로 연결 리스트를 배워봅시다.

## 1. 연결 리스트(Linked List)구조

- 링크드 리스트는 떨어진 곳에 존재하는 데이터를 화살표로 연결해서 관리하는 데이터 구조를 의미

- c언어에서는 중요하지만, 자바스크립트(타입스크립트)에서는 배열 타입이 연결리스트의 기능을 모두 지원합니다. (예를 들어 splice)

## 2.  링크드 리스트 기본 구조와 용어

- 노드(Node): 데이터 저장 단위(데이터값, 포인터)로 구성

- 포인터(pointer):  각 노드 안에서, 이전 노드또는 다음 노드의 연결정보를 가지고 있는 공간을 의미

#### 아래 코드를 보고 이해가 되시면 좋겠습니다. 기회가 된다면 주석 처리해서 정리해보겠습니다.

```js
type Data = number | string;

class ListNode {
  constructor(public data:Data, public next: ListNode | null = null) {}
}

export default class LinkedList {
  head: ListNode | null;
  constructor(data:Data) {
    this.head = new ListNode(data);
  }

  /**
   *
   * @description 링크드리스트의 마지막인덱스에 삽입한다.
   * @param {Data} data
   * @memberof LinkedList
   */
  add(data: Data):void {
    if (!this.head) {
      this.head = new ListNode(data)
    } else {
      let node = this.head;
      while (node.next)
        node = node.next;
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
    console.log('연결리스트를 출력합니다.')
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
    let node = this.findNode(prevData)
    if (!!node) {
      let node_next:typeof node.next = node.next;
      node.next = Node;
      Node.next = node_next;
    } else {
      console.log('찾고자하는 데이터가 없어 연결리스트 마지막에 추가합니다.')
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
        }
        else {
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
    console.log("해당 값을 가진 노드가 없습니다.")
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
      }
      else
        node = node.next;
    }
  }
 }
}

let linkedList1 = new LinkedList(0);

for (let i = 1; i < 10; i++) {
  linkedList1.add(i)
}

linkedList1.desc();

linkedList1.insertion(new ListNode(1.5), 3);

linkedList1.desc();

linkedList1.deleteNode(9);

linkedList1.desc();

export {}
```
