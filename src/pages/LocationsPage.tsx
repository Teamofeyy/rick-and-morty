import { useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import FilterSelect from "../components/FilterSelect";
import SearchInput from "../components/SearchInput"
import { Locations } from "../components/Locations";

const LocationsPage = () => {
  const [q, setQ] = useState<string>("");
  const qDebounced = useDebouncedValue(q, 400);

  return (
    <div>
      <section aria-labelledby='hero-title' className="flex justify-center">
        <div className='container flex justify-center'>
          <img className="mt-6" src="../assets/rick-and-morty.svg" alt="Rick & Morty" />
          <h1 id="hero-title" className="sr-only">
            Персонажи Rick & Morty
          </h1>
        </div>
      </section>

      <section aria-labelledby="filters-title" className="py-8 mb-16 flex justify-center ">
        <div className="container flex justify-center gap-5">
          <h2 id="filters-title" className="sr-only">Поиск по имени, фильтры.</h2>
          <SearchInput value={q} onChange={setQ} placeholder="Filter by name..." />
          <FilterSelect name="Type" />
          <FilterSelect name="Dimension" />
        </div>
      </section>

      <section aria-labelledby="results-title">
        <div className="flex justify-center"><Locations q={qDebounced} /></div>
      </section>
    </div>
  )
}

export default LocationsPage