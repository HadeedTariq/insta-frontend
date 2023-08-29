import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setUserPosts } from "../store/slices/blogSlice";

function Other() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const { allUsers } = useSelector((state) => state.user);
  const { userPosts, allPosts } = useSelector((state) => state.post);
  const user = allUsers.find((user) => user.name === name);
  useEffect(() => {
    const postsByUser = allPosts.filter((post) => post.userName === user.name);
    dispatch(setUserPosts(postsByUser));
  }, [name]);
  return (
    <div className="p-8">
      {user ? (
        <section className="flex flex-col">
          <li className="flex items-center gap-5 cursor-pointer text-xl font-semibold">
            <img
              src={user.userImage}
              alt="profile"
              className="w-44 rounded-full h-44 max-[400px]:w-20  max-[400px]:h-20 object-cover"
            />
            <p className="font-semibold text-amber-400 text-2xl max-[400px]:text-base">
              {user.name}
            </p>
          </li>
          {user.hobby !== "" && (
            <p className="text-xl font-semibold my-3 text-gray-200">
              Hobbies: {user.hobby}
            </p>
          )}
          <p className="text-xl font-semibold my-3 text-amber-300 max-[540px]:text-base max-[540px]:font-normal">
            {user.description}
          </p>
          <div className="flex gap-4  my-3 mx-3">
            {userPosts?.map((post) => (
              <img
                key={post._id}
                src={post.postImage}
                alt="post"
                className="w-64 h-64 object-cover max-[834px]:w-80 max-[834px]:h-72"
              />
            ))}
          </div>
        </section>
      ) : (
        <h3>404 User not found</h3>
      )}
    </div>
  );
}

export default Other;
