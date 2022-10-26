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

  async function updatePostQuality(oldQ, newQ, post) {
    let updatedPost = post;
    updatedPost.postQuality = newQ;

    await new Promise((res, rej) => {
      if (oldQ === 0 || oldQ === null) {
        setPostsForDigestQ0(
          postsForDigestQ0.filter(function (p) {
            return p.id !== updatedPost.id;
          })
        );
        res();
      } else {
        if (oldQ === 1) {
          setPostsForDigestQ1(
            postsForDigestQ1.filter(function (p) {
              return p.id !== updatedPost.id;
            })
          );
          updatedPost.topThreeOrder = null;
          res();
        } else {
          if (oldQ === 2) {
            setPostsForDigestQ2(
              postsForDigestQ2.filter(function (p) {
                return p.id !== updatedPost.id;
              })
            );
            res();
          } else {
            console.log("Something went wrong");
            rej();
          }
        }
      }
    });
    if (newQ === 0 || newQ === null) {
      setPostsForDigestQ0([...postsForDigestQ0, updatedPost]);
    } else {
      if (newQ === 1) {
        setPostsForDigestQ1([...postsForDigestQ1, updatedPost]);
      } else {
        if (newQ === 2) {
          setPostsForDigestQ2([...postsForDigestQ2, updatedPost]);
        }
      }
    }
    await updatePosts([
      { id: updatedPost.id, postQuality: updatedPost.postQuality },
    ]);
  }

  async function updatePostInfo(post, input) {
    let updatedPost = post;
    post.postInfo = input;
    if (updatedPost.postQuality === 0 || updatedPost.postQuality === null) {
      setPostsForDigestQ0(
        postsForDigestQ0.map((p) => (p.id !== updatedPost.id ? p : updatedPost))
      );
    } else {
      if (updatedPost.postQuality === 1) {
        setPostsForDigestQ1(
          postsForDigestQ1.map((p) =>
            p.id !== updatedPost.id ? p : updatedPost
          )
        );
      } else {
        if (updatedPost.postQuality === 2) {
          setPostsForDigestQ2(
            postsForDigestQ2.map((p) =>
              p.id !== updatedPost.id ? p : updatedPost
            )
          );
        } else {
          console.log("Something went wrong");
        }
      }
    }
    await updatePosts([{ id: updatedPost.id, postInfo: updatedPost.postInfo }]);
  }

  async function updateTopThreeOrder(postToChange, order) {
    let newPostsForDigestQ1 = postsForDigestQ1;
    let postsToUpdate = [];

    for (let post of newPostsForDigestQ1) {
      if (post.topThreeOrder === order) {
        postsToUpdate.push({ id: post.id, topThreeOrder: 0 });
        post.topThreeOrder = 0;
      }
      if (post.id === postToChange.id) {
        post.topThreeOrder = order;
        postsToUpdate.push({ id: post.id, topThreeOrder: order });
      }
    }

    setPostsForDigestQ1(newPostsForDigestQ1);
    await updatePosts(postsToUpdate);
  }

  async function updateFeaturedText(post, input) {
    let updatedPost = post;
    post.featuredText = input;
    if (updatedPost.postQuality === 0 || updatedPost.postQuality === null) {
      setPostsForDigestQ0(
        postsForDigestQ0.map((p) => (p.id !== updatedPost.id ? p : updatedPost))
      );
    } else {
      if (updatedPost.postQuality === 1) {
        setPostsForDigestQ1(
          postsForDigestQ1.map((p) =>
            p.id !== updatedPost.id ? p : updatedPost
          )
        );
      } else {
        if (updatedPost.postQuality === 2) {
          setPostsForDigestQ2(
            postsForDigestQ2.map((p) =>
              p.id !== updatedPost.id ? p : updatedPost
            )
          );
        } else {
          console.log("Something went wrong");
        }
      }
    }
    await updatePosts([
      { id: updatedPost.id, featuredText: updatedPost.featuredText },
    ]);
  }

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
          console.log(postsQ0[0]);
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
              updatePostQuality={updatePostQuality}
              updateFeaturedText={updateFeaturedText}
              updatePostInfo={updatePostInfo}
              updateTopThreeOrder={updateTopThreeOrder}
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
