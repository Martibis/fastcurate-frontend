import React from "react";

const PostForDigest = (props) => {
  return (
    <div className="post-for-digest">
      <p>{props.post.postTitle}</p>
    </div>
  );
};

export default PostForDigest;
