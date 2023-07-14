import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isloggedin = authCtx.isLoggedIn;
  const LogoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isloggedin && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isloggedin && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isloggedin && (
            <li>
              <button onClick={LogoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
