import axios from "axios";
import { Post } from "../components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../store/slices/blogSlice";
import { getAllUsers } from "../store/slices/userSlice";

function HomePage() {
  const { allPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllPosts = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/post`);
      dispatch(setAllPosts(data));
    };
    const fetchAllUsers = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user`);
      dispatch(getAllUsers(data));
    };
    fetchAllUsers();
    getAllPosts();
  }, []);
  return (
    <div className="flex flex-col gap-7 mx-2 my-4 px-3">
      {allPosts?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}

export default HomePage;
