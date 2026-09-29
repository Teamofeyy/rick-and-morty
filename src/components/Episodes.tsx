import type { Episode } from "../api/types";
import Card from "./Card";
import { getEpisodes } from "../api/services";
import { usePaginatedResource } from "@/hooks/usePaginatedResource";
import ResourceList from "./ResourceList";

type EpisodesProps = { search: string };

const Episodes = ({ search }: EpisodesProps) => {
  const query = usePaginatedResource<Episode>(
    ["episodes"],
    getEpisodes,
    search,
  );

  return (
    <ResourceList
      pages={query.data?.pages}
      status={query.status}
      hasNextPage={query.hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      onLoadMore={() => void query.fetchNextPage()}
      renderItem={(episode) => (
        <Card
          key={episode.id}
          title={episode.name}
          description={episode.air_date}
          sndDesc={episode.episode}
          to={`/episode/${episode.id}`}
          className="justify-center items-center h-[128px] [&>div]:flex [&>div]:flex-col [&>div]:text-center [&>div]:items-center [&>div]:justify-center"
        />
      )}
      resourceName="episodes"
    />
  );
};

export default Episodes;
