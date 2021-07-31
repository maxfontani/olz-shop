import { useLocation } from "react-router-dom";

export default function useQueryObj() {
  const query = new URLSearchParams(useLocation().search);
  const qQbj = {};
  query.forEach((val, key) => {
    qQbj[key] = val;
  });
  return qQbj;
}
