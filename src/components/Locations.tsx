import type { Location } from "../api/types";
import { getLocations } from "../api/services";
import Card from "./Card";
import { usePaginatedResource } from "@/hooks/usePaginatedResource";
import ResourceList from "./ResourceList";

type LocationsProps = { search: string };

export const Locations = ({ search }: LocationsProps) => {
  const query = usePaginatedResource<Location>(
    ["locations"],
    getLocations,
    search,
  );

  return (
    <ResourceList
      pages={query.data?.pages}
      status={query.status}
      hasNextPage={query.hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      onLoadMore={() => void query.fetchNextPage()}
      renderItem={(location) => (
        <Card
          key={location.id}
          title={location.name}
          description={location.type || "Unknown"}
          to={`/location/${location.id}`}
          className="justify-center items-center h-[128px] [&>div]:flex [&>div]:flex-col [&>div]:text-center [&>div]:items-center [&>div]:justify-center"
        />
      )}
      resourceName="locations"
    />
  );
};
