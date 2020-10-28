import Sort from "../Sort/Sort";

/**
 *
 *
 * selection Sort
 * 5, 3, 2
 * (0, 1) -> (0, 2) => 가장 최소값 2와 현재 1번째 Turn인 경우 (Turn - 1) 0번째 요소와 스왑한다. => 2, 3, 5
 * (1, 2) => 가장 최소값이 3이 2번째 Trun 이기에 (Turn - 1)요소 1번째 인덱스 요소와 스왑한다. 
 * 
 * 3, 5, 2, 1
 * (0, 1) -> (0, 2) -> (0, 3) => 순회를 다돌고나면 min값이 1인것을 알 수 있다. (1번째 Turn) => (Turn - 1) = 0\
 * 0번 인덱스 요소 3와 1을 스왑해준다. => 1, 5, 2, 3
 * 1, 5, 2, 3 (현재 1턴 정렬)
 * (1, 2) -> (1, 3) => 순회를 돌고나니 min값이 2라는 것을 알 수 있다. (2번째 Turn) => (Turn - 1) = 1\
 * 1번 인덱스 요소 5와 2를 스왑해준다. => 1, 2, 5, 3
 * (2, 3) => 순회를 돌고나니 min값이 3이라는 것을 알 수 있다. (3번째 Turn) => (Turn - 1) = 2\
 * 2번 인덱스 요소 3과 5를 스왑해준다. => 1, 2, 3, 5
 * 
 * @export
 * @class SelectionSort
 * @extends {Sort}
 */
export default class SelectionSort extends Sort{
  constructor() {
    super();
  }

  sort(data: number[]):number[] {
    for (let stand = 0; stand < data.length - 1; stand++) {
      let lowest = stand;
      for (let index = stand + 1; index < data.length; index++) {
        // stand, index 비교
        if (data[lowest] > data[index]){
          // 가장 적은 값과, 순회하는 index를 비교한다. (초기 가장 적은값은 stand를 기준으로 두고 있다.)
          lowest = index;
        }
        [data[lowest], data[stand]] = [data[stand] , data[lowest]]; // 첫번쨰 index부터 작은값을 채워 나가기 때문에 (stand와 minIndex를 바꿔준다.)
      }
    }
    return data;
  }
}

const selection = new SelectionSort();
console.log(selection.sort([3,5,2,1]))
