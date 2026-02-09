import { Link } from "react-router-dom";
import "./FloatingIcons.css";

export default function FloatingIcons() {
  return (
    <div className="floating-icons">
      <Link to="/" title="Home">
        🏠
      </Link>

      <Link to="/finder" title="Finder">
        🔍
      </Link>

      <Link to="/favorites" title="Favorites">
        ❤️
      </Link>

      <Link to="/history" title="History">
        📜
      </Link>
    </div>
  );
}
