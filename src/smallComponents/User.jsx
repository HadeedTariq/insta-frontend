import { useSelector } from "react-redux";
import { AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
function User({ setting, low }) {
  const { user } = useSelector((state) => state.user);
  return (
    <li className="flex items-center gap-3 cursor-pointer text-xl font-semibold">
      <Link to={"/profile"}>
        <img
          src={user.userImage}
          alt="profile"
          className="w-12 rounded-lg h-12"
        />
      </Link>
      {!low && (
        <Link to={"/profile"} className="font-bold text-amber-400 text-xl">
          {user.name}
        </Link>
      )}
      {setting && (
        <Link to={"/setting"}>
          <AiFillSetting size={26} />
        </Link>
      )}
    </li>
  );
}

export default User;
