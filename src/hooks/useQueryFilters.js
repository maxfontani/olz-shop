import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useQueryObj from "./useQueryObj";

export default function useQueryFilters(filters) {
  const location = useLocation();
  const history = useHistory();
  const [firstLoad, setFirstLoad] = useState(true);
  const qObj = useQueryObj();

  function getQFilters(qsObj) {
    if (!firstLoad || !qsObj || Object.keys(qsObj).length === 0)
      return undefined;
    const qFil = {};
    if (!qsObj || typeof qsObj !== "object") return qFil;
    Object.entries(qsObj).forEach(([key, val]) => {
      if (key in filters) {
        if (key === "page" || key === "perPage") {
          qFil[key] = Number(val);
        } else {
          qFil[key] = val;
        }
      }
    });
    return qFil;
  }

  function setUrlParams(filtersObj, historyObj) {
    const params = new URLSearchParams(filtersObj);
    historyObj.replace({
      pathname: location.pathname,
      search: `?${params.toString()}`,
    });
  }

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      setUrlParams(filters, history);
    }
  }, [filters]);

  return getQFilters(qObj);
}
