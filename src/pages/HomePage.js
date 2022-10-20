import React, { useEffect, useState } from "react";
import LoginOverlay from "../components/LoginOverlay";

import { useAuthorizationContext } from "../providers/LoginProvider";
import "../styles/HomePage.scss";
import LoadingPage from "./LoadingPage";

import axios from "axios";
import Curating from "../components/Curating";
import Tools from "../components/Tools";
import Writing from "../components/Writing";

const HomePage = () => {
  const loginData = useAuthorizationContext();

  const [currentMode, setCurrentMode] = useState(1);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState();
  const [postsForDigestQ0, setPostsForDigestQ0] = useState([]);
  const [postsForDigestQ1, setPostsForDigestQ1] = useState([]);
  const [postsForDigestQ2, setPostsForDigestQ2] = useState([]);

  async function changeMode(newMode) {
    setCurrentMode(newMode);
    if (currentMode !== newMode) {
      await new Promise(async (res, rej) => {
        if (postData?.post?.id) {
          await resetPosts(false);
          res();
        } else {
          res();
        }
      });
      if (newMode === 1) {
        await getPost(false);
      } else {
        if (newMode === 2) {
          await getPostsForDigest();
        }
      }
    }
  }

  async function resetPosts(all) {
    setLoading(true);
    await axios
      .post(
        process.env.REACT_APP_FC_API + "/fastcurate/reset_curation",
        all ? {} : { id: postData.post.id },
        {
          headers: {
            Authorization: loginData.token,
          },
        }
      )
      .then((resp) => {
        setPostData({ count: postData?.count, hoursleft: postData?.hoursleft });
      })
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

  async function getPostsForDigest() {
    if (loading === false) {
      setLoading(true);
      await axios
        .get(process.env.REACT_APP_FC_API + "/fastcurate/digest_ready", {
          headers: {
            Authorization: loginData.token,
          },
        })
        .then((resp) => {
          let posts = resp?.data;
          console.log(posts);
          console.log(posts.length);
          let postsQ0 = [];
          let postsQ1 = [];
          let postsQ2 = [];
          for (let post of posts) {
            if (post?.postQuality === 0 || post?.postQuality === null) {
              postsQ0.push(post);
            } else {
              if (post?.postQuality === 2) {
                postsQ2.push(post);
              } else {
                if (post?.postQuality === 1) {
                  postsQ1.push(post);
                }
              }
            }
          }
          console.log(postsQ0.length);
          console.log(postsQ1.length);
          console.log(postsQ2.length);

          setPostsForDigestQ0(postsQ0);
          setPostsForDigestQ2(postsQ2);
          setPostsForDigestQ1(postsQ1);
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
      getPost(false);
    }
  }, [loginData.loggedIn]);

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
                  onClick={async () => {
                    await resetPosts(false);
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  👋
                  {" " + loginData.username}
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
                  📰
                </p>
                <p
                  className={currentMode === 2 ? "active" : ""}
                  onClick={() => {
                    changeMode(2);
                  }}
                >
                  ✏️
                </p>
                <p
                  className={currentMode === 3 ? "active" : ""}
                  onClick={async () => {
                    changeMode(3);
                  }}
                >
                  🔧
                </p>
                <p
                  className={currentMode === 4 ? "active" : ""}
                  onClick={async () => {
                    changeMode(4);
                  }}
                >
                  ❌
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
            /* WRITING MODE */
            <Writing
              updatePosts={updatePosts}
              loading={loading}
              postsQ0={postsForDigestQ0}
              postsQ2={postsForDigestQ2}
              postsQ1={postsForDigestQ1}
            />
          ) : currentMode === 3 ? (
            /* TOOLS MODE */
            <Tools />
          ) : currentMode === 4 ? (
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
