import React, { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Post({ post }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [seeMore, setSeeMore] = useState(false);
  const [like, setLike] = useState(false);
  const { description, tags, postImage, userImage, userName, _id } = post;
  const goToProfile = (name) => {
    if (name === user.name) {
      navigate("/profile");
    } else {
      navigate(`/user/${name}`);
    }
  };
  return (
    <div className="flex flex-col border p-2 gap-3 py-3">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => goToProfile(userName)}>
        <img src={userImage} alt="profile" className="w-12 rounded-lg h-12" />
        <p className="text-lg font-bold">{userName}</p>
      </div>
      {!seeMore && (
        <div className="fle flex-col px-3">
          <p className="text-lg max-[540px]:text-base max-[540px]:font-normal font-semibold my-2">
            {description.slice(0, 100)}
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
          <p className="text-lg font-semibold my-2 max-[540px]:text-base max-[540px]:font-normal">
            {description}
          </p>
          <p className="text-lg font-bold text-amber-400">
            {tags}
            <button
              className="text-red-500 mx-2 underline"
              onClick={() => setSeeMore(false)}>
              Hide
            </button>
          </p>
        </div>
      )}
      <img
        src={postImage}
        className="w-96 h-96 max-[834px]:w-80 max-[834px]:h-72 object-cover mx-auto"
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
          <Link to={`/addComment/${_id}`}>
            <FaRegComment size={25} cursor={"pointer"} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
