import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { Location, Info } from "../api/types";
import { getLocations } from "../api/services";
import Card from "./Card";
import CardSkeleton from "./Skeleton";

type LocationsProps = { q?: string };

export const Locations: React.FC<LocationsProps> = ({ q }) => {
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<Info<Location>>({
    queryKey: ["locations", q],
    queryFn: ({ pageParam = 1 }) => getLocations(pageParam as number, q),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.info?.next;
      if (!nextUrl) return undefined;
      const url = new URL(nextUrl);
      const page = url.searchParams.get("page");
      return page ? Number(page) : undefined;
    },
  });

  if (status === "pending") {
    return (
      <div className="flex container flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 12 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }
  if (status === "error") return <p>Error loading locations</p>;

  return (
    <div className="flex container flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-4">
        {data?.pages.flatMap((page) =>
          page.results?.map((loc) => (
            <Card
              key={loc.id}
              title={loc.name}
              description={loc.type || "Unknown"}
              onClick={() => navigate(`/location/${loc.id}`)}
              className=" flex justify-center items-center w-[240px] h-[128px] [&>div]:flex [&>div]:flex-col [&>div]:text-center [&>div]:items-center [&>div]:justify-center"
            />
          )) ?? []
        )}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="bg-primary-light text-sm font-roboto font-medium leading-4 tracking-[1.25px] text-primary-accent py-2.5 px-8 rounded-sm mt-6 uppercase transition hover:bg-primary-accent/10 active:scale-[0.98] disabled:opacity-60"
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};