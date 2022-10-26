import PostForDigest from "./PostForDigest";
import "../styles/Writing.scss";
import LoadingPage from "../pages/LoadingPage";

const Writing = (props) => {
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
  return (
    <div id="writing-digest">
      <div className="inner-writing">
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
    </div>
  );
};

export default Writing;
