import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
let logoutTimer;
const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
const calculateRemaining = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();
  const remaining = adjustedExpirationTime - currentTime;
  return remaining;
};
const retriveStoredToken = () => {
  const StoredToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("ExpirationTime");
  const remainingTime = calculateRemaining(storedExpirationDate);
  if (remainingTime <= 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("ExpirationTime");
    return null;
  }
  return { token: StoredToken, duration: remainingTime };
};

export const AuthcontextProvider = (props) => {
  const tokenData = retriveStoredToken();
  let initialToken;

  if (!!tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedin = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("ExpirationTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);
  const loginHandler = (token, expirationTime) => {
    localStorage.setItem("token", token);
    localStorage.setItem("ExpirationTime", expirationTime);
    setToken(token);
    const remainingTime = calculateRemaining(expirationTime);
    console.log(remainingTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedin,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
