import PostForDigest from "./PostForDigest";
import "../styles/Writing.scss";
import { useState } from "react";
import DigestPreview from "./DigestPreview";

const Writing = (props) => {
  const [previewDigest, setPreviewDigest] = useState(false);
  function updatePostQuality(newQ, oldQ, post) {
    props.updatePostQuality(newQ, oldQ, post);
  }
  function updateFeaturedText(post, input) {
    props.updateFeaturedText(post, input);
  }
  function updatePostInfo(post, input) {
    props.updatePostInfo(post, input);
  }
  function updateTopThreeOrder(post, order) {
    props.updateTopThreeOrder(post, order);
  }

  function isDigestValid() {
    return props.tdIntro && props?.postsQ1.length === 3;
  }

  return (
    <div id="writing-digest">
      <div className="writing-buttons">
        <p
          className={`preview-digest-button ${isDigestValid() ? '' : 'disabled'}`}
          data-tip={isDigestValid() ? '' : 'disabled'}
          onClick={async () => {
            if(isDigestValid()){
              setPreviewDigest(!previewDigest);
              await props.getDigestPreview();
            }
          }}
        >
          {previewDigest ? "Back" : "Preview digest"}
        </p>
        {previewDigest ? (
          <p
            className="restart-curation-button"
            onClick={async () => {
              await props.startNewDigest();
            }}
          >
            Start new digest
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="error-hint-wrapper">
        <p className="error-hint">To preview digest make sure intro is filled and top 3 posts are selected!</p>
      </div>
      {previewDigest ? (
        <DigestPreview digestPreview={props.digestPreview} />
      ) : (
        <div className="inner-writing">
          <h2>Intro</h2>
          <textarea
            className="intro-textara"
            value={props.tdIntro !== null ? props.tdIntro : ""}
            onBlur={(e) => props.updatePostIntro(props.tdIntro)}
            onChange={(e) => {
              props.setTdIntro(e.target.value);
            }}
          />
          <h2>Top three</h2>
          {props?.postsQ1?.map(function (p, i) {
            return (
              <PostForDigest
                post={p}
                key={p.id}
                updatePostQuality={updatePostQuality}
                updateFeaturedText={updateFeaturedText}
                updatePostInfo={updatePostInfo}
                updateTopThreeOrder={updateTopThreeOrder}
              />
            );
          })}
          <h2>Honorable mentions</h2>
          {props?.postsQ2?.map(function (p, i) {
            return (
              <PostForDigest
                post={p}
                key={p.id}
                updatePostQuality={updatePostQuality}
                updateFeaturedText={updateFeaturedText}
                updatePostInfo={updatePostInfo}
                updateTopThreeOrder={updateTopThreeOrder}
              />
            );
          })}
          <h2>Bad posts</h2>
          {props?.postsQ0?.map(function (p, i) {
            return (
              <PostForDigest
                post={p}
                key={p.id}
                updatePostQuality={updatePostQuality}
                updateFeaturedText={updateFeaturedText}
                updatePostInfo={updatePostInfo}
                updateTopThreeOrder={updateTopThreeOrder}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Writing;
