import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { Episode, Info } from "../api/types";

import Card from "./Card";
import { getEpisodes } from "../api/services";
import CardSkeleton from "./Skeleton";

type EpisodesProps = { q?: string };

const Episodes: React.FC<EpisodesProps> = ({ q }) => {
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<Info<Episode>>({
    queryKey: ["episodes", q],
    queryFn: ({ pageParam = 1 }) => getEpisodes(pageParam as number, q),
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

  if (status === "error") return <p>Error loading episodes</p>;

  return (
    <div className="flex container flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-4">
        {data?.pages.flatMap((page) =>
          page.results?.map((epi) => (
            <Card
              key={epi.id}
              title={epi.name}
              description={epi.air_date}
              sndDesc={epi.episode}
              onClick={() => navigate(`/episode/${epi.id}`)}
              className=" flex justify-center items-center w-[240px] h-[128px] [&>div]:flex [&>div]:flex-col [&>div]:text-center [&>div]:items-center [&>div]:justify-center"
            />
          )) ?? []
        )}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="bg-primary-light text-sm font-roboto font-medium leading-4 tracking-[1.25px] text-primary-accent py-2.5 px-8 rounded-sm mt-6 uppercase"
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default Episodes;