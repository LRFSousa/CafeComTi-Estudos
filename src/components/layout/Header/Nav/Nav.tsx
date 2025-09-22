import NavAvatar from "./NavAvatar";
import NavMessage from "./NavMessage";
import NavNotice from "./NavNotice";

function Nav() {
  return (
    <nav className="header-nav ml-auto">
      <ul className="inline-flex items-center gap-6 list-none m-0 p-0 mr-4">
        <li>
          <NavNotice />
        </li>
        <li>
          <NavMessage />
        </li>
        <li>
          <NavAvatar />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
