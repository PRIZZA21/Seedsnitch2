import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Infobar from "../../Common_Components/Infobar";
import Input from "../components/Input";

const PostCreate = () => {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/discussion-forum";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const config = {
    headers: {
      authorization: `Bearer ${userInfo.token}`,
    },
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`/api/posts/create`, { title, description }, config);
    navigate(redirect);
  };

  return (
    <div className="bg-white relative">
      <Infobar start_text={"Ask"} end_text={"a question"} />

      <section className="h-auto py-10 px-2 relative md:mb-20 md:mt-0 mt-10">
        <div className="h-full w-full flex flex-col gap-4 justify-between md:flex-row right-4">
          <div className="w-full md:w-1/2 h-full rounded-md mx-auto flex flex-row justify-center mr-3">
            <form
              className="w-full h-full max-w-lg px-4 py-6"
              id="post-form"
              name="post"
              onSubmit={submitHandler}
            >
              <Input
                label="Post Title"
                type="text"
                name="title"
                placeholder="Enter title of your post"
                required={true}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-full mb-6 md:mb-0 px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-bold mb-2 w-full"
                    htmlFor="grid-diff"
                  >
                    Description
                  </label>
                  <textarea
                    className="w-full bg-gray-100 text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-diff"
                    placeholder="Enter your post's description"
                    rows="7"
                    name="Idea Description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="w-full">
                <div className="mx-auto flex flex-row items-center">
                  <input
                    className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697] cursor-pointer"
                    type="submit"
                    value="Post Now"
                    onClick={submitHandler}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="md:hidden flex flex-col items-center">
            <img
              src="../img/loginkey.png"
              className="hidden h-[450px] object-contain"
              alt=""
            />
          </div>

          <div className="hidden w-1/2 h-full md:flex flex-col items-center justify-center">
            <img
              src="../img/post-write.jpg"
              className="h-[400px] object-contain"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostCreate;
