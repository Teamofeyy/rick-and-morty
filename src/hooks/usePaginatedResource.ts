import { useInfiniteQuery, type QueryKey } from "@tanstack/react-query";
import type { Info } from "@/api/types";

export function usePaginatedResource<T, Q = undefined>(
  queryKey: QueryKey,
  fetchPage: (page: number, query?: Q) => Promise<Info<T>>,
  queryArg?: Q
) {
  return useInfiniteQuery<Info<T>>({
    queryKey: [...(Array.isArray(queryKey) ? queryKey : [queryKey]), queryArg] as QueryKey,
    queryFn: ({ pageParam = 1 }) => fetchPage(pageParam as number, queryArg),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.info?.next;
      if (!nextUrl) return undefined;
      const url = new URL(nextUrl);
      const page = url.searchParams.get("page");
      return page ? Number(page) : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
}