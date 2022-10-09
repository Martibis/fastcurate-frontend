import React from "react";
import { fcSchema } from "../helpers/Schema";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import "../styles/Curating.scss";
import LoadingPage from "../pages/LoadingPage";

const Curating = (props) => {
  return (
    <div className="fastcurate-inner">
      <div className="markdown-body">
        {props?.loading ? (
          <div className="post-body">
            <LoadingPage></LoadingPage>
          </div>
        ) : (
          <ReactMarkdown
            className="post-body"
            children={
              "# [" +
              props?.post?.postTitle +
              "](" +
              props?.post?.postLink +
              ")\n\n" +
              props?.post?.postBody
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
        )}
      </div>
      <div className="rate-post">
        <p
          onClick={async () => {
            await props?.updatePosts([{ id: props?.post.id, isCurated: 0 }]);
            await props?.getPost(true);
          }}
        >
          ←
        </p>
        <p>Good</p>
        <p>Best</p>
        <p
          onClick={async () => {
            await props?.updatePosts([{ id: props?.post.id, isCurated: 1 }]);
            await props?.getPost(false);
          }}
        >
          →
        </p>
      </div>
    </div>
  );
};

export default Curating;
