import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allPosts:null,
    userPosts:null
}
const blogSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        setAllPosts:(state,{payload})=>{
            state.allPosts=payload
        },
        setUserPosts:(state,{payload})=>{
            state.userPosts=payload
        },
    }
})
export const { setAllPosts,setUserPosts } = blogSlice.actions
export default blogSlice.reducer