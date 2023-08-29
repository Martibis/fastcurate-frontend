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
import moment from 'moment';
import { marked } from 'marked';
import { htmlToText } from 'html-to-text';

const Curating = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [postQuality, setPostQuality] = useState();
  const [postInfo, setPostInfo] = useState();

  const countContentWords = (str) => {
    if(str) {
      const html = marked(str);
      const text = htmlToText(html);
      return text.split(/\s+/).length;
    }else
    return '';
  }

  useEffect(() => {
    if (props?.post !== undefined && !props?.loading) {
      setPostQuality(props?.post?.postQuality);
      setPostInfo(props?.post?.postInfo);
      setOpenModal(
        props?.post?.postQuality === 1 || props?.post?.postQuality === 2
      );
    }
  }, [props]);

  return (
    <div className="fastcurate-inner">
      <div className="markdown-body">
        {props?.loading ? (
          <div className="post-body">
            <LoadingPage></LoadingPage>
          </div>
        ) : (
          <div>
          <ReactMarkdown
            className="post-body"
            children={
              (props?.post?.banReason != null
                ? "<p class='ban-reason'>⚠ " +
                  props?.post?.banReason +
                  " ⚠</p>\n\n"
                : "") +
              "# [" +
              props?.post?.postTitle +
              "](" +
              props?.post?.postLink +
              ")\n\n Posted "+
              moment(props?.post?.postDate).fromNow()+
              " | "+
              countContentWords(props?.post?.postBody)+
              " Words"+
              " | Written by [@" +
              props?.post?.username +
              "](https://peakd.com/@" +
              props?.post?.username +
              ") | [View this post on Pinmapple](https://pinmapple.com/p/" +
              props?.post?.postPermLink +
              ")\n\n" 
              +
              props?.post?.postBody.replace('br<', 'br><')
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
            </div>

        )}
      </div>
      <div className="rate-post">
        {openModal ? (
          <div className="post-info">
            <input
              value={postInfo}
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
              setOpenModal(false);
              await props?.updatePosts([
                {
                  id: props?.post.id,
                  isCurated: 1,
                  postQuality: postQuality,
                  postInfo: postInfo,
                },
              ]);
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
