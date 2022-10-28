import React from "react";
import { fcSchema } from "../helpers/Schema";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import "../styles/DigestPreview.scss";

const DigestPreview = (props) => {
  return (
    <div id="digest-preview">
      <ReactMarkdown
        className="post-body"
        children={props.digestPreview}
        linkTarget="_blank"
        disallowedElements={["liketuimages"]}
        unwrapDisallowed={true}
        remarkRehypeOptions={{
          allowDangerousHtml: true,
        }}
        remarkPlugins={[remarkGfm, remarkImages]}
        rehypePlugins={[rehypeRaw, rehypeSanitize(fcSchema), rehypeStringify]}
      ></ReactMarkdown>
      <p
        className="markdown-raw-view"
        onClick={() => {
          navigator.clipboard.writeText(props.digestPreview);
        }}
      >
        {props.digestPreview}
      </p>
    </div>
  );
};

export default DigestPreview;
