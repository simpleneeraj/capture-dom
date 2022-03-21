// const uniqArray = (array: any[]) => {
//   return array.sort().filter((item, pos, arr) => {
//     return !pos || item != arr[pos - 1];
//   });
// };

const uniqArray = (array: Iterable<any>) => {
  return Array.from(new Set(array));
};

export default uniqArray;
