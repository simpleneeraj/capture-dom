function toArray<T>(arrayLike: any): T[] {
  const arr: T[] = [];
  for (let i = 0, l = arrayLike.length; i < l; i += 1) {
    arr.push(arrayLike[i]);
  }
  return arr;
}

export default toArray;
