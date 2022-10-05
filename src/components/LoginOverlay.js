import React, { useState } from "react";
import {
  useAuthenticationContext,
  useAuthorizationContext,
} from "../providers/LoginProvider";
import "../styles/LoginOverlay.scss";
import LoginButton from "./LoginButton";

const LoginOverlay = () => {
  const authenticate = useAuthenticationContext();
  const loginData = useAuthorizationContext();

  const [username, setUsername] = useState("");
  return (
    <div className="login-overlay">
      {loginData.installed !== false ? (
        <div className="inner-div">
          <h2>Log in to Fastcurate</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
          />
          <div
            className="login-button"
            onClick={() => {
              authenticate(username);
            }}
          >
            <LoginButton />
          </div>
        </div>
      ) : (
        <p>Keychain not installed</p>
      )}
    </div>
  );
};

export default LoginOverlay;
