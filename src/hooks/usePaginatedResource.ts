import { useInfiniteQuery, type QueryKey } from "@tanstack/react-query";
import type { PageFetcher } from "@/api/services";

export function usePaginatedResource<T>(
  queryKey: QueryKey,
  fetchPage: PageFetcher<T>,
  search: string,
) {
  return useInfiniteQuery({
    queryKey: [...queryKey, { search }],
    queryFn: ({ pageParam, signal }) => fetchPage({ page: pageParam, search, signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.info.next;
      if (!nextUrl) return undefined;

      const nextPage = Number(new URL(nextUrl).searchParams.get("page"));
      return Number.isSafeInteger(nextPage) && nextPage > 0 ? nextPage : undefined;
    },
  });
}
