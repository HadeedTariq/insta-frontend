import React from "react";
import { AiFillFileAdd, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { User } from "../smallComponents";
import { Link } from "react-router-dom";
function NavBar() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="fixed">
      <nav className="flex flex-col gap-2 px-5 py-1">
        <h3 className="text-2xl font-semibold my-8">Instagram</h3>
        <ul className="flex flex-col gap-10">
          <Link to={"/"}>
            <li className="flex items-center gap-6 cursor-pointer text-xl font-semibold">
              <AiFillHome size={30} />
              Home
            </li>
          </Link>
          <Link to={"/search"}>
            <li className="flex items-center gap-6 cursor-pointer text-xl font-semibold">
              <AiOutlineSearch size={30} />
              Seacrh
            </li>
          </Link>
          <Link to={"/createPost"}>
            <li className="flex items-center gap-6 cursor-pointer text-xl font-semibold">
              <AiFillFileAdd size={30} />
              Create
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
