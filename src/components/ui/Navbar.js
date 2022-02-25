import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { authenticated, user, signOut } = authContext;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Agenda React
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {authenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Events
                </Link>
              </li>
            )}
          </ul>
          {user ? (
            <Fragment>
              <span className="navbar-text">
                <Link className="nav-link" to={"/user"}>
                  {user.name}
                </Link>
              </span>
              <span className="navbar-text">
                <Link className="nav-link" onClick={() => signOut()} to="#">
                  Sign Out
                </Link>
              </span>
            </Fragment>
          ) : (
            <Fragment>
              <span className="navbar-text">
                <Link className="nav-link" to="/">
                  Login
                </Link>
              </span>
              <span className="navbar-text">
                <Link className="nav-link" to="/new-user">
                  Sign Up
                </Link>
              </span>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
