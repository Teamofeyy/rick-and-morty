import { useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import SearchInput from "../components/SearchInput"
import Episodes from "../components/Episodes";

const EpisodesPage = () => {
  const [q, setQ] = useState<string>("");
  const qDebounced = useDebouncedValue(q, 400);

  return (
    <div>
      <section aria-labelledby='hero-title' className="flex justify-center">
        <div className='container flex justify-center'>
          <img className="mt-6" src="../assets/rick-and-morty2.svg" alt="Rick & Morty" />
          <h1 id="hero-title" className="sr-only">
            Персонажи Rick & Morty
          </h1>
        </div>
      </section>

      <section aria-labelledby="filters-title" className="py-8 mb-16 flex justify-center ">
        <div className="container flex justify-center gap-5">
          <h2 id="filters-title" className="sr-only">Поиск по имени</h2>
          <SearchInput value={q} onChange={setQ} placeholder="Filter by name or episode (ex. S01 or S01E02)" />
        </div>
      </section>

      <section aria-labelledby="results-title">
        <div className="flex justify-center"><Episodes q={qDebounced} /></div>
      </section>
    </div>
  )
}

export default EpisodesPage