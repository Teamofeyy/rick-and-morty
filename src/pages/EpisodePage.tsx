import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Episode, Character } from "../api/types";
import Card from "../components/Card";
import { fetchResourcesByUrls, getEpisodeById } from "@/api/services";

export default function EpisodePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: episode,
    isLoading,
    error,
  } = useQuery<Episode>({
    queryKey: ["episode", id],
    queryFn: () => getEpisodeById(id!),
    enabled: !!id,
  });

  const { data: cast } = useQuery<Character[]>({
    queryKey: ["cast", id, episode?.characters],
    queryFn: () => fetchResourcesByUrls<Character>(episode!.characters),
    enabled: !!episode,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading episode</p>;

  return (
    <div className="container flex flex-col items-center mx-auto py-[30px]">
      <h1 className="text-[#081F32] font-roboto text-4xl">{episode?.name}</h1>

      <div className="flex justify-center gap-52 mt-6">
        <div>
          <h3 className="dl-heading mb-0">Air Date</h3>
          <p className="dl-desc">{episode?.air_date}</p>
        </div>
        <div>
          <h3 className="dl-heading mb-0">Episode</h3>
          <p className="dl-desc">{episode?.episode}</p>
        </div>
      </div>

      <h2 className="headline self-start pt-16 pb-6">Cast</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cast?.map((char) => (
          <Card
            key={char.id}
            image={char.image}
            title={char.name}
            description={char.species}
            onClick={() => navigate(`/character/${char.id}`)}
          />
        ))}
      </div>
    </div>
  );
}