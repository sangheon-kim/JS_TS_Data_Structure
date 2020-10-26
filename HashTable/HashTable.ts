class HashTable<T> {
  hash_table: Array<any>
  // hash_table: Array<T> | [] | Array<[number, T]>;
  constructor(public len: number) {
    this.len = len; // 길이값을 인스턴스 초기화시에 사용해준다. (해쉬값을 가지고 index생성시에 사용예정)
    this.hash_table = new Array(len); // 처음에 배열의 길이를 생성자 함수를 통해서 전달받는다.
  }
  /**
   *
   * @description 해쉬코드 생성 코드
   * @private
   * @param {string} data
   * @returns {number}
   * @memberof HashTable
   */
  private hashCode(data:string): number {
    
    var hash = 0, i, chr;
    for (i = 0; i < data.length; i++) {
      chr   = data.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  /**
   * @description 현재 배열 길이를 기준으로 해쉬값을 가지고, 나머지 값을 구하여 인덱스를 구해준다.
   * @private
   * @param {number} key
   * @returns {number}
   * @memberof HashTable
   */
  private hash_func(key: number): number {
    return key % this.len; // 배열 길이를 확인하여, key값을 삽입해준다.
  }

  /**
   *
   * @description key와 value를 받아서, key값은 해쉬암호화 후 해쉬 인덱스를 구하여, 해쉬리스트에 저장
   * @summary 이렇게 저장시에는 hash_index가 겹치는 경우 오버라이딩 되는 이슈가 발생할 수 있다. 아래 충돌해결기법을 활용하라
   * @param {string} data
   * @param {T} value
   * @memberof HashTable
   */
  save_data(data: string, value: T):void {
    let hash_address = this.hash_func(this.hashCode(data)); // 해쉬 키값을 넣어준 후 
    this.hash_table[hash_address] = value; // 위에서 받은 hash_address에 값을 저장해준다.
  }

  /**
   *
   * @description 키값을 받아서 hash_func 함수를 돌린 index를 기준으로 결과값 반환
   * @param {string} data
   * @returns {*}
   * @memberof HashTable
   */
  read_data(data: string): T{
    let hash_address = this.hash_func(this.hashCode(data)); // 해쉬 값을 얻어낸다.
    return this.hash_table[hash_address];
  }

  /**
   * @summary 체이닝 기법 - 해쉬리스트는 충돌이 발생하게되면 오버라이딩 되는 이슈를 해결하기 위한 기법
   * @description 체이닝 기법을 활용하여, 배열 요소를 [index, 값]을 갖는 형태의 배열로 저장하여, 요소들도 [index, 값]형태의 타입을 가진다.
   * 연결리스트를 이용해도되지만, 자바스크립트는 Array라는 좋은 것을 지원하기에 내장 메소드 활용
   * @param {string} data
   * @param {T} value
   * @memberof HashTable
   */
  chainingSaveData(data: string, value: T):void {
    let index_key = this.hashCode(data) // 해쉬코드 값만 얻어낸다.
    let hash_address = this.hash_func(this.hashCode(data)); // 해쉬코드를 8로 나눈 나머지값을 구한다.

    if (!!this.hash_table[hash_address]) {
      // 키값을 받은 것을 기반으로 hash_address를 확인하여, falsy한 값이 아니라면, 기존에 데이터가 있는 것으로 간주
      let search = false; // default Search는 false로 둔다.
      // this.hash_table[hash_address]가 있는 경우이니, 해당 값들을 순회합니다.
      for (let index = 0; index < (this.hash_table[hash_address] as [number, T]).length; index++) {
          // 만약 기존에 저장되어있는 키값을 찾는 경우 값만 바꿔주는 형식으로 합니다.
          if (this.hash_table[hash_address][index][0] === index_key) {
            this.hash_table[hash_address][index][1] = value;
            search = true; // 값을 찾았다는 의미로 true를 저장해줍니다.
            break;
          }
      }
      // 찾지 못했다면, 해당 hash_address는 배열형식으로 되어있으니, 가장 마지막 index에[index_key, value]형식으로 추가로 push 해줍니다.
      if (!search) this.hash_table[hash_address].push([index_key, value])
    } else {
      // hash_list의 hash_address index를 비교하여, 값이 없는 경우
      let result:[number, T] = [index_key, value]
      this.hash_table[hash_address] = [result]; // [[index, value]] 형태로 담아준다. (이유는 요소에 [index, value] 형태로 나열 예정)
    }
  }

  /**
   *
   * @description 체이닝기법으로 저장한 데이터를 키값을 통해 조회한다.
   * @param {string} key
   * @returns {(T | undefined)}
   * @memberof HashTable
   */
  chainingReadData(key: string): T | undefined {
    let index_key = this.hashCode(key) // 해쉬코드 값만 얻어낸다.
    let hash_address = this.hash_func(this.hashCode(key)); // 해쉬코드를 8로 나눈 나머지값을 구한다.
    
    if (!!this.hash_table[hash_address]) {
      // hash_table에서 해당 해쉬주소를 확인해서 데이터가 있는 경우 값을 확인해서 해당 값을 리턴해줍니다.
      for (let index = 0; index < (this.hash_table[hash_address] as [number, T]).length; index++) {
        if (this.hash_table[hash_address][index][0] === index_key) {
          return this.hash_table[hash_address][index][1]
        }
      }

      // 순회를 해도 데이터가 없을 경우에는 undefined를 반환해줍니다.
      return undefined;
    }
    else {
      // hash_table에서 해당 해쉬주소를 확인해서 데이터가 없는 경우
      return undefined
    }
  }
  
  /**
   *
   * @summary LinearProbing기법 - 체이닝기법과는 다른 방식으로 충돌을 방지하는데, 중복이 발생되면 발생 지점부터 배열의 길이만큼 이동해서 비어있는 곳에 저장을 하게됩니다.
   * @description 각 요소는 체이닝기법처럼 [index, value]형식의 배열형식을 갖습니다. 하지만 [index, value]형식으로 이어진 배열이 아닌 각 요소는 1차원 배열을 갖습니다.
   * 각 배열의 요소마다 체이닝 기법은 다차원 배열이 생성되지만, linearProbing기법의 경우 [index, value] Tuple 형식의 1차원 배열을 갖습니다.
   * @param {string} key
   * @param {T} value
   * @memberof HashTable
   */
  linearProbingSave(key: string, value: T): void {
    let index_key = this.hashCode(key) // 해쉬코드 값만 얻어낸다.
    let hash_address = this.hash_func(this.hashCode(key)); // 해쉬코드를 8로 나눈 나머지값을 구한다.

    
    if (!!this.hash_table[hash_address]) {
      // hash_table에서 해쉬 주소값으로 조회 후 있는 경우
      // 시작 지점을 hash_address를 기준으로 잡고 hash_table의 길이만큼 순회합니다.
      for (let index = hash_address; index < this.hash_table.length; index++) {
        if (!this.hash_table[index]) {
          // 순회를 돌다가 비어있는 것을 만난 경우, 거기에 [index_key, value]형식으로 넣어주고 반복문을 빠져나옵니다.
          this.hash_table[index] = [index_key, value]
          break;
        } else if (this.hash_table[index][0] === index_key) {
          // 순회를 도는데 [index_key, value] 형식으로 저장되어있는 테이블 요소에 첫번째인 index_key값과 넣을려고하는 데이터의 index_key가 동일한 경우
          // 값을 오버라이딩 해줍니다.
          this.hash_table[index][1] = value;
          break;
        }
      }
    } else {
      // hash_table에서 해쉬 주소값 조회 후 없는 경우
      let result:[number, T] = [index_key, value]
      this.hash_table[hash_address] = result; // 요소가 1차원 배열이기에 체이닝기법이랑 다르게 배열을 한번더 감싸지 않는다. 
    }
  }

  linearProbingRead(key: string): T | undefined {
    let index_key = this.hashCode(key) // 해쉬코드 값만 얻어낸다.
    let hash_address = this.hash_func(this.hashCode(key)); // 해쉬코드를 8로 나눈 나머지값을 구한다.

    if (!!this.hash_table[hash_address]) {
      // hash_table에서 해쉬 주소값으로 조회 후 있는 경우
      // 시작 지점을 hash_address를 기준으로 잡고 hash_table의 길이만큼 순회합니다.
      for (let index = hash_address; index < this.hash_table.length; index++) {
          if (this.hash_table[index][0] === index_key) {
          return this.hash_table[index][1];
        }
      }
      return undefined;
    } else {
      return undefined
    }
  }
}

const hashTable = new HashTable<any>(8);

// 일반 해쉬테이블 호출
function checkNormalHashTable(): void {
  hashTable.save_data('Andy', {title: '123'});
  hashTable.save_data('Dave', {title: '456'});
  hashTable.save_data('Trump', {title: '789'});
  hashTable.save_data('Abcd', {title: '7890'});

  console.log(hashTable.read_data('Andy'));
  console.log(hashTable.read_data('Dave'));
  console.log(hashTable.read_data('Trump'));
  console.log(hashTable.read_data('Abcd'));
}

// 체이닝 기법 해쉬테이블 호출
function checkChaining():void {
  hashTable.chainingSaveData('Dd', '1201023010')
  hashTable.chainingSaveData('Data', '3301023010')
  hashTable.chainingSaveData('Data', '111111111');
  hashTable.chainingSaveData('Trump', '12345678')
  // console.log(hashTable.hash_table)

  console.log(hashTable.chainingReadData('Dd')); // 1201023010
  console.log(hashTable.chainingReadData('Data')); // 111111111
  console.log(hashTable.chainingReadData('Trump')); // 12345678
}

function checkLinearProbing(): void {
  // linearProbing 해쉬 테이블 호출
  hashTable.linearProbingSave('Dd', '1201023010');
  hashTable.linearProbingSave('De', '1201023010');
  hashTable.linearProbingSave('Abc', '1201023010');
  hashTable.linearProbingSave('Abd', '1201023010');
  hashTable.linearProbingSave('Data', '3301023010');
  hashTable.linearProbingSave('Datb', '3301023010');
  hashTable.linearProbingSave('Data', '111111111');
  hashTable.linearProbingSave('Trump', '12345678');
  hashTable.linearProbingSave('Trump', 'Trump');
  hashTable.linearProbingSave('Trumh', 'Trumh');

  console.log(hashTable.linearProbingRead('Trump')); // Trump
  console.log(hashTable.linearProbingRead('Data')); // 111111
}


// 빈번한 충돌을 개선하는 기법
// - 테이블 크기를 늘려준다. (공간과 탐색 시간을 맞바꾸는 기법)