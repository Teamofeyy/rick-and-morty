import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Character, Episode } from "../api/types";
import InfoRow from "../components/InfoRow";
import PageMessage from "@/components/PageMessage";
import {
  getCharacterById,
  getResourceIdFromUrl,
  getResourcesByUrls,
} from "@/api/services";
import { parseResourceId } from "@/utils/resourceId";

const CharacterPage = () => {
  const { id: routeId } = useParams<{ id: string }>();
  const id = parseResourceId(routeId);

  const characterQuery = useQuery<Character>({
    queryKey: ["character", id],
    queryFn: ({ signal }) => {
      if (id === null) throw new Error("A valid character ID is required");
      return getCharacterById(id, signal);
    },
    enabled: id !== null,
  });

  const episodeUrls = characterQuery.data?.episode.slice(0, 4) ?? [];

  const episodesQuery = useQuery<Episode[]>({
    queryKey: ["episodes", "character", id, episodeUrls],
    queryFn: ({ signal }) => getResourcesByUrls<Episode>("episode", episodeUrls, signal),
    enabled: id !== null && episodeUrls.length > 0,
  });

  if (id === null) return <PageMessage error>Invalid character ID.</PageMessage>;
  if (characterQuery.isPending) return <PageMessage>Loading character...</PageMessage>;
  if (characterQuery.isError) return <PageMessage error>Unable to load this character.</PageMessage>;

  const character = characterQuery.data;
  const locationId = getResourceIdFromUrl(character.location.url, "location");

  return (
    <div className="flex justify-center">
      <div className="container flex flex-col justify-center">
        <div className="flex flex-col gap-4 justify-center items-center py-4 mb-10">
          <img
            src={character.image}
            alt={character.name}
            width="300"
            height="300"
            className="w-[300px] rounded-full border-[5px] border-[#F2F2F7]"
          />
          <h1 className="text-[#081F32] font-roboto font-normal text-4xl sm:text-5xl text-center">{character.name}</h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex flex-col flex-1">
            <h2 className="headline">Information</h2>
            <InfoRow label="Gender" value={character.gender} />
            <InfoRow label="Status" value={character.status} />
            <InfoRow label="Species" value={character.species} />
            <InfoRow label="Origin" value={character.origin.name} />
            <InfoRow label="Type" value={character.type || "Unknown"} />
            <InfoRow
              label="Location"
              value={character.location.name}
              to={locationId ? `/location/${locationId}` : undefined}
            />
          </div>

          <div className="flex flex-col flex-1">
            <h2 className="headline">Episodes</h2>
            {episodesQuery.isLoading && <p>Loading episodes...</p>}
            {episodesQuery.isError && <p role="alert">Unable to load episodes.</p>}
            {episodesQuery.data?.map((episode) => (
              <InfoRow
                key={episode.id}
                label={episode.episode}
                value={episode.name}
                secondaryValue={episode.air_date}
                to={`/episode/${episode.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterPage
