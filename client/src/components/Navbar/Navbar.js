import "./Navbar.css";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="navbar">

      <div className="navlinks">
        {Auth.loggedIn() ? (
          <>
            <Link className="navitem" to="/">
              Dashboard
            </Link>
            <Link className="navitem" to="/account">
              My Account
            </Link>
            <Link className="navitem" onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="navitem" to="/login">
              Login
            </Link>
            <Link className="navitem" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
