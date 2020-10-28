import Sort from "../Sort/Sort";

/**
 *
 * 
 * @summary BubbleSort
 * @description 앞에서부터 조건을 확인해서 앞에 요소가 뒤에 인덱스보다 크면, 스왑한다. 
 *              순회할때마다 맨뒤에 가장 큰수가 쌓이고 앞에서는 정렬이 이루어진다.
 * @class BubbleSort
 * @extends {Sort}
 */
class BubbleSort extends Sort{
  constructor() {
    super();
  }

  /**
   *
   * @description Bubble Sort 
   * 0,1(5, 3) - 1,2(5, 2), - 2, 3(5, 1) (1회차)
   * 0,1(3, 2) - 1,2(2, 1) (2회차)
   * 0,1(2, 1)
   * @param {number[]} args
   * @returns {number[]}
   * @memberof BubbleSort
   */
  sort(data: number[]):number[] {
    for (let stand = data.length - 1; stand > 0; stand--) {
      let swap = false;
      for (let index = 0; index < stand; index++) {
        if (data[index] > data[index + 1]) {
          [data[index], data[index + 1]] = [data[index + 1], data[index]]; // Swap
          swap = true;
        }
        if (!swap) break;
      }
    }
    return data;
  }
  
  /**
   *
   * @description 다른방식
   * @param {number[]} args
   * @returns {number[]}
   * @memberof BubbleSort
   */
  sort_different(data: number[]):number[] {
    for (let stand = 1; stand <= data.length; stand++) {
      let swap = false;
      for (let index = 0; index < data.length - stand; index++) {
        if (data[index] > data[index+1]) {
          [data[index], data[index + 1]] = [data[index+1], data[index]]; // Swap
          swap = true;
        }
        if (!swap) break;
      }
    }
    return data;
  }
}

let bubble = new BubbleSort();
console.log(bubble.sort_different([5,3,2,1]));

