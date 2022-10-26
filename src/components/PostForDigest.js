import React, { useState } from "react";

const PostForDigest = (props) => {
  const [postInfo, setPostInfo] = useState(
    props.post.postInfo !== null && props.post.postInfo !== undefined
      ? props.post.postInfo
      : ""
  );
  const [featuredText, setFeaturedText] = useState(
    props.post.featuredText !== null && props.post.featuredText !== undefined
      ? props.post.featuredText
      : ""
  );
  return (
    <div className="post-for-digest">
      <div className="main-info">
        <div className="img-link">
          <img src={props.post.postImageLink} alt="" />
          <a
            className="title"
            href={props.post.postLink}
            target="_blank"
            rel="noreferrer"
          >
            {props.post.postTitle}
          </a>
        </div>
        <div className="arrows">
          {props.post.postQuality === 1 ? (
            <p
              className={
                "winner-button " +
                (props.post.topThreeOrder === 1 ? "active" : "")
              }
              onClick={async () => {
                await props.updateTopThreeOrder(
                  props.post,
                  props.post.topThreeOrder === 1 ? 0 : 1
                );
              }}
            >
              🥇
            </p>
          ) : (
            <></>
          )}
          {props.post.postQuality === 1 ? (
            <p
              className={
                "winner-button " +
                (props.post.topThreeOrder === 2 ? "active" : "")
              }
              onClick={async () => {
                await props.updateTopThreeOrder(
                  props.post,
                  props.post.topThreeOrder === 2 ? 0 : 2
                );
              }}
            >
              🥈
            </p>
          ) : (
            <></>
          )}
          {props.post.postQuality === 1 ? (
            <p
              className={
                "winner-button " +
                (props.post.topThreeOrder === 3 ? "active" : "")
              }
              onClick={async () => {
                await props.updateTopThreeOrder(
                  props.post,
                  props.post.topThreeOrder === 3 ? 0 : 3
                );
              }}
            >
              🥉
            </p>
          ) : (
            <></>
          )}
          {props.post.postQuality === 2 ||
          props.post.postQuality === 0 ||
          props.post.postQuality === null ? (
            <p
              className="arrow-button"
              onClick={async () => {
                let newQ =
                  props.post.postQuality === 0 ||
                  props.post.postQuality === null
                    ? 2
                    : 1;
                await props.updatePostQuality(
                  props.post.postQuality,
                  newQ,
                  props.post
                );
              }}
            >
              ⇧
            </p>
          ) : (
            <></>
          )}
          {props.post.postQuality === 1 || props.post.postQuality === 2 ? (
            <p
              className="arrow-button"
              onClick={async () => {
                let newQ = props.post.postQuality === 1 ? 2 : 0;
                await props.updatePostQuality(
                  props.post.postQuality,
                  newQ,
                  props.post
                );
              }}
            >
              ⇩
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="input-fields">
        {props.post.postQuality === 1 || props.post.postQuality === 2 ? (
          <input
            value={postInfo}
            onChange={(e) => setPostInfo(e.target.value)}
            onBlur={(e) => props.updatePostInfo(props.post, postInfo)}
          />
        ) : (
          <></>
        )}
        {props.post.postQuality === 1 ? (
          <textarea
            value={featuredText}
            onChange={(e) => setFeaturedText(e.target.value)}
            onBlur={(e) => props.updateFeaturedText(props.post, featuredText)}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PostForDigest;
