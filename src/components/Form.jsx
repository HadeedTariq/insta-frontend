import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/slices/userSlice'
import {toast,Toaster} from 'react-hot-toast'
function Form({ register, login }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const registerForm = async (e) => {
    const loading=toast.loading('Creating user')
    e.preventDefault()
    let form = new FormData(e.currentTarget)
    form = Object.fromEntries(form)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/create`, form, { withCredentials: true })
      toast.dismiss(loading)
      toast.success("User created successfully",{duration:1000})
      setTimeout(() => {
        navigate('/auth')
      }, 1000);
    } catch (error) {
      toast.dismiss(loading)
      toast.error(error.response.data.message,{duration:2000})
    }
  }
  const loginForm = async (e) => {
    const loading=toast.loading('Authenticating user')
    e.preventDefault()
    let form = new FormData(e.currentTarget)
    form = Object.fromEntries(form)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/auth`, form, { withCredentials: true })
      toast.dismiss(loading)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/singleUser`, {}, { withCredentials: true })
      dispatch(loginUser(data))
      toast.success("User LogedIn Successfully",{duration:1000})
      setTimeout(() => {
        navigate('/')
      }, 1000);
    } catch (error) {
      toast.dismiss(loading)
      toast.error(error.response.data.message,{duration:2000})
    }
  }
  return (
    <>
      <Toaster toastOptions={{
        style:{
          fontSize:"19px",
          fontWeight:"300",
          fontFamily:"cursive"
        }
      }}/>
      {login ? (
        <form onSubmit={loginForm} className='flex flex-col gap-1 border-2 py-5 px-10 rounded-md h-fit my-44 w-96'>
          <h3 className='login'>Instagram {login}</h3>
          <input type="text" name="name" placeholder='Name' className='py-1 px-2 text-lg bg-black font-semibold border my-2 w-full' />
          <input type="password" name="password" placeholder='Password' className='py-1 px-2 text-lg bg-transparent font-semibold border my-2 w-full' />
          <p className='text-base gap-2 font-bold text-center'>Don't Have An Account ? <Link className='underline text-yellow-500 text-lg' to={'/register'}>Register</Link></p>
          <button className='bg-cyan-500 rounded-sm py-0.5 px-7 mx-auto text-lg font-semibold my-2'>{login}</button>
        </form>
      ) :
        (<form onSubmit={registerForm} className='flex flex-col gap-1 border-2 py-5 px-10 rounded-md h-fit my-44 w-96'>
          <h3 className='login'>Instagram {register}</h3>
          <input type="text" name="name" placeholder='Name' className='py-1 px-2 text-lg bg-transparent font-semibold border my-2 w-full' />
          <input type="text" name="email" placeholder='Email' className='py-1 px-2 text-lg bg-transparent font-semibold border my-2 w-full' />
          <input type="password" name="password" placeholder='Password' className='py-1 px-2 text-lg bg-transparent font-semibold border my-2 w-full' />
          <p className='text-base gap-2 font-bold text-center'>Already Have An Account ? <Link className='underline text-yellow-500 text-lg' to={'/auth'}>Login</Link></p>
          <button className='bg-sky-500 rounded-sm py-0.5 px-7 mx-auto text-lg font-semibold my-2'>{register}</button>
        </form>
        )
      }
    </>
  )
}

export default Form