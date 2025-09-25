import { Link } from "react-router"

const Header = () => {
  return (
    <header className="flex bg-white justify-between items-center min-h-header-hight px-header-padding shadow-header-shadow">
      <Link to={"/"}>
        <img src="/assets/logo-black 1.svg" alt="Rick & Morty Logo" width="46" height="49" loading="lazy" />
      </Link>
      <nav>
        <ul className="flex gap-6 text-[18px] font-bold font-karla">
          <li>
            <Link to="/">Characters</Link>
          </li>
          <li>
            <Link to="/">Locations</Link>
          </li>
          <li>
            <Link to="/">Episodes</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header