import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 py-1.5 shadow-header-shadow">
      <Link to="/">
        <img
          src="/assets/logo-black 1.svg"
          alt="Rick & Morty Logo"
          width="46"
          height="49"
          loading="lazy"
        />
      </Link>

      <nav className="hidden md:flex">
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

      <button type="button" className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <img src="/assets/close-icon.svg" alt="" />
        ) : (
          <img src="/assets/burger-icon.svg" alt="" />
        )}
      </button>
    </header>
  );
};

export default Header;