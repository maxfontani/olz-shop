export function stringifyParamsArr(arr) {
  if (!arr || typeof arr !== "object" || !arr.length) return "";
  if (arr.length === 1) return arr[0].toString();
  let str = arr.pop();
  arr.forEach((val) => {
    str = str.concat(",", val.toString());
  });
  return str;
}

export function calcLastPage(total, perPage) {
  if (perPage === 0 || total < 0 || perPage < 0) return 1;
  return Math.ceil(total / perPage) || 1;
}

export function range(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
}
