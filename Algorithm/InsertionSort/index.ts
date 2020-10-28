import Sort from "../Sort/Sort";

/**
 *
 * @summary 삽입 정렬
 * @description 5, 3, 7, 1
 * (stand = 0, index = 1) 3부터 5까지 확인하면서 스왑 (1 turn) - 3, 5, 7, 1 => stand += 1; index = stand + 1;
 * (stand = 1, index = 2) 7부터 3까지 비교하면서 스왑(5보다 크니까 브레이크) (2 turn) - 3, 5, 7, 1 => stand += 1; index = stand + 1;
 * (stand = 2, index = 3) 1부터 2까지 비교하면서 스왑 (3 turn) - 1, 3, 5, 7 => stand += 1; index = stand + 1;
 * @export
 * @class InsertionSort
 * @extends {Sort}
 */
export default class InsertionSort extends Sort {
  constructor() {
    super();
  }

  /**
   *
   * @description 정렬 메소드
   * @param {number[]} data
   * @returns {number[]}
   * @memberof InsertionSort
   */
  sort(data: number[]): number[] {
    // 기준점은 0부터 출발한다.
    for (let stand = 0; stand < data.length - 1; stand++) {
      // 기준점 보다 index값은 항상 앞선다.
      for (let index = stand + 1; index > 0; index--) {
        // 비교 후에 이전 인덱스보다 현재 값이 작으면 스왑해준다.
        if (data[index] < data[index - 1]) {
          [data[index], data[index - 1]] = [data[index - 1], data[index]]
        } else {
          // 기준 인덱스 보다 스왑할게 없으면 앞전에 이미 정렬이 되어있기때문에 break;
          break;
        }
      }
    }
    return data;
  }
}

const insert = new InsertionSort();
console.log(insert.sort([5,3,7,1])); // 1,3,5,7
