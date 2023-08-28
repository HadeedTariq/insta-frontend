import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allPosts: null,
  userPosts: null,
  singlePost: null,
};
const blogSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setAllPosts: (state, { payload }) => {
      state.allPosts = payload;
    },
    setUserPosts: (state, { payload }) => {
      state.userPosts = payload;
    },
    setSinglePost: (state, { payload }) => {
      const singlePost = state.allPosts.find((post) => post._id === payload);
      state.singlePost = singlePost;
    },
  },
});
export const { setAllPosts, setUserPosts, setSinglePost } = blogSlice.actions;
export default blogSlice.reducer;
