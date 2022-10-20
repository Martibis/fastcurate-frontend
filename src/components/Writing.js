import PostForDigest from "./PostForDigest";

const Writing = (props) => {
  return (
    <div id="writing-digest">
      <h2>Top three</h2>
      {props?.postsQ1?.map(function (p, i) {
        return <PostForDigest post={p} key={p.id} />;
      })}
      <h2>Honorable mentions</h2>
      {props?.postsQ2?.map(function (p, i) {
        return <PostForDigest post={p} key={p.id} />;
      })}
      <h2>Bad posts</h2>
      {props?.postsQ0?.map(function (p, i) {
        return <PostForDigest post={p} key={p.id} />;
      })}
    </div>
  );
};

export default Writing;
