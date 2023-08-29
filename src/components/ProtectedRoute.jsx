import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUser } from "../store/slices/userSlice";
function ProtectedRoute({ children }) {
  const { user, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black">
        <img src="loading.gif" className="w-14 h-14 bg-transparent" />
      </div>
    );
  else if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/register"} />;
  }
}

export default ProtectedRoute;
