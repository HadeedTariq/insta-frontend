import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUser = createAsyncThunk('fetchUser', async () => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/singleUser`, {}, { withCredentials: true })
    return data
})
const initialState = {
    user: null,
    allUsers: [],
    error:null,
    isLoading:false
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, { payload }) => {
            state.user = payload
        },
        logoutUser: (state, { payload }) => {
            state.user = null
        },
        getAllUsers: (state, { payload }) => {
            state.allUsers = payload.filter(user => user.name !== state.user.name)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = true
            state.isLoading=false
        }),
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true
        }),
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading=false
            state.user = action.payload
        })
    }
})
export const { loginUser, logoutUser, getAllUsers } = userSlice.actions
export default userSlice.reducer