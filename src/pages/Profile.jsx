import React, { useEffect } from 'react'
import { AiFillEdit, AiFillSetting } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserPosts } from '../store/slices/blogSlice'

function Profile() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { userPosts, allPosts } = useSelector(state => state.post)
  useEffect(() => {
    const postsByUser = allPosts.filter(post => post.userName === user.name)
    dispatch(setUserPosts(postsByUser))
  }, [])
  return (
    <div className='p-8'>
      {
        user &&
        <section className='flex flex-col'>
          <li className='flex items-center gap-5 cursor-pointer text-xl font-semibold'>
            <img src={`${import.meta.env.VITE_API_URL}/users/${user.userImage}`} alt="profile" className='w-44 rounded-full h-44 object-cover' />
            <p className='font-bold text-amber-400 text-2xl'>{user.name}</p>
          </li>
          <p className='text-xl font-semibold my-3 text-gray-200'>
            Hobbies: {user.hobby}
          </p>
          <p className='text-xl font-semibold my-3 text-amber-300'>
            {user.description}
          </p>
          <div className='flex gap-5 my-2'>
            <Link to={'/editProfile'} className='flex gap-2 bg-emerald-500 rounded-md text-lg font-bold py-1 px-4 items-center'><AiFillEdit size={24} /> Edit Profile</Link>
            <Link to={'/setting'} className='flex gap-1 bg-sky-500 rounded-md text-lg font-bold py-1 px-4 items-center'><AiFillSetting />Setting</Link>
          </div>
          <div className='flex gap-4 justify-center  my-3 mx-3 max-[1064px]:flex-wrap' >
            {userPosts?.map(post =>
              <img key={post._id} src={`${import.meta.env.VITE_API_URL}/posts/${post.postImage}`} alt="post" className='w-64 h-64 object-cover m-3 max-[885px]:w-full max-[885px]:h-full' />
            )}
          </div>
        </section>
      }
    </div>
  )
}

export default Profile