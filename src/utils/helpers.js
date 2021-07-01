function stringifyParamsArr(arr) {
  if (!arr || typeof arr !== 'object' || !arr.length) return '';
  if (arr.length === 1) return arr[0].toString();
  let str = arr.pop();
  arr.forEach((val) => {
    str = str.concat(',', val.toString());
  });
  return str;
}

export default stringifyParamsArr;
