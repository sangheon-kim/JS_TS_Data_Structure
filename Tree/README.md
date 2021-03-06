# 자바스크립트(타입스크립트)로 배워보는 자료구조

- 안녕하세요 프론트엔드 개발자 김상헌입니다. 자료구조 세번째 시간으로 트리 구조에 대해서 배워봅시다.

## 1. 트리 (Tree) 구조

- 트리: Node와 Branch를 이용해서, 사이클을 이루지 않도록 구성한 데이터 구조
  실제로 어디에 많이 사용되나? - 트리 중 이진 트리 (Binary Tree) 형태의 구조로, 탐색(검색) 알고리즘 구현을 위해 많이 사용됩니다.

### 2. 알아둘 용어

- Node: 트리에서 데이터를 저장하는 기본 요소 (데이터와 다른 연결된 노드에 대한 Branch 정보 포함)
- Root Node: 트리 맨 위에 있는 노드
- Level: 최상위 노드를 Level 0으로 하였을 때, 하위 Branch로 연결된 노드의 깊이를 나타냄
- Parent Node: 어떤 노드의 다음 레벨에 연결된 노드
- Child Node: 어떤 노드의 상위 레벨에 연결된 노드
- Leaf Node (Terminal Node): Child Node가 하나도 없는 노드
- Sibling (Brother Node): 동일한 Parent Node를 가진 노드
- Depth: 트리에서 Node가 가질 수 있는 최대 Level

### 3. 이진 트리와 이진 탐색 트리 (Binary Search Tree)

- 이진 트리: 노드의 최대 Branch가 2인 트리
- 이진 탐색 트리 (Binary Search Tree, BST): 이진 트리에 다음과 같은 추가적인 조건이 있는 트리
  - 왼쪽 노드는 해당 노드보다 작은 값, 오른쪽 노드는 해당 노드보다 큰 값을 가지고 있음!

<img src="https://www.mathwarehouse.com/programming/images/binary-search-tree/binary-search-tree-insertion-animation.gif" />

(출처: https://www.mathwarehouse.com/programming/gifs/binary-search-tree.php#binary-search-tree-insertion-node)

### 4. 자료 구조 이진 탐색 트리의 장점과 주요 용도

- 주요 용도: 데이터 검색(탐색)
- 장점: 탐색 속도를 개선할 수 있음
- 딘잠: 평균 시간 복잡도는 $ O(log{n}) $ 이지만,
  - 이는 트리가 균형잡혀 있을 때의 평균 시간복잡도이며,
  - 다음 예와 같이 구성되어 있을 경우, 최악의 경우는 링크드 리스트등과 동일한 성능을 보여줌 ( $O(n)$ )

### 이진트리와 정렬된 배열간의 탐색 비교

<img src="https://www.mathwarehouse.com/programming/images/binary-search-tree/binary-search-tree-sorted-array-animation.gif" />

(출처: https://www.mathwarehouse.com/programming/gifs/binary-search-tree.php#binary-search-tree-insertion-node)

```typescript
type Data = string | number;

class TreeNode {
  left: null | TreeNode;
  right: null | TreeNode;
  constructor(public value: Data) {
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(public head: TreeNode) {}

  /**
   *
   * @description 삽입 노드
   * @param {Data} value
   * @memberof Tree
   */
  insert(value: Data): void {
    let current_node = this.head;
    while (true) {
      if (value < current_node.value) {
        // 추가하고자 하는 노드가 현재 노드보다 작다면 왼쪽으로 이동
        if (!!current_node.left) {
          // 왼쪽 노드가 있다면, 왼쪽 노드가 빌때까지 현재노드를 왼쪽노드로 변경
          current_node = current_node.left;
        } else {
          // 비어있는 노드를 발견시, 노드 생성하여 할당
          current_node.left = new TreeNode(value);
          break;
        }
      } else {
        // 추가하고자하는 노드가 현재노드보다 크거나 같으면 우측으로 이동
        if (!!current_node.right) {
          // 비어있을때까지, 우측노드 삽입하면서 순회
          current_node = current_node.right;
        } else {
          // 순회 하다가 우측 자식노드가 비는게 나오면 그떄 노드생성하여 할당
          current_node.right = new TreeNode(value);
          break;
        }
      }
    }
  }

  /**
   *
   * @description 노드트리에서 해당 노드 탐색
   * @param {Data} value
   * @returns {boolean}
   * @memberof Tree
   */
  search(value: Data): boolean {
    let current_node: TreeNode | null = this.head; // 출발지점은 트리의 헤드다.
    while (!!current_node) {
      // 노드가 있을때까지 반복
      if (current_node.value === value) {
        // 만약 찾고자하는 노드를 찾았다면 true 반환
        return true;
      } else if (value < current_node.value) {
        // 찾고자하는 값이 현재 노드보다 적다면 왼쪽노드를 현재노드로 변경하여 왼쪽으로 탐색
        current_node = current_node.left;
      } else {
        // 찾고자하는 값이 현재 노드보다 크다면 오른쪽노드를 현재노드로 변경하여 왼쪽으로 탐색
        current_node = current_node.right;
      }
    }
    return false; // 반복문이 끝날때까지도 못찾았다면, false를 반환해준다.
  }

  /**
   *
   * @description 노드 삭제
   * @param {Data} value
   * @returns {boolean}
   * @memberof Tree
   */
  delete(value: Data): boolean {
    let current_node: TreeNode | null = this.head;
    let searched = false;
    let parent = this.head;

    // 노드 탐색
    while (!!current_node) {
      if (current_node.value === value) {
        // 노드를 찾으면, searched = true 할당 후 반복문 빠져나온다.
        searched = true;
        break;
      } else if (value < current_node.value) {
        // 찾으려는 값이 현재 노드의 값보다 작으면
        parent = current_node; // 부모노드에 현재 노드를 할당
        current_node = current_node.left; // 다음 순회할 노드에는 왼쪽 자식 노드를 할당
      } else {
        // 찾으려는 값이 현재 노드의 값보다 크거나 같으면,
        parent = current_node; // 부모노드에 현재 노드를 할당
        current_node = current_node.right; // 다음 순회할 노드에는 오른쪽 자신 노드를 할당
      }
    }

    if (!searched) {
      return false;
    } else if (!!current_node) {
      // 아마 검색이 완료되었으면 current_node가 있을 것이다. 왜냐하면
      // searched만 true로 바꿔주고, 반복문을 빠져나온다.
      if (!current_node.left && !current_node.right) {
        // case1: 자식 노드가 아무것도 없는 leaf Node의 경우
        if (value < parent.value) {
          // value는 탐색이 끝났기에 해당 노드가 부모의 왼쪽에있는지 오른쪽에 있는지 판별하는 조건문
          // value가 부모의 값보다 작으면 왼쪽 노드가 삭제하려는 노드라는 뜻.
          parent.left = null; // 부모노드의 왼쪽 노드의 연결을 끊어주기위해 부모의 left에 null 할당
        } else {
          // value가 부모의 값보다 크거나 같으면 오른쪽 노드가 삭제하려는 노드라는 뜻.
          parent.right = null; // 부모노드의 우측 노드의 연결을 끊어주기 위해 부모의 right에 null 할당
        }
        current_node = null;
      } else if (!!current_node.left !== !!current_node.right) {
        // case2: 왼쪽노드가 있는지 체크한 결과와 오른쪽 노드가 있는지 체크한 결과가 다르다는 소리는 한쪽노드만 존재하는 형식
        if (!!current_node.left) {
          // 현재노드의 왼쪽 자식 노드가 있는 경우
          if (value < parent.value) {
            // 삭제하려는 노드가 부모의 값보다 작으면
            parent.left = current_node.left; // 부모노드의 좌측 자식 노드를 현재 노드의 왼쪽 노드를 넣어준다.
          } else {
            // 삭제하려는 노드가 부모의 값보다 크면 우측에 있을 것이다.
            parent.right = current_node.left; // 우측 노드에 삭제하려는 노드의 좌측 노드를 삭제한다.
          }
          parent.left = current_node.left;
        } else {
          // 현재 노드의 우측에 자식 노드가 있는 경우
          if (value < parent.value) {
            // 삭제하려는 값이 부모노드의 값보다 작으면 부모노드의 좌측자식 노드를 삭제 후, 우측 자식 노드를 넣어준다.
            parent.left = current_node.right;
          } else {
            // 삭제하려는 값이 부모노드의 값보다 크거나 같으면 부모노드의 우측자식 노드를 삭제 후, 우측 자식 노드를 넣어준다.
            parent.right = current_node.right;
          }
        }
      } else if (!!current_node.left && !!current_node.right) {
        // case3 : 좌우 자식 노드 다 가진 경우,
        var changeNode = current_node.right; // 삭제할 노드의 우측 노드를 변경노드로 초기화
        var changeNodeParent = current_node.right; // 삭제할 노드의 우측 노드로 변경노드의 부모노드로 초기화

        while (!!changeNode.left) {
          // 변경노드의 왼쪽노드가 없을 때까지 무한정 반복해서, 변경노드의 왼쪽노드의 끝을 찾는다.
          changeNodeParent = changeNode; // 변경노드의 부모로 현재 변경노드로 두고,
          changeNode = changeNode.left; // 변경노드의 값으로, 변경노드의 자식 노드로 할당하면서 반복하다보면, 변경노드에는 초기 변경 노드기준 가장 왼쪽 노드가 탐색된다.
        }
        if (!!changeNode.right) {
          // case 3-2 가장 왼쪽 노드에 우측 노드가 있는지 확인을 했을 때 있다면, 변경노드의 부모 왼쪽에는 변경 노드 우측 노드로 변경해준다.
          changeNodeParent.left = changeNode.right;
        } else {
          // 3-1 가장 왼쪽 노드에 우측노드가 없다면, 변경노드의 부모노드에 왼쪽노드는 미리 없애준다.
          changeNodeParent.left = null;
        } // 위 과정을 거치면, changeNode와 changeNodeParent에 노드들이 들어있다.
        if (current_node.right !== changeNode)
          changeNode.right = current_node.right; // 변경할 노드의 삭제 예정 노드의 우측노드를 변경노드의 우측에 달아준다.
        if (changeNode !== current_node.left)
          changeNode.left = current_node.left; // 변경할 노드의 삭제 예정 노드의 좌측 노드를 변경노드의 좌측에 달아준다.
        if (value < parent.value) {
          // case3-1 삭제할 노드가 부모노드의 왼쪽에 있을 경우
          parent.left = changeNode;
        } else if (value === this.head.value) {
          // 맨 꼭대기를 삭제시에
          // 변경노드를 헤드값으로 싣어주면된다. 변경노드의 좌우는 이미 설정해놓았기에 문제없다.
          this.head = changeNode;
        } else {
          // case3-2 삭제할 노드가 부모노드의 우측에 존재하는 경우
          parent.right = changeNode;
        }
      }
    }
    return true;
  }
}
/**
 *                           example Tree
 *                                31
 *                15                            41
 *        13                 18           40          51
 *   11        14      16          19
 *                        17
 */

let head = new TreeNode(31);
let BST = new BinarySearchTree(head);
BST.insert(15);
BST.insert(41);
BST.insert(13);
BST.insert(18);
BST.insert(40);
BST.insert(51);
BST.insert(11);
BST.insert(14);
BST.insert(16);
BST.insert(19);
BST.insert(17);

// BST.delete(31)
BST.delete(31);
// console.log(BST.search(0));
// console.log(BST)
```

> 출처: 패스트캠퍼스 알고리즘 강의 복습 차원에서 나동빈 강사님꼐서 가르쳐주시는 파이썬으로 가르쳐주시는 자료구조를 자바스크립트(타입스크립트) 코드로 변환하면서, 부족한 예외처리들을 채워놓았습니다.
