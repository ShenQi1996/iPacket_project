import { Link } from "react-router-dom";

//bootstrap
import Nav from "react-bootstrap/Nav";

function Navbar() {
  return (
    <Nav className="me-auto">
      <Link to="/">Home</Link>

      <Link to="/LikedPage">LikedPage</Link>
    </Nav>
  );
}

export default Navbar;
