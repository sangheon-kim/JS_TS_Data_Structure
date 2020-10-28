type Data = number;
class Heap {
  heap_array: Array<Data> | [];
  constructor(data: Data) {
    this.heap_array = [];
    this.heap_array[0] = 0; // 1번 인덱스에서부터 출발하기 위해 undefined추가
    this.heap_array[this.heap_array.length] = data;
  }

  /**
   *
   * @description 부모 노드와 비교하여 현재 삽입된 노드와 비교
   * @private
   * @param {number} inserted_idx
   * @returns {boolean} 부모노드의 값을 비교하여 크다면 true, 작거나 같으면 false
   * @memberof Heap
   */
  private move_up(inserted_idx: number):boolean {
    // 인스턴스 생성시에 초기화될때 미리 초기화되지만, 그래도...예방코드
    if (inserted_idx <= 1){
      return false;
    }
    // 부모인덱스는 2로나눈 몫이다.
    let parent_idx = Math.floor(inserted_idx / 2);
    // 현재 인서트 노드와 인서트노드의 부모노드와 비교해서 크면 true, 작거나 같으면 swap이 필요없으니 false
    if (this.heap_array[inserted_idx] > this.heap_array[parent_idx]) {
      return true; 
    } else {
      return false;
    }
  }

  private move_down(poped_idx: number): boolean {
    let left_child_poped_idx = poped_idx * 2;
    let right_child_poped_idx = poped_idx * 2 + 1;

    if (this.heap_array[poped_idx] < this.heap_array[left_child_poped_idx]) {
      
    }

    return true;
  }

  /**
   *
   * @description
   * @param {Data} data
   * @returns {boolean}
   * @memberof Heap
   */
  public insert(data: Data): boolean {
    // 삽입할 배열의 인덱스 값이 될 것임. 삽입 전이기 때문에 현재 배열길이가 삽입할 인덱스 값
    let inserted_idx:number = this.heap_array.length; 
    this.heap_array[inserted_idx] = data; // 삽입전 배열길이니, 배열길이가 다음 삽입할 인덱스넘버 index지정 후 값 할당.₩
  
    while(this.move_up(inserted_idx)){
      // move_up에 현재 삽입 인덱스 값을 넣어준다.
      let parent_idx = Math.floor(inserted_idx / 2); // 만약 true가 리턴되면
      let tmp = this.heap_array[inserted_idx]; // 스왑해준다.
      this.heap_array[inserted_idx] = this.heap_array[parent_idx];
      this.heap_array[parent_idx] = tmp;
      inserted_idx = parent_idx; // 스왑후 삽입 인덱스에 그다음 부모노드를 대입하여 계속해서 비교해본다.
    }

    return true;
  }

  pop():Data | null{
    if (this.heap_array.length <= 1) {
      return null;
    }
    
    let returned_data = this.heap_array[1];

    this.heap_array[1] = this.heap_array[this.heap_array.length - 1];
    this.heap_array.splice(this.heap_array.length - 1, 1);
    let poped_idx = 1;

    while (this.move_down(poped_idx)) {

    }
    
    return returned_data;
  }
}

const heap = new Heap(15);
heap.insert(10)
heap.insert(8)
heap.insert(5)
heap.insert(4)
heap.insert(20)