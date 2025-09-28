import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import fetchCharacters from "../api/axios.api";
import Card from "./Card";
import type { Character, Info } from "../api/types";
import { useNavigate } from "react-router";

export const Characters: React.FC = () => {
  const navigate = useNavigate();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<Info<Character>>({
    queryKey: ["characters"],
    queryFn: ({ pageParam = 1 }) => fetchCharacters(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.info?.next;
      if (!nextUrl) return undefined;
      const url = new URL(nextUrl);
      const page = url.searchParams.get("page");
      return page ? Number(page) : undefined;
    },
  });

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error loading characters</p>;

  return (
    <div className="flex container flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-4">
        {data?.pages.flatMap((page: Info<Character>) =>
          page.results?.map((char: Character) => (
            <Card
              key={char.id}
              image={char.image}
              title={char.name}
              description={char.species}
              onClick={() => navigate(`/character/${char.id}`)}
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