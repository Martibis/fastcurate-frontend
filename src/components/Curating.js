import React, { useEffect, useState } from "react";
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
  const [openModal, setOpenModal] = useState(false);
  const [postQuality, setPostQuality] = useState();
  const [postInfo, setPostInfo] = useState();

  useEffect(() => {
    setPostQuality(props?.postQuality);
    setPostInfo(props?.postInfo);
  }, [props]);

  function resetState() {
    setOpenModal(false);
    setPostQuality();
    setPostInfo();
  }

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
              props?.post?.banReason != null
                ? "<p class='ban-reason'>⚠ " +
                  props?.post?.banReason +
                  " ⚠</p>\n\n"
                : "" +
                  "Written by [@" +
                  props?.post?.username +
                  "](https://peakd.com/@" +
                  props?.post?.username +
                  ")\n\n# [" +
                  props?.post?.postTitle +
                  "](" +
                  props?.post?.postLink +
                  ")\n\n[View on Pinmapple](https://pinmapple.com/p/" +
                  props?.post?.postPermLink +
                  ")\n\n" +
                  props?.post?.postBody
            }
            linkTarget="_blank"
            disallowedElements={["liketuimages"]}
            unwrapDisallowed={true}
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
        {openModal ? (
          <div className="post-info">
            <input
              type="text"
              onKeyUpCapture={async (e) => {
                if (e.key === "Enter") {
                  await props?.updatePosts([
                    {
                      id: props?.post.id,
                      isCurated: 1,
                      postQuality: postQuality,
                      postInfo: postInfo,
                    },
                  ]);
                  resetState();
                  await props?.getPost(false);
                }
              }}
              placeholder={
                postQuality === 1
                  ? "Potential top three"
                  : "Potential honorable mention"
              }
              onChange={(e) => setPostInfo(e.target.value)}
            />
          </div>
        ) : (
          <></>
        )}

        <div className="post-buttons">
          <p
            onClick={async () => {
              await props?.updatePosts([{ id: props?.post.id, isCurated: 0 }]);
              resetState();
              await props?.getPost(true);
            }}
          >
            ←
          </p>
          <p
            onClick={() => {
              if (openModal && postQuality === 1) {
                setPostQuality(2);
              } else {
                setPostQuality(!openModal ? 2 : 0);
                setOpenModal(!openModal);
              }
            }}
          >
            Good
          </p>
          <p
            onClick={() => {
              if (openModal && postQuality === 2) {
                setPostQuality(1);
              } else {
                setPostQuality(!openModal ? 1 : 0);
                setOpenModal(!openModal);
              }
            }}
          >
            Best
          </p>
          <p
            onClick={async () => {
              await props?.updatePosts([
                {
                  id: props?.post.id,
                  isCurated: 1,
                  postQuality: postQuality,
                  postInfo: postInfo,
                },
              ]);
              resetState();
              await props?.getPost(false);
            }}
          >
            →
          </p>
        </div>
      </div>
    </div>
  );
};

export default Curating;
