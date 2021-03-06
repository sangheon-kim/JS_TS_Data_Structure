"use strict";
var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    return TreeNode;
}());
var Tree = /** @class */ (function () {
    function Tree(head) {
        this.head = head;
    }
    Tree.prototype.insert = function (value) {
        var current_node = this.head;
        while (true) {
            if (value < current_node.value) {
                if (!!current_node.left) {
                    current_node = current_node.left;
                }
                else {
                    current_node.left = new TreeNode(value);
                    break;
                }
            }
            else {
                if (!!current_node.right) {
                    current_node = current_node.right;
                }
                else {
                    current_node.right = new TreeNode(value);
                    break;
                }
            }
        }
    };
    Tree.prototype.search = function (value) {
        var current_node = this.head;
        while (!!current_node) {
            if (current_node.value === value) {
                return true;
            }
            else if (value < current_node.value) {
                current_node = current_node.left;
            }
            else {
                current_node = current_node.right;
            }
        }
        return false;
    };
    /**
     *
     * @description 노드 삭제
     * @param {Data} value
     * @returns {boolean}
     * @memberof Tree
     */
    Tree.prototype.delete = function (value) {
        var current_node = this.head;
        var searched = false;
        var parent = this.head;
        // 노드 탐색   
        while (!!current_node) {
            if (current_node.value === value) {
                // 노드를 찾으면, searched = true 할당 후 반복문 빠져나온다.
                searched = true;
                break;
            }
            else if (value < current_node.value) {
                // 찾으려는 값이 현재 노드의 값보다 작으면
                parent = current_node; // 부모노드에 현재 노드를 할당
                current_node = current_node.left; // 다음 순회할 노드에는 왼쪽 자식 노드를 할당
            }
            else {
                // 찾으려는 값이 현재 노드의 값보다 크거나 같으면, 
                parent = current_node; // 부모노드에 현재 노드를 할당
                current_node = current_node.right; // 다음 순회할 노드에는 오른쪽 자신 노드를 할당
            }
        }
        if (!searched) {
            return false;
        }
        else if (!!current_node) {
            // 아마 검색이 완료되었으면 current_node가 있을 것이다. 왜냐하면 
            // searched만 true로 바꿔주고, 반복문을 빠져나온다.
            if (!current_node.left && !current_node.right) {
                // case1: 자식 노드가 아무것도 없는 leaf Node의 경우
                if (value < parent.value) {
                    // value는 탐색이 끝났기에 해당 노드가 부모의 왼쪽에있는지 오른쪽에 있는지 판별하는 조건문
                    // value가 부모의 값보다 작으면 왼쪽 노드가 삭제하려는 노드라는 뜻.
                    parent.left = null; // 부모노드의 왼쪽 노드의 연결을 끊어주기위해 부모의 left에 null 할당
                }
                else {
                    // value가 부모의 값보다 크거나 같으면 오른쪽 노드가 삭제하려는 노드라는 뜻.
                    parent.right = null; // 부모노드의 우측 노드의 연결을 끊어주기 위해 부모의 right에 null 할당
                }
                current_node = null;
            }
            else if (!!current_node.left !== !!current_node.right) {
                // case2: 왼쪽노드가 있는지 체크한 결과와 오른쪽 노드가 있는지 체크한 결과가 다르다는 소리는 한쪽노드만 존재하는 형식
                if (!!current_node.left) {
                    // 현재노드의 왼쪽 자식 노드가 있는 경우
                    if (value < parent.value) {
                        // 삭제하려는 노드가 부모의 값보다 작으면 
                        parent.left = current_node.left; // 부모노드의 좌측 자식 노드를 현재 노드의 왼쪽 노드를 넣어준다.
                    }
                    else {
                        // 삭제하려는 노드가 부모의 값보다 크면 우측에 있을 것이다.
                        parent.right = current_node.left; // 우측 노드에 삭제하려는 노드의 좌측 노드를 삭제한다.
                    }
                    parent.left = current_node.left;
                }
                else {
                    // 현재 노드의 우측에 자식 노드가 있는 경우
                    if (value < parent.value) {
                        // 삭제하려는 값이 부모노드의 값보다 작으면 부모노드의 좌측자식 노드를 삭제 후, 우측 자식 노드를 넣어준다.
                        parent.left = current_node.right;
                    }
                    else {
                        // 삭제하려는 값이 부모노드의 값보다 크거나 같으면 부모노드의 우측자식 노드를 삭제 후, 우측 자식 노드를 넣어준다.
                        parent.right = current_node.right;
                    }
                }
            }
            else if (!!current_node.left && !!current_node.right) {
                // case3 : 좌우 자식 노드 다 가진 경우,
                var changeNode = current_node.right; // 삭제할 노드의 우측 노드를 변경노드로 초기화
                var changeNodeParent = current_node.right; // 삭제할 노드의 우측 노드로 변경노드의 부모노드로 초기화
                while (!!changeNode.left) { // 변경노드의 왼쪽노드가 없을 때까지 무한정 반복해서, 변경노드의 왼쪽노드의 끝을 찾는다.
                    changeNodeParent = changeNode; // 변경노드의 부모로 현재 변경노드로 두고,
                    changeNode = changeNode.left; // 변경노드의 값으로, 변경노드의 자식 노드로 할당하면서 반복하다보면, 변경노드에는 초기 변경 노드기준 가장 왼쪽 노드가 탐색된다.
                }
                if (!!changeNode.right) { // case 3-2 가장 왼쪽 노드에 우측 노드가 있는지 확인을 했을 때 있다면, 변경노드의 부모 왼쪽에는 변경 노드 우측 노드로 변경해준다.
                    changeNodeParent.left = changeNode.right;
                }
                else { // 3-1 가장 왼쪽 노드에 우측노드가 없다면, 변경노드의 부모노드에 왼쪽노드는 미리 없애준다.
                    changeNodeParent.left = null;
                } // 위 과정을 거치면, changeNode와 changeNodeParent에 노드들이 들어있다. 
                changeNode.right = current_node.right; // 변경할 노드의 삭제 예정 노드의 우측노드를 변경노드의 우측에 달아준다.
                changeNode.left = current_node.left; // 변경할 노드의 삭제 예정 노드의 좌측 노드를 변경노드의 좌측에 달아준다.
                if (value < parent.value) {
                    // case3-1 삭제할 노드가 부모노드의 왼쪽에 있을 경우
                    parent.left = changeNode;
                }
                else if (value === this.head.value) {
                    this.head = changeNode;
                }
                else {
                    // case3-2 삭제할 노드가 부모노드의 우측에 존재하는 경우
                    parent.right = changeNode;
                }
            }
        }
        return true;
    };
    return Tree;
}());
/**
 *                           example Tree
 *                                31
 *                15                            41
 *        13                 18           40          51
 *   11        14      16          19
 *                        17
 */
var head = new TreeNode(31);
var BST = new Tree(head);
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
