import React, { useState } from "react";
import LoginOverlay from "./LoginOverlay";

import { useAuthorizationContext } from "../providers/LoginProvider";
import "../styles/Tools.scss";
import LoadingPage from "../pages/LoadingPage";
import { Link } from "react-router-dom";

import axios from "axios";

const Tools = () => {
  const loginData = useAuthorizationContext();

  const [loading, setLoading] = useState(false);

  async function resetPosts(all) {
    setLoading(true);
    await axios
      .post(
        process.env.REACT_APP_FC_API + "/fastcurate/reset_curation",
        {},
        {
          headers: {
            Authorization: loginData.token,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div id="tools-page">
      {loginData.connecting ? (
        <LoadingPage></LoadingPage>
      ) : !loginData.loggedIn ? (
        <LoginOverlay />
      ) : (
        <div className="admin-tools">
          <p
            className={"button " + (loading ? "loading" : "")}
            onClick={async () => {
              await resetPosts(true);
            }}
          >
            Reset stuck posts
          </p>
        </div>
      )}
    </div>
  );
};

export default Tools;
