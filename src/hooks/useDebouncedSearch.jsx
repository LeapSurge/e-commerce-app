import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce.jsx";

export function useDebouncedSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(queryFromUrl);
  const debouncedValue = useDebounce(inputValue, 500);

  // 当防抖后的值变化时，更新URL
  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (debouncedValue) {
        newParams.set("q", debouncedValue);
      } else {
        newParams.delete("q");
      }
      return newParams;
    });
  }, [debouncedValue, setSearchParams]);

  // 当URL从外部变化时（比如浏览器后退），同步更新inputValue
  useEffect(() => {
    if (queryFromUrl !== inputValue) {
      setInputValue(queryFromUrl);
    }
  }, [queryFromUrl]);

  return {
    inputValue,
    setInputValue,
  };
}
