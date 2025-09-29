type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  name?: string;
}

const SearchInput = ({ value, onChange, placeholder, name = "q", }: Props) => {
  return (

    <div className="relative">
      <label className="w-full sr-only" htmlFor={name}>
        {placeholder}
      </label>

      <img src="/assets/search.svg" alt="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6" />

      <input
        id={name}
        name={name}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex items-center gap-2 shrink-0 self-stretch w-60 border border-grey rounded-lg p-4 pl-10"
        aria-label={placeholder}
      />
    </div>

  )
}

export default SearchInput