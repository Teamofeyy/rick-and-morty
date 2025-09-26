import { useState } from "react";
import FilterSelect from "../components/FilterSelect";
import SearchInput from "../components/SearchInput"

const HomePage = () => {
  const [q, setQ] = useState<string>("");

  return (
    <>
      <section aria-labelledby='hero-title'>
        <div className='container flex justify-center'>
          <img className="mt-6" src="../assets/big-logo.svg" alt="Rick & Morty" />
          <h1 id="hero-title" className="sr-only">
            Персонажи Rick & Morty
          </h1>
        </div>
      </section>

      <section aria-labelledby="filters-title" className="py-8">
        <div className="container flex justify-center gap-5">
          <h2 id="filters-title" className="sr-only">Поиск по имени, фильтры.</h2>
          {/* <Filters /> */}
          <SearchInput value={q} onChange={setQ} placeholder="Filter by name..." />
          <FilterSelect name="Species" />
          <FilterSelect name="Gender" />
          <FilterSelect name="Status" />
        </div>
      </section>
    </>
  )
}

export default HomePage