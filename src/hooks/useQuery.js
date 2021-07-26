// A custom hook that builds on useLocation to parse
// the query string for you.
// https://reactrouter.com/web/example/query-parameters

import { useLocation } from "react-router-dom";

export default function useQuery() {
  return new URLSearchParams(useLocation().search);
}
