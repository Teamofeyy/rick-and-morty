import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Episode, Character } from "../api/types";
import CharacterCard from "@/components/CharacterCard";
import PageMessage from "@/components/PageMessage";
import { getEpisodeById, getResourcesByUrls } from "@/api/services";
import { parseResourceId } from "@/utils/resourceId";

export default function EpisodePage() {
  const { id: routeId } = useParams<{ id: string }>();
  const id = parseResourceId(routeId);

  const episodeQuery = useQuery<Episode>({
    queryKey: ["episode", id],
    queryFn: ({ signal }) => {
      if (id === null) throw new Error("A valid episode ID is required");
      return getEpisodeById(id, signal);
    },
    enabled: id !== null,
  });

  const castUrls = episodeQuery.data?.characters ?? [];
  const castQuery = useQuery<Character[]>({
    queryKey: ["characters", "episode", id, castUrls],
    queryFn: ({ signal }) => getResourcesByUrls<Character>("character", castUrls, signal),
    enabled: id !== null && castUrls.length > 0,
  });

  if (id === null) return <PageMessage error>Invalid episode ID.</PageMessage>;
  if (episodeQuery.isPending) return <PageMessage>Loading episode...</PageMessage>;
  if (episodeQuery.isError) return <PageMessage error>Unable to load this episode.</PageMessage>;

  const episode = episodeQuery.data;

  return (
    <div className="container flex flex-col items-center mx-auto py-[30px]">
      <h1 className="text-[#081F32] font-roboto text-4xl text-center">{episode.name}</h1>

      <dl className="flex justify-center gap-12 sm:gap-52 mt-6">
        <div>
          <dt className="dl-heading mb-0">Air date</dt>
          <dd className="dl-desc">{episode.air_date}</dd>
        </div>
        <div>
          <dt className="dl-heading mb-0">Episode</dt>
          <dd className="dl-desc">{episode.episode}</dd>
        </div>
      </dl>

      <h2 className="headline self-start pt-16 pb-6">Cast</h2>
      {castQuery.isLoading && <p>Loading cast...</p>}
      {castQuery.isError && <p role="alert">Unable to load the cast.</p>}
      {castQuery.data && (
        <div className="flex flex-wrap justify-center gap-4">
          {castQuery.data.map((character) => (
            <CharacterCard character={character} key={character.id} />
          ))}
        </div>
      )}
    </div>
  );
}
