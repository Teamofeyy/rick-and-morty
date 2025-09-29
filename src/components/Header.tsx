import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex bg-white justify-between items-center min-h-header-hight px-header-padding shadow-header-shadow">
      <Link to="/">
        <img
          src="/assets/logo-black 1.svg"
          alt="Rick & Morty Logo"
          width="46"
          height="49"
          loading="lazy"
        />
      </Link>

      <nav>
        <ul className="flex gap-6 text-[18px] font-bold font-karla">
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