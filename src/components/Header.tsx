import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex bg-white justify-between items-center min-h-header-height px-4 sm:px-8 lg:px-header-padding shadow-header-shadow">
      <Link to="/" aria-label="Rick and Morty characters">
        <img
          src="/assets/logo.webp"
          alt=""
          width="46"
          height="49"
        />
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex gap-3 sm:gap-6 text-sm sm:text-[18px] font-bold font-karla">
          <li>
            <Link to="/" className="transition-colors hover:text-[#858585] active:opacity-80">Characters</Link>
          </li>
          <li>
            <Link to="/locations" className="transition-colors hover:text-[#858585] active:opacity-80">Locations</Link>
          </li>
          <li>
            <Link to="/episodes" className="transition-colors hover:text-[#858585] active:opacity-80">Episodes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
