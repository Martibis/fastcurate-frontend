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
  const [keychain, setKeychain] = useState();
  const [installed, setInstalled] = useState(false);
  const [username, setUsername] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedIn, setLoggedIn] = useState(false);
  const [connecting, setConnecting] = useState(false);

  async function requestLogin(username) {
    if (installed) {
      axios
        .post(process.env.REACT_APP_FC_API + "/memo", { username: username })
        .then((resp) => {
          try {
            keychain.requestVerifyKey(
              username,
              resp.data.memo,
              "Posting",
              (keychain_response) => {
                if (keychain_response.success === true) {
                  axios
                    .post(process.env.REACT_APP_FC_API + "/login", {
                      username: username,
                      encrypted_username: keychain_response.result,
                    })
                    .then((login_response) => {
                      if (login_response.status === 200) {
                        setToken(login_response.data.token);
                        localStorage.removeItem("token");
                        localStorage.setItem("token", login_response.data.token);
                      }
                    });
                }
              }
            );
          } catch (e) {}
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  }

  useEffect(() => {
    setConnecting(true);
    if (window?.hive_keychain) {
      setInstalled(true);
      setKeychain(window.hive_keychain);
    } else {
      setInstalled(false);
    }
    if (token) {
      try {
        axios
          .get(process.env.REACT_APP_FC_API + "/verify_token", {
            headers: {
              Authorization: token,
            },
          })
          .then((resp) => {
            if (resp.status === 200) {
              setUsername(resp.data.username);
              setLoggedIn(true);
            } else {
              //unsuccessfully verified token
              console.log(resp.status);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setConnecting(false);
          });
      } catch (e) {
        console.log(e);
      }
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
