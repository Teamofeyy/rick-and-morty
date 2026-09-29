import type { ReactNode } from "react";
import type { PaginatedResponse } from "@/api/types";
import CardSkeleton from "./Skeleton";

type ResourceListProps<T> = {
  pages: PaginatedResponse<T>[] | undefined;
  status: "pending" | "error" | "success";
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  renderItem: (item: T) => ReactNode;
  resourceName: string;
  skeletonVariant?: "character";
};

export default function ResourceList<T>({
  pages,
  status,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
  renderItem,
  resourceName,
  skeletonVariant,
}: ResourceListProps<T>) {
  if (status === "pending") {
    return (
      <div className="container flex flex-col items-center gap-6" aria-busy="true">
        <span className="sr-only">Loading {resourceName}</span>
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 12 }, (_, index) => (
            <CardSkeleton variant={skeletonVariant} key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return <p role="alert">Unable to load {resourceName}. Please try again.</p>;
  }

  const items = pages?.flatMap((page) => page.results) ?? [];

  return (
    <div className="container flex flex-col items-center gap-6">
      {items.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {items.map(renderItem)}
        </div>
      ) : (
        <p>No {resourceName} found.</p>
      )}

      {hasNextPage && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
          className="bg-primary-light text-sm font-roboto font-medium leading-4 tracking-[1.25px] text-primary-accent py-2.5 px-8 rounded-sm mt-6 uppercase transition hover:bg-primary-accent/10 active:scale-[0.98] disabled:opacity-60"
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
