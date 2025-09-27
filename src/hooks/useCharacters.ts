import { useInfiniteQuery } from "@tanstack/react-query";
import fetchCharacters from "../api/axios.api";
import type { Info, Character } from "../api/types";

export function useCharacters() {
  return useInfiniteQuery<Info<Character>, Error>({
    queryKey: ["characters"],
    queryFn: ({ pageParam }) =>
      fetchCharacters(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.info?.next;
      if (nextUrl) {
        const url = new URL(nextUrl);
        const nextPage = url.searchParams.get("page");
        return nextPage ? Number(nextPage) : undefined;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
}