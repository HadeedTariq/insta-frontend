import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../store/slices/userSlice'
import { User } from '../smallComponents'

function Setting() {
  const dispatch = useDispatch()
  const logOut = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, {}, { withCredentials: true })
      dispatch(logoutUser())
  }
  const deleteUser = async () => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete`, { withCredentials: true })
      dispatch(logoutUser())
  }
  return (
    <div className='flex flex-col items-center w-full gap-8 py-8'>
      <User />
      <div className='flex justify-between w-3/4 px-3 max-[591px]:w-full'>
        <p className='text-xl font-bold'>Logout User</p>
        <button className='text-lg font-bold w-36 py-1 px-7 bg-orange-500 rounded-md' onClick={logOut}>LogOut</button>
      </div>
      <div className='flex justify-between w-3/4 px-3 max-[591px]:w-full'>
        <p className='text-xl font-bold'>Update User Password</p>
        <Link to={'/updatePassword'}><button className='text-lg w-36 font-bold py-1 px-7 bg-violet-500 rounded-md'>Update</button></Link>
      </div>
      <div className='flex justify-between w-3/4 px-3 max-[591px]:w-full'>
        <p className='text-xl font-bold'>Edit Profile</p>
        <Link to={'/editProfile'}><button className='text-lg font-bold w-36 py-1 px-7 bg-green-600 rounded-md'>Edit</button></Link>
      </div>
      <div className='flex justify-between w-3/4 px-3 max-[591px]:w-full'>
        <p className='text-xl font-bold'>Delete User</p>
        <button className='text-lg font-bold w-36 py-1 px-7 bg-red-500 rounded-md' onClick={deleteUser}>Delete</button>
      </div>
    </div>
  )
}

export default Setting