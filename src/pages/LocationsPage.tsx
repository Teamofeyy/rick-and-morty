import BrowsePage from "@/components/BrowsePage";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { Locations } from "../components/Locations";

const LocationsPage = () => {
  const { search, debouncedSearch, setSearch } = useSearchQuery();

  return (
    <BrowsePage
      title="Locations"
      heroSrc="/assets/rick-and-morty.webp"
      heroWidth={326}
      heroHeight={202}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Filter by name..."
      searchClassName="sm:w-[326px]"
    >
      <Locations search={debouncedSearch} />
    </BrowsePage>
  )
}

export default LocationsPage
