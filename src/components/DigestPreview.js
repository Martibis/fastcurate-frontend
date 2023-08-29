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
    <div>
      <div className="writing-buttons">
        <div>
          <h2>Digest Number</h2>
          <input
            className="intro-textara"
            value={props.tdNumber !== null ? props.tdNumber : ""}
            onChange={(e) => {
              props.setTdNumber(e.target.value);
            }}
          />
        </div>
        <p
          className={`preview-digest-button ${props.tdNumber && !props.postDigestStatus ? '' : 'disabled'}`}
          data-tip={props.tdNumber && !props.postDigestStatus ? '' : 'disabled'}
          onClick={async () => {
            if (props.tdNumber && !props.postDigestStatus) {
              await props.callPostDigest();
            }
          }}
        >
          Post digest
        </p>
      </div>
      <div className="error-hint-wrapper">
        <p className="error-hint">{props.postDigestStatus}</p>
      </div>
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
    </div>

  );
};

export default DigestPreview;
