import { useSearchParams } from "react-router-dom";
import { useDebouncedValue } from "./useDebouncedValue";

export function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const debouncedSearch = useDebouncedValue(search.trim(), 400);

  const setSearch = (value: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (value) nextParams.set("q", value);
      else nextParams.delete("q");

      return nextParams;
    }, { replace: true });
  };

  return { search, debouncedSearch, setSearch };
}
