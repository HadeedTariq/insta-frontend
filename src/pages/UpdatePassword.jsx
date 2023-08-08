import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/slices/userSlice'
import {toast,Toaster} from 'react-hot-toast'

function UpdatePassword() {
  const {user}=useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const updateForm = async (e) => {
    const loading=toast.loading('Updating user')
    e.preventDefault()
    let form = new FormData(e.currentTarget)
    form.set('name',user.name)
    form = Object.fromEntries(form)
    try {
      const {data}=await axios.put(`${import.meta.env.VITE_API_URL}/user/update`, form, { withCredentials: true })
      toast.dismiss(loading)
      toast.success(data.message,{duration:1000})
      setTimeout(() => {
        dispatch(logoutUser())
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
        <form onSubmit={updateForm} className='flex flex-col gap-1 border-2 py-5 px-10 rounded-md h-fit mx-auto my-44 w-96'>
          <h3 className='login'>Update Password</h3>
          <input type="text" name="oldPassword" placeholder='oldPassword' className='py-1 px-2 text-lg bg-black font-semibold border my-2 w-full' />
          <input type="password" name="newPassword" placeholder='newPassword' className='py-1 px-2 text-lg bg-transparent font-semibold border my-2 w-full' />
          <button className='bg-red-500 rounded-sm py-0.5 px-7 mx-auto text-lg font-semibold my-2'>Reset</button>
        </form>
    </>
  )
}

export default UpdatePassword
