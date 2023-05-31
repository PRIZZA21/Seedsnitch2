import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Infobar from "../../Common_Components/Infobar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { getUserDetails } from "../../redux/actions/userActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  // const { success } = userProfileUpdate;

  let navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails(userInfo._id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setImage(user.profile_pic);
      }
    }
  }, [navigate, userInfo, user, dispatch]);

  const config = {
    headers: {
      authorization: `Bearer ${userInfo.token}`,
    },
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!uploading) {
      setError(null);
      setMessage(null);
      axios
        .put(`/api/users/profile`, { name, email, password, image }, config)
        .then((res) => {
          setMessage(res.data.message);
        })
        .catch((res) => {
          setError(res.response.data.error);
        });
    }
  };

  const applnHandler = () => {
    navigate("/users/applications/page/1");
  };

  const postsHandler = () => {
    navigate("/users/posts/page/1");
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var { data } = await axios.post("/api/uploads", formData, config);
      data = data.substr(8);
      data = "/" + data;
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse pb-8 md:flex-row min-h-[78vh]">
      <div className="w-full md:w-1/4 bg-green relative mt-20 border-t-2 border-r-2 border-b-slate-200 flex">
        <div className="sticky top-28 mx-auto">
          <div className="w-full h-full rounded-md mx-auto flex flex-row justify-center mr-3">
            <form
              className="w-full h-full max-w-lg px-8 py-6"
              name="profile"
              onSubmit={submitHandler}
            >
              {error && (
                <div className="text-red-400 mb-5 text-center">{error}</div>
              )}

              {message && (
                <div className="text-green-500 font-semibold text-lg mb-5 text-center">
                  {message}
                </div>
              )}

              <div className="flex flex-wrap -mx-3 mb-4">
                {image !== "" ? (
                  <div className="rounded-full w-28 h-28 mx-auto font-serif mb-4 flex items-center justify-center">
                    <img
                      src={`/${image}`}
                      className="rounded-full w-36 h-28"
                      alt=""
                    />
                  </div>
                ) : (
                  <button className="rounded flex flex-row items-center mx-auto mb-4">
                    <div className="rounded-full border-gray-200 bg-[#0C6980] text-white border-1 w-24 flex flex-row justify-center h-24 items-center font-bold text-lg">
                      {" "}
                      {name.split(" ")[0].charAt(0)}
                    </div>
                  </button>
                )}

                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-medium mb-2"
                    htmlFor="grid-name"
                  >
                    Enter Image
                  </label>

                  <input
                    className="appearance-none block w-full font-serif text-darkBlue border border-gray font-serif rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="img-file"
                    type="file"
                    name="img-file"
                    onChange={uploadFileHandler}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-medium mb-2"
                    htmlFor="grid-name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full font-serif text-darkBlue border border-gray font-serif rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-name"
                    type="text"
                    name="Name"
                    placeholder={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-medium mb-2"
                    htmlFor="grid-email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full font-serif text-darkBlue border border-gray font-serif rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    type="email"
                    name="Email"
                    placeholder={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-medium mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full font-serif text-darkBlue border border-gray font-serif rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="password"
                    name="Subject"
                    placeholder={"Enter password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="w-full flex flex-row items-center">
                  {!uploading ? (
                    <input
                      className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697]"
                      type="submit"
                      value="Update"
                    />
                  ) : (
                    <div className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697] text-center">
                      Please wait till uploading
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4 bg-white relative">
        <Infobar
          start_text={"Welcome"}
          end_text={userInfo.name.split(" ")[0]}
        />

        <div className="bg-[#f8f8f8] mt-12 w-5/6 mx-auto rounded-lg p-4 text-xl font-semibold drop-shadow-lg flex space-between">
          Your Applications
          <span className="ml-auto">
            <FontAwesomeIcon
              icon={faEdit}
              onClick={applnHandler}
              className="cursor-pointer text-lg text-black hover:text-gray-600"
            />
          </span>
        </div>

        <div className="bg-[#f8f8f8] mt-12 w-5/6 mx-auto rounded-lg p-4 text-xl font-semibold drop-shadow-lg flex space-between">
          Your Posts
          <span className="ml-auto">
            <FontAwesomeIcon
              icon={faEdit}
              onClick={postsHandler}
              className="cursor-pointer text-lg text-black hover:text-gray-600"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
