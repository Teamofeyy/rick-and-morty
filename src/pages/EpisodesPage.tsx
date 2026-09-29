import BrowsePage from "@/components/BrowsePage";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import Episodes from "../components/Episodes";

const EpisodesPage = () => {
  const { search, debouncedSearch, setSearch } = useSearchQuery();

  return (
    <BrowsePage
      title="Episodes"
      heroSrc="/assets/rick-and-morty2.webp"
      heroWidth={270}
      heroHeight={210}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Filter by episode name..."
      searchClassName="sm:w-[500px]"
    >
      <Episodes search={debouncedSearch} />
    </BrowsePage>
  )
}

export default EpisodesPage
