import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Location, Character } from "../api/types";
import Card from "../components/Card";
import { fetchResourcesByUrls, getLocationById } from "@/api/services";

export default function LocationPage() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<Location>({
    queryKey: ["location", id],
    queryFn: () => getLocationById(id!),
    enabled: !!id,
  });

  const { data: residents } = useQuery<Character[]>({
    queryKey: ["residents", id, data?.residents],
    queryFn: () => fetchResourcesByUrls<Character>(data!.residents),
    enabled: !!data,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading location</p>;

  return (
    <div className="container flex flex-col items-center mx-auto py-[30px]">
      <h1 className="text-[#081F32] font-roboto text-4xl">{data?.name}</h1>
      <div className="flex justify-center gap-52 mt-6">
        <div>
          <h3 className="dl-heading mb-0">Type</h3>
          <p className="dl-desc">{data?.type}</p>
        </div>
        <div>
          <h3 className="dl-heading mb-0">Dimension</h3>
          <p className="dl-desc">{data?.dimension}</p>
        </div>

      </div>


      <h2 className="headline self-start pt-16 pb-6">Residents</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {residents?.map((char) => (
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