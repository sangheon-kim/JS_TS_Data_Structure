export default abstract class Sort {
  constructor() {

  }

  swap(a: number, b: number, bigger: boolean = false):boolean {
    console.log(`a=${a}, b=${b}`)
      if (a < b) {
        return false;
      } else {
        return true;
      }
  }

  abstract sort(args: number[]):number[];
}

