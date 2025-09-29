import React from "react";
import { getCharacters } from "../api/services";
import Card from "./Card";
import type { Character, Info } from "../api/types";
import { useNavigate } from "react-router";
import { usePaginatedResource } from "@/hooks/usePaginatedResource";
import CardSkeleton from "./Skeleton";

type CharactersProps = { q?: string };

export const Characters: React.FC<CharactersProps> = ({ q }) => {
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePaginatedResource<Character, string | undefined>(["characters"], getCharacters, q);


  if (status === "pending") {
    return (
      <div className="flex container flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 12 }).map((_, idx) => (
            <CardSkeleton variant="character" key={idx} />
          ))}
        </div>
      </div>
    );
  }
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
          className="bg-primary-light text-sm font-roboto font-medium leading-4 tracking-[1.25px] text-primary-accent py-2.5 px-8 rounded-sm mt-6 uppercase transition hover:bg-primary-accent/10 active:scale-[0.98] disabled:opacity-60"
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};