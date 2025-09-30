import { useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import FilterSelect from "../components/FilterSelect";
import SearchInput from "../components/SearchInput"
import { Characters } from "../components/Characters";
import AdvancedFilters from "@/components/AdvancedFilters";

const HomePage = () => {
  const [q, setQ] = useState<string>("");
  const qDebounced = useDebouncedValue(q, 400);

  return (
    <div className="">
      <section aria-labelledby='hero-title' className="flex justify-center">
        <div className='container flex justify-center'>
          <img className="mt-6 w-[312px] sm:w-[450px] " src="../assets/big-logo.svg" alt="Rick & Morty" />
          <h1 id="hero-title" className="sr-only">
            Персонажи Rick & Morty
          </h1>
        </div>
      </section>

      <section aria-labelledby="filters-title" className="py-8 mb-16 flex flex-col justify-center items-center">
        <div className="container flex justify-center gap-5 md:px-6">
          <h2 id="filters-title" className="sr-only">Поиск по имени, фильтры.</h2>
          <SearchInput value={q} onChange={setQ} placeholder="Filter by name..." />
          <FilterSelect name="Species" />
          <FilterSelect name="Gender" />
          <FilterSelect name="Status" />
        </div>
        <AdvancedFilters />
      </section>

      <section aria-labelledby="results-title">
        <div className="flex justify-center"><Characters q={qDebounced} /></div>
      </section>
    </div>
  )
}

export default HomePage