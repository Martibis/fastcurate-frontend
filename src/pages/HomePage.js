import React, { useEffect, useState } from "react";
import LoginOverlay from "../components/LoginOverlay";
import { fcSchema } from "../helpers/Schema";
import {
  useAuthenticationContext,
  useAuthorizationContext,
} from "../providers/LoginProvider";
import "../styles/HomePage.scss";
import LoadingPage from "./LoadingPage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

import axios from "axios";
import { renderPostBody } from "@ecency/render-helper";

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

  async function updatePosts(posts) {
    setLoading(true);
    await axios
      .post(process.env.REACT_APP_FC_API + "/fastcurate/update_post", posts, {
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

  async function getLastUncurated() {
    if (loading === false) {
      setLoading(true);
      await axios
        .get(process.env.REACT_APP_FC_API + "/fastcurate/last_uncurated", {
          headers: {
            Authorization: loginData.token,
          },
        })
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
      getLastUncurated();
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
                    updatePosts([{ id: postData.id }]);
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
          {loading ? (
            <p>...</p>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown
                className="post-body"
                children={
                  "# [" +
                  postData?.post?.postTitle +
                  "](" +
                  postData?.post?.postLink +
                  ")\n\n" +
                  postData?.post?.postBody
                }
                linkTarget="_blank"
                disallowedElements={["center"]}
                unwrapDisallowed={false}
                remarkRehypeOptions={{
                  allowDangerousHtml: true,
                }}
                remarkPlugins={[remarkGfm, remarkImages]}
                rehypePlugins={[
                  rehypeRaw,
                  rehypeSanitize(fcSchema),
                  rehypeStringify,
                ]}
              ></ReactMarkdown>
            </div>
          )}
          <div className="rate-post">
            <p>←</p>
            <p>Good</p>
            <p>Best</p>
            <p
              onClick={async () => {
                await updatePosts([{ id: postData.id, isCurated: 1 }]);
                await getLastUncurated();
              }}
            >
              →
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
