/* eslint prefer-rest-params: ["off"] */
/* eslint no-alert: ["off"] */
/* eslint func-names: ["off"] */

export function getLabelByOrigin(origin) {
  switch (origin) {
    case "africa" || "Africa":
      return "Африка";
    case "asia" || "Asia":
      return "Азия";
    case "europe" || "Europe":
      return "Европа";
    case "usa" || "Usa":
      return "США";
    default:
      return origin;
  }
}

export function stringifyParamsArr(arr) {
  if (!arr || typeof arr !== "object" || !arr.length) return "";
  if (arr.length === 1) return arr[0].toString();
  let str = arr.pop();
  arr.forEach((val) => {
    str = str.concat(",", val.toString());
  });
  return str;
}

// Receives Array e.g. ["usa","asia"]
// Returns Array e.g. [{value: "usa", label: "USA"}, {value: "asia", label: "Asia"}]
export function originsToSelectOptions(arr) {
  if (!arr || typeof arr !== "object" || !arr.length) return [];
  const originsSelect = arr.map((val) => {
    return {
      value: val.value || val,
      label: getLabelByOrigin(val.value || val),
    };
  });
  return originsSelect;
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

export function calcTotalPrice(productArr) {
  if (!productArr || !productArr.length) return 0;
  const totalCartPrice = productArr.reduce((acc, cur) => {
    return acc + cur.product.price * cur.count;
  }, 0);
  return totalCartPrice;
}

export function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

export const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};
