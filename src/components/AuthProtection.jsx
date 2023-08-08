import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { fetchUser } from '../store/slices/userSlice'
function AuthProtection({ children,path }) {
  const { user,isLoading } = useSelector((state) => state.user)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchUser())
  },[])
  if(isLoading)return <h3>Loading...</h3>
  else if (!user) {
    return (
      <>
          {children}
      </>
    )
  } else {
    return <Navigate to={path} />
  }
}

export default AuthProtection