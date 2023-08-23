import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/slices/userSlice";
import { Link } from "react-router-dom";
function Search() {
  const search = useRef();
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const [users, setUsers] = useState(allUsers);
  useEffect(() => {
    const fetchAllUsers = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user`);
      dispatch(getAllUsers(data));
    };
    fetchAllUsers();
  }, []);
  const searchUser = () => {
    if (search.current.value === "") {
      setUsers(allUsers);
    } else {
      const filterUsers = allUsers.filter((user) =>
        user.name.toLowerCase().includes(search.current.value.toLowerCase())
      );
      setUsers(filterUsers);
    }
  };
  return (
    <div className="flex flex-col p-5 gap-4 w-full">
      <div className="w-full flex justify-center">
        <input
          type="search"
          placeholder="Search user here"
          ref={search}
          className="border-none outline-none w-96 bg-slate-700 rounded-md  py-1 px-3 text-lg font-semibold"
          onChange={searchUser}
        />
      </div>
      {users &&
        users.map((user, index) => (
          <div key={index}>
            <li className="flex items-center gap-3 cursor-pointer text-xl font-semibold">
              <img
                src={user.userImage}
                alt="profile"
                className="w-12 rounded-lg my-3"
              />
              <Link
                to={`/user/${user.name}`}
                className="font-bold text-amber-400 text-xl">
                {user.name}
              </Link>
            </li>
          </div>
        ))}
    </div>
  );
}

export default Search;
