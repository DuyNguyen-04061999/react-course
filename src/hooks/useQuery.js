import { localStorageCache, sessionStorageCache } from "@/utils/cache";
import { useEffect, useReducer, useRef } from "react";

const initialState = {
  data: {},
  loading: true,
  error: new Error(""),
  status: "idle",
};

const SET_DATA = "setData";
const SET_LOADING = "setLoading";
const SET_ERROR = "setError";
const SET_STATUS = "setStatus";

const queryReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_DATA: {
      return { ...state, data: payload };
    }
    case SET_LOADING: {
      return { ...state, loading: payload };
    }
    case SET_ERROR: {
      return { ...state, error: payload };
    }
    case SET_STATUS: {
      return { ...state, status: payload };
    }

    default:
      return state;
  }
};

const useQuery = ({
  queryFn,
  queryKey,
  cacheTime,
  enabled = true,
  storeDriver = "localStorage",
  dependencyList = [],
  onSuccess,
  onError,
} = {}) => {
  const [{ data, loading, error, status }, dispatch] = useReducer(
    queryReducer,
    initialState
  );
  const cache =
    storeDriver === "localStorage" ? localStorageCache : sessionStorageCache;
  const fetchRef = useRef();
  useEffect(() => {
    if (typeof fetchRef.current === "boolean") {
      fetchRef.current = true;
    }
  }, [dependencyList]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [queryKey, enabled].concat(...dependencyList));

  const fetchData = async () => {
    try {
      dispatch({ type: SET_STATUS, payload: "pending" });
      let res;
      if (queryKey && !fetchRef.current) {
        res = cache.get(queryKey);
      }

      if (!res) {
        res = await queryFn();
      }

      dispatch({ type: SET_DATA, payload: res });
      dispatch({ type: SET_STATUS, payload: "success" });
      onSuccess?.(res);
      if (queryKey) {
        let expire = cacheTime;
        if (cacheTime) {
          expire += Date.now();
        }
        cache.set(queryKey, res, expire);
      }
      dependencyList?.length > 0 && (fetchRef.current = false);
    } catch (error) {
      console.error(error);
      dispatch({ type: SET_ERROR, payload: error });
      dispatch({ type: SET_STATUS, payload: "error" });
      onError?.(error);
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  return {
    data,
    loading,
    error,
    status,
  };
};
export { useQuery };
