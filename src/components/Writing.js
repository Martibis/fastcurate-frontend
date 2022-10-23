import PostForDigest from "./PostForDigest";
import "../styles/Writing.scss";

const Writing = (props) => {
  function updatePostQuality(newQ, oldQ, post) {
    props.updatePostQuality(newQ, oldQ, post);
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Writing;
