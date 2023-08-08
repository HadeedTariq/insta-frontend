import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setUserPosts } from '../store/slices/blogSlice'

function Other() {
    const dispatch = useDispatch()
    const { name } = useParams()
    const { allUsers } = useSelector(state => state.user)
    const { userPosts, allPosts } = useSelector(state => state.post)
    const user = allUsers.find(user => user.name === name)
    useEffect(() => {
        const postsByUser = allPosts.filter(post => post.userName === user.name)
        dispatch(setUserPosts(postsByUser))
    }, [name])
    return (
        <div className='p-8'>
            {user ?
                <section className='flex flex-col'>
                    <li className='flex items-center gap-5 cursor-pointer text-xl font-semibold'>
                        <img src={`${import.meta.env.VITE_API_URL}/users/${user.userImage}`} alt="profile" className='w-44 rounded-full h-44 object-cover' />
                        <p className='font-bold text-amber-400 text-2xl'>{user.name}</p>
                    </li>
                    {user.hobby !== '' && <p className='text-xl font-semibold my-3 text-gray-200'>
                        Hobbies: {user.hobby}
                    </p>}
                    <p className='text-xl font-semibold my-3 text-amber-300'>
                        {user.description}
                    </p>
                    <div className='flex gap-4  my-3 mx-3' >
                        {userPosts?.map(post =>
                            <img key={post._id} src={`${import.meta.env.VITE_API_URL}/posts/${post.postImage}`} alt="post" className='w-64 h-64 object-cover' />
                        )}
                    </div>
                </section>
                :
                <h3>404 User not found</h3>
            }
        </div>
    )
}

export default Other