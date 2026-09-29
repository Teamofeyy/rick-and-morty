import type { ReactNode } from "react";
import SearchInput from "./SearchInput";

type BrowsePageProps = {
  title: string;
  heroSrc: string;
  heroWidth: number;
  heroHeight: number;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  searchClassName?: string;
  children: ReactNode;
};

export default function BrowsePage({
  title,
  heroSrc,
  heroWidth,
  heroHeight,
  search,
  onSearchChange,
  searchPlaceholder,
  searchClassName,
  children,
}: BrowsePageProps) {
  return (
    <>
      <section aria-labelledby="page-title" className="flex justify-center">
        <div className="container flex justify-center">
          <img
            className="mt-6 max-h-[210px]"
            src={heroSrc}
            alt=""
            width={heroWidth}
            height={heroHeight}
          />
          <h1 id="page-title" className="sr-only">{title}</h1>
        </div>
      </section>

      <section aria-label={`Search ${title.toLowerCase()}`} className="py-8 mb-8 sm:mb-16 flex justify-center">
        <div className="container flex justify-center">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            className={searchClassName}
          />
        </div>
      </section>

      <section aria-label={`${title} results`}>
        <div className="flex justify-center">{children}</div>
      </section>
    </>
  );
}
