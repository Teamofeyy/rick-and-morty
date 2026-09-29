import BrowsePage from "@/components/BrowsePage";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { Characters } from "../components/Characters";

const HomePage = () => {
  const { search, debouncedSearch, setSearch } = useSearchQuery();

  return (
    <BrowsePage
      title="Characters"
      heroSrc="/assets/big-logo.webp"
      heroWidth={600}
      heroHeight={200}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Filter by name..."
    >
      <Characters search={debouncedSearch} />
    </BrowsePage>
  )
}

export default HomePage
