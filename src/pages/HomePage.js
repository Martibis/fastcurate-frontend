import React, { useEffect, useState } from "react";
import LoginOverlay from "../components/LoginOverlay";

import { useAuthorizationContext } from "../providers/LoginProvider";
import "../styles/HomePage.scss";
import LoadingPage from "./LoadingPage";

import axios from "axios";
import Curating from "../components/Curating";

const HomePage = () => {
  const loginData = useAuthorizationContext();

  const [currentMode, setCurrentMode] = useState(1);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState();

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [postDescription, setPostDescription] = useState("");
  const [postQuality, setPostQuality] = useState(0);

  function changeMode(newMode) {
    if (currentMode !== newMode) {
      setCurrentMode(newMode);
    }
  }

  async function updatePosts(posts) {
    setLoading(true);
    await axios
      .post(process.env.REACT_APP_FC_API + "/fastcurate/update_posts", posts, {
        headers: {
          Authorization: loginData.token,
        },
      })
      .then((resp) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function getPost(prev) {
    if (loading === false) {
      setLoading(true);
      await axios
        .get(
          process.env.REACT_APP_FC_API +
            "/fastcurate/" +
            (prev ? "last_curated" : "last_uncurated"),
          {
            headers: {
              Authorization: loginData.token,
            },
          }
        )
        .then((resp) => {
          console.log(resp);
          setPostData(resp.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    if (loginData.loggedIn && currentMode === 1) {
      getPost(false);
    }
  }, [loginData.loggedIn, currentMode]);

  return (
    <div id="home-page">
      {loginData.connecting ? (
        <LoadingPage></LoadingPage>
      ) : !loginData.loggedIn ? (
        <LoginOverlay />
      ) : (
        <div className="fast-curate">
          <div className="header">
            <div
              className="inner-header"
              data-tip="Clicking your username will log you out."
            >
              <p className="info-message">
                {"👋 "}
                <b
                  className="username"
                  onClick={() => {
                    updatePosts([{ id: postData.id, isCurated: 0 }]);
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  {loginData.username}
                </b>
                {", there are "}
                <b>{postData?.count?.toString()}</b> {" posts and "}
                <b>{postData?.hoursleft?.toString()}</b> {" hours left."}
              </p>
              <div className="current-mode">
                <p
                  className={currentMode === 1 ? "active" : ""}
                  onClick={() => {
                    changeMode(1);
                  }}
                >
                  Curate
                </p>
                <p
                  className={currentMode === 2 ? "active" : ""}
                  onClick={() => {
                    changeMode(2);
                  }}
                >
                  Write
                </p>
              </div>
            </div>
          </div>
          {currentMode === 1 ? (
            <Curating
              updatePosts={updatePosts}
              getPost={getPost}
              post={postData?.post}
              loading={loading}
            />
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
