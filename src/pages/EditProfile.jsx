import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { logoutUser } from "../store/slices/userSlice";
function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState(null);
  const [hobby, setHobby] = useState(null);
  const [objectURL, setObjectUrl] = useState(null);
  const uploadToClient = async (e) => {
    const i = e.target.files[0];
    setObjectUrl(URL.createObjectURL(i));
    const data = new FormData();
    data.append("file", i);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "ddfdfdfd");
    try {
      const { data: i } = await axios.post(
        "https://api.cloudinary.com/v1_1/ddfdfdfd/image/upload",
        data
      );
      setFile(i.url);
    } catch (err) {
      console.log(err);
    }
  };
  const uploadProfileDetails = async (e) => {
    const loading = toast.loading("Details are saving");
    e.preventDefault();
    let form = new FormData();
    form.set("description", desc);
    form.set("hobby", hobby);
    form.set("name", user.name);
    form.set("userImage", file);
    form = Object.fromEntries(form);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/updateUserDetails`,
        form,
        { withCredentials: true }
      );
      setDesc("");
      setHobby("");
      setFile("");
      toast.dismiss(loading);
      toast.success(data.message, { duration: 1500 });
      setTimeout(() => {
        dispatch(logoutUser());
        navigate("/auth");
      }, 2000);
    } catch (error) {
      toast.dismiss(loading);
      toast.error(error.response.date.message, { duration: 1500 });
    }
  };
  return (
    <div className="flex w-full justify-center py-10">
      <Toaster
        toastOptions={{
          style: {
            fontSize: "19px",
            fontWeight: "400",
          },
        }}
      />
      <form
        className="flex flex-col gap-3 w-3/5"
        onSubmit={uploadProfileDetails}>
        <div className="flex flex-col my-2 mx-auto border w-40 h-40 rounded-full relative items-center">
          {objectURL && (
            <img
              src={objectURL}
              alt=""
              className="rounded-full z-20 w-full h-full overflow-hidden"
            />
          )}
          <div
            onClick={() => document.querySelector(".inp-field").click()}
            className="absolute bottom-1 z-10">
            <FiUpload size={30} className="left-16 z-2" />
            <input
              type="file"
              name="profileImage"
              className="bottom-1 left-0 z-10 inp-field"
              hidden
              onChange={uploadToClient}
            />
          </div>
        </div>
        <textarea
          type="text"
          name="description"
          placeholder="Enter description here"
          className="my-1 resize-none h-28 overflow-y-auto scroll-smooth  px-3 py-1 text-lg bg-transparent border font-bold w-full"
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="text"
          name="hobbies"
          placeholder="Enter your hobbies here"
          className="my-1 px-3 py-1 text-lg bg-transparent border font-bold w-full"
          onChange={(e) => setHobby(e.target.value)}
        />
        <button className="my-1 bg-blue-600 py-1 px-6 text-lg font-bold w-fit mx-auto rounded-md">
          Save
        </button>
        <Link
          to={"/"}
          className="text-center text-2xl underline my-1 font-bold text-amber-400">
          Skip
        </Link>
      </form>
    </div>
  );
}

export default EditProfile;
