import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios.api";
import type { Character, Episode } from "../api/types";
import InfoPlank from "../components/InfoPlank";

async function fetchCharacter(id: string) {
  const { data } = await api.get<Character>(`/character/${id}`);
  return data;
}

async function fetchEpisodes(urls: string[]) {
  const firstFour = urls.slice(0, 4)
  const responses = await Promise.all(firstFour.map((url) => api.get<Episode>(url)));
  return responses.map((r) => r.data);
}

const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<Character>({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id!),
    enabled: !!id,
  });

  const {
    data: episodes,
    isLoading: episodesLoading,
    error: episodesError,
  } = useQuery<Episode[]>({
    queryKey: ["episodes", id, data?.episode],
    queryFn: () => fetchEpisodes(data!.episode),
    enabled: !!data,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="flex justify-center">
      <div className="container flex flex-col justify-center">
        <div className="flex flex-col gap-4 justify-center items-center py-4 mb-10">
          <img src={data?.image} alt={data?.name} className="w-[300px] rounded-full border-[5px] border-[#F2F2F7]" />
          <h1 className="text-[#081F32] font-roboto font-normal text-5xl">{data?.name}</h1>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <h2 className="headline">Informations</h2>
            <InfoPlank title="Gender" desc={data?.gender} />
            <InfoPlank title="Status" desc={data?.status} />
            <InfoPlank title="Specie" desc={data?.species} />
            <InfoPlank title="Origin" desc={data?.gender} />
            <InfoPlank title="Type" desc={data?.type} />
            <InfoPlank title="Location" desc={data?.gender} />
          </div>

          <div className="flex flex-col">
            <h2 className="headline">Episodes</h2>
            {episodesLoading && <p>Loading episodes...</p>}
            {episodesError && <p>Failed to load episodes</p>}
            {episodes?.map((ep) => (
              <InfoPlank
                key={ep.id}
                title={ep.episode}
                desc={ep.name}
                sndDesc={ep.air_date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterPage