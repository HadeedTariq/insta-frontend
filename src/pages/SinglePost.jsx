import React, { useEffect, useRef, useState } from "react";
import { BsSave2, BsSave2Fill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSinglePost } from "../store/slices/blogSlice";
import axios from "axios";

function SinglePost() {
  const { singlePost } = useSelector((state) => state.post);
  const comment = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [seeMore, setSeeMore] = useState(false);
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const goToProfile = (name) => {
    if (name === user.name) {
      navigate("/profile");
    } else {
      navigate(`/user/${name}`);
    }
  };
  const submitComment = async () => {
    const post = {
      userName: user.name,
      userImage: user.userImage,
      comment: comment.current.value,
      postId: id,
    };
    setComments([...comments, post]);
    await axios.post(`${import.meta.env.VITE_API_URL}/post/addComment`, post);
    comment.current.value = "";
  };
  useEffect(() => {
    dispatch(setSinglePost(id));
  }, [id]);
  useEffect(() => {
    setComments(singlePost?.postComments);
  }, [singlePost]);
  return (
    <>
      {singlePost && (
        <>
          <div className="flex flex-col border p-2 gap-3 py-3">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => goToProfile(singlePost.userName)}>
              <img
                src={singlePost.userImage}
                alt="profile"
                className="w-12 rounded-lg h-12"
              />
              <p className="text-lg font-bold">{singlePost.userName}</p>
            </div>
            {!seeMore && (
              <div className="fle flex-col px-3">
                <p className="text-lg font-semibold my-2">
                  {singlePost.description?.slice(0, 100)}
                  <button
                    className="text-fuchsia-500 mx-2 underline"
                    onClick={() => setSeeMore(true)}>
                    See More
                  </button>
                </p>
              </div>
            )}
            {seeMore && (
              <div className="fle flex-col px-3">
                <p className="text-lg font-semibold my-2">
                  {singlePost.description}
                </p>
                <p className="text-lg font-bold text-amber-400">
                  {singlePost.tags}
                  <button
                    className="text-red-500 mx-2 underline"
                    onClick={() => setSeeMore(false)}>
                    Hide
                  </button>
                </p>
              </div>
            )}
            <img
              src={singlePost.postImage}
              className="w-96 h-96 max-[834px]:w-80 max-[834px]:h-80 object-cover mx-auto"
              alt="post-image"
            />
            <div className="flex justify-between px-3">
              <div className="flex items-center gap-5">
                {like && (
                  <FcLike
                    size={25}
                    cursor={"pointer"}
                    onClick={() => setLike((like) => !like)}
                  />
                )}
                {!like && (
                  <FcLikePlaceholder
                    size={25}
                    cursor={"pointer"}
                    onClick={() => setLike((like) => !like)}
                  />
                )}
              </div>
              {!save && (
                <BsSave2
                  size={25}
                  cursor={"pointer"}
                  onClick={() => setSave((save) => !save)}
                />
              )}
              {save && (
                <BsSave2Fill
                  size={25}
                  cursor={"pointer"}
                  onClick={() => setSave((save) => !save)}
                />
              )}
            </div>
          </div>
          <div className="my-4 flex gap-2 items-center">
            <input
              type="text"
              className="w-full text-lg font-semibold py-1 px-2 bg-transparent border-red-400 border"
              placeholder="Enter your comment here"
              ref={comment}
            />
            <AiOutlineSend
              size={25}
              cursor={"pointer"}
              onClick={submitComment}
            />
          </div>
          <div>
            {comments?.map((c, index) => (
              <div
                key={index}
                className="flex flex-col w-64 h-fit my-3 p-2 gap-1 bg-indigo-700 text-white rounded-md">
                <div className="flex items-center gap-2">
                  <img
                    src={c.userImage}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-lg font-semibold">{c.userName}</p>
                </div>
                <p className="text-lg font-semibold">{c.comment}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default SinglePost;
