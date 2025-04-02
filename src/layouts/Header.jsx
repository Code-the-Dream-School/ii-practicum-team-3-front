import { Link } from "react-router-dom";
import Navbar from "./NavBar";

function Header() {
  return (
    <header>
      <div className="logo">
        <Link to="/">Fitness App Logo</Link>
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
