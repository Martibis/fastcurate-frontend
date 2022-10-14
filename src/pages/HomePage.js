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

  function changeMode(newMode) {
    if (currentMode !== newMode) {
      setCurrentMode(newMode);
    }
  }

  async function resetPosts(all) {
    setLoading(true);
    await axios
      .post(
        process.env.REACT_APP_FC_API + "/fastcurate/reset_curation",
        all ? {} : { id: postData.id },
        {
          headers: {
            Authorization: loginData.token,
          },
        }
      )
      .then((resp) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function updatePosts(posts) {
    setLoading(true);
    await axios
      .post(
        process.env.REACT_APP_FC_API + "/fastcurate/update_posts",
        { posts: posts },
        {
          headers: {
            Authorization: loginData.token,
          },
        }
      )
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
    if (loginData.loggedIn) {
      if (currentMode === 1) {
        getPost(false);
      } else {
        if (currentMode === 2) {
          //go to writing
        } else {
          if (currentMode === 3) {
            resetPosts(true);
          } else {
            if (currentMode === 4) {
              resetPosts(false);
            }
          }
        }
      }
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
                {" | "}
                <b>{postData?.count?.toString()}</b> {" posts | "}
                <b>{postData?.hoursleft?.toString()}</b> {" hours"}
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
                <p
                  className={currentMode === 3 ? "active" : ""}
                  onClick={async () => {
                    changeMode(3);
                  }}
                >
                  ⚠
                </p>
                <p
                  className={currentMode === 4 ? "active" : ""}
                  onClick={async () => {
                    changeMode(4);
                  }}
                >
                  x
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
          ) : currentMode === 2 ? (
            <div></div>
          ) : currentMode === 3 || currentMode === 4 ? (
            <div className="safe-to-close">
              <p>You can now safely close this page.</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
