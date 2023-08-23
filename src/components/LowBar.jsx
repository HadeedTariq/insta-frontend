import React from "react";
import { AiFillFileAdd, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { User } from "../smallComponents";
import { Link } from "react-router-dom";
function LowBar() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="fixed bottom-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full  z-50">
      <nav className="flex flex-col gap-2 px-5 py-0.5">
        <ul className="flex justify-between items-center">
          <Link to={"/"}>
            <li className="flex items-center gap-6 cursor-pointer text-xl font-semibold">
              <AiFillHome size={30} />
            </li>
          </Link>
          <Link to={"/search"}>
            <li className="flex items-center gap-6 cursor-pointer text-xl font-semibold">
              <AiOutlineSearch size={30} />
            </li>
          </Link>
          <Link to={"/createPost"}>
            <li className="flex items-center gap-6 cursor-pointer text-xl font-semibold">
              <AiFillFileAdd size={30} />
            </li>
          </Link>
          <User low />
        </ul>
      </nav>
    </div>
  );
}

export default LowBar;
