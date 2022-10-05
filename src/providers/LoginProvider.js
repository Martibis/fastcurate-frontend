import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthenticationContext = createContext();
const AuthorizationContext = createContext();

export function useAuthenticationContext() {
  return useContext(AuthenticationContext);
}

export function useAuthorizationContext() {
  return useContext(AuthorizationContext);
}

const LoginProvider = ({ children }) => {
  const [installed, setInstalled] = useState();
  const [username, setUsername] = useState();
  const [token, setToken] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [connecting, setConnecting] = useState(false);

  async function requestLogin(usernameIn) {
    let username = usernameIn.replace(/@/g, "");
    let keychainInstalled;
    let keychainAccess;

    if (window?.hive_keychain) {
      keychainInstalled = true;
      keychainAccess = window.hive_keychain;
      setInstalled(keychainInstalled);
    }

    if (keychainInstalled) {
      await axios
        .post(process.env.REACT_APP_FC_API + "/auth/memo", {
          username: username,
        })
        .then((resp) => {
          try {
            console.log(resp);
            keychainAccess.requestVerifyKey(
              username,
              resp.data.message,
              "Posting",
              (keychain_response) => {
                if (keychain_response.success === true) {
                  console.log(keychain_response);
                  axios
                    .post(process.env.REACT_APP_FC_API + "/auth/login", {
                      username: username,
                      encrypted_username: keychain_response.result,
                    })
                    .then((login_response) => {
                      console.log(login_response);
                      if (login_response.status === 200) {
                        localStorage.removeItem("token");
                        localStorage.setItem(
                          "token",
                          login_response.data.token
                        );
                        setToken(login_response.data.token);
                        setUsername(username);
                        setLoggedIn(true);
                      }
                    });
                }
              }
            );
          } catch (e) {
            console.log(e);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  }

  useEffect(() => {
    localStorage.removeItem("token");
    if (token === undefined) {
      let jwt = localStorage.getItem("token");
      setToken(jwt);
    }

    if (token) {
      setConnecting(true);
      axios
        .get(process.env.REACT_APP_FC_API + "/auth/verify_token", {
          headers: {
            Authorization: token,
          },
        })
        .then((resp) => {
          if (resp.status === 200) {
            setUsername(resp.data.username);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setConnecting(false);
        });
    }
  }, [token]);

  return (
    <AuthorizationContext.Provider
      value={{
        installed: installed,
        username: username,
        token: token,
        loggedIn: loggedIn,
        connecting: connecting,
      }}
    >
      <AuthenticationContext.Provider value={requestLogin}>
        {children}
      </AuthenticationContext.Provider>
    </AuthorizationContext.Provider>
  );
};

export default LoginProvider;
