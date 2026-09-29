import { getCharacters } from "../api/services";
import type { Character } from "../api/types";
import { usePaginatedResource } from "@/hooks/usePaginatedResource";
import CharacterCard from "./CharacterCard";
import ResourceList from "./ResourceList";

type CharactersProps = { search: string };

export const Characters = ({ search }: CharactersProps) => {
  const query = usePaginatedResource<Character>(
    ["characters"],
    getCharacters,
    search,
  );

  return (
    <ResourceList
      pages={query.data?.pages}
      status={query.status}
      hasNextPage={query.hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      onLoadMore={() => void query.fetchNextPage()}
      renderItem={(character) => <CharacterCard character={character} key={character.id} />}
      resourceName="characters"
      skeletonVariant="character"
    />
  );
};
