import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Location, Character } from "../api/types";
import CharacterCard from "@/components/CharacterCard";
import PageMessage from "@/components/PageMessage";
import { getLocationById, getResourcesByUrls } from "@/api/services";
import { parseResourceId } from "@/utils/resourceId";

export default function LocationPage() {
  const { id: routeId } = useParams<{ id: string }>();
  const id = parseResourceId(routeId);

  const locationQuery = useQuery<Location>({
    queryKey: ["location", id],
    queryFn: ({ signal }) => {
      if (id === null) throw new Error("A valid location ID is required");
      return getLocationById(id, signal);
    },
    enabled: id !== null,
  });

  const residentUrls = locationQuery.data?.residents ?? [];
  const residentsQuery = useQuery<Character[]>({
    queryKey: ["characters", "location", id, residentUrls],
    queryFn: ({ signal }) => getResourcesByUrls<Character>("character", residentUrls, signal),
    enabled: id !== null && residentUrls.length > 0,
  });

  if (id === null) return <PageMessage error>Invalid location ID.</PageMessage>;
  if (locationQuery.isPending) return <PageMessage>Loading location...</PageMessage>;
  if (locationQuery.isError) return <PageMessage error>Unable to load this location.</PageMessage>;

  const location = locationQuery.data;

  return (
    <div className="container flex flex-col items-center mx-auto py-[30px]">
      <h1 className="text-[#081F32] font-roboto text-4xl text-center">{location.name}</h1>
      <dl className="flex justify-center gap-12 sm:gap-52 mt-6">
        <div>
          <dt className="dl-heading mb-0">Type</dt>
          <dd className="dl-desc">{location.type || "Unknown"}</dd>
        </div>
        <div>
          <dt className="dl-heading mb-0">Dimension</dt>
          <dd className="dl-desc">{location.dimension || "Unknown"}</dd>
        </div>
      </dl>

      <h2 className="headline self-start pt-16 pb-6">Residents</h2>
      {residentUrls.length === 0 && <p>No known residents.</p>}
      {residentsQuery.isLoading && <p>Loading residents...</p>}
      {residentsQuery.isError && <p role="alert">Unable to load residents.</p>}
      {residentsQuery.data && (
        <div className="flex flex-wrap justify-center gap-4">
          {residentsQuery.data.map((character) => (
            <CharacterCard character={character} key={character.id} />
          ))}
        </div>
      )}
    </div>
  );
}
