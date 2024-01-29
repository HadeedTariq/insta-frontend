import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState(null);
  const [tags, setTags] = useState(null);
  const [objectURL, setObjectUrl] = useState(null);
  const uploadToClient = async (e) => {
    const is = e.target.files[0];
    setObjectUrl(URL.createObjectURL(is));
    const data = new FormData();
    data.append("file", is);
    data.append("upload_preset", "n5y4fqsf");
    data.append("cloud_name", "lmsproject");
    try {
      const { data: i } = await axios.post(
        "https://api.cloudinary.com/v1_1/lmsproject/image/upload",
        data
      );
      setFile(i.url);
    } catch (err) {
      console.log(err);
    }
  };
  const createPost = async (e) => {
    const loading = toast.loading("Details are saving");
    e.preventDefault();
    const form = new FormData();
    form.set("description", desc);
    form.set("userName", user.name);
    form.set("userImage", user.userImage);
    form.set("tags", tags);
    form.set("postImage", file);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/post/create`,
        form
      );
      setDesc("");
      setTags("");
      setFile("");
      toast.dismiss(loading);
      toast.success(data.message, { duration: 1500 });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.dismiss(loading);
      toast.error(error.response.data.message, { duration: 1500 });
    }
  };
  useEffect(() => {
    if (tags && desc && file) {
      setDisable(false);
    }
  }, [file]);
  return (
    <div className="flex py-5">
      <Toaster
        toastOptions={{
          style: {
            fontSize: "19px",
            fontWeight: "400",
          },
        }}
      />
      <form
        className="flex flex-col items-center w-full gap-3"
        onSubmit={createPost}>
        <textarea
          type="text"
          name="description"
          placeholder="Enter description here"
          className="my-1 py-1 px-3 text-lg font-bold w-3/4 bg-transparent border outline-none resize-none h-40"
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="text"
          name="tags"
          placeholder="Enter tags here"
          className="my-1 py-1 px-3 text-lg font-bold w-3/4 bg-transparent border outline-none"
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="flex flex-col my-2 mx-auto border w-3/4 h-96 rounded-md relative items-center overflow-hidden">
          {objectURL && (
            <img
              src={objectURL}
              alt=""
              className="z-20 w-full h-full overflow-hidden"
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
        <button
          className={`py-1 px-10 text-lg font-bold rounded-md ${
            disable ? "bg-slate-300 text-black" : "bg-sky-500"
          }`}
          disabled={disable}>
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
