import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="logo">
                <Link to="/">Fitness App Logo</Link>
            </div>
            <div className="header-info">
                <p>Welcome to Fitness App</p> {/* Static elements */}
            </div>
        </header>
    );
}

export default Header;
