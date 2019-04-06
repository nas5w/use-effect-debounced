import { useEffect } from "react";

const useEffectDebounced = (func, values, time) => {
  useEffect(() => {
    let db = setTimeout(() => {
      func();
    }, time);

    return () => clearTimeout(db);
  }, values);
};

export default useEffectDebounced;
