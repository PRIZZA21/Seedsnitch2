import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import Infobar from "../../Common_Components/Infobar";
import Input from "../components/Input";

const Login = () => {
  const googleAuth = () => {
    window.open("/api/users/auth/google/callback", "_self");
  };

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <div className="bg-white relative">
      <Infobar start_text={"Login"} end_text={"to Seedsnitch"} />

      <section className="h-auto py-10 px-2 relative md:mb-20 md:mt-0 mt-10">
        <div className="h-full w-full flex flex-col gap-4 justify-between md:flex-row right-4">
          <div className="w-full md:w-1/2 h-full rounded-md mx-auto flex flex-row justify-center mr-3">
            <form
              className="w-full h-full max-w-lg px-4 py-6"
              id="contact-form"
              name="login"
              onSubmit={submitHandler}
            >
              {error && (
                <div className="text-red-400 mb-5 text-center">{error}</div>
              )}

              <div
                className="rounded-lg py-2 text-xl mb-6 flex flex-row justify-center cursor-pointer bg-green-200"
                onClick={googleAuth}
              >
                Continue with Google &nbsp;{" "}
                <img
                  src="../img/google-logo.png"
                  className="w-6 h-6 mt-1"
                  alt=""
                />
              </div>

              <div className="w-full   mb-6 md:mb-0">
                <label className="block tracking-wide text-darkBlue text-s font-medium mb-2">
                  Email
                </label>
                <input
                  className=" font-serif  w-full text-darkBlue border rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter the your email id"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full   mb-6 md:mb-0">
                <label className="block tracking-wide text-darkBlue text-s font-medium mb-2">
                  Password
                </label>
                <input
                  className=" font-serif  w-full text-darkBlue border rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6">
                <span
                  className="block tracking-wide text-darkBlue text-m font-normal mb-2"
                  htmlFor="grid-password"
                >
                  Don't have an account{" "}
                  <Link to="/register" className="font-bold">
                    &nbsp;Register Now
                  </Link>
                </span>
              </div>

              <div className="w-full">
                <div className="w-full flex flex-row items-center">
                  <input
                    className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697]"
                    type="submit"
                    value="Login"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="md:hidden flex flex-col items-center">
            <img
              src="../img/5.png"
              className="hidden h-[450px] object-contain"
              alt=""
            />
          </div>

          <div className="hidden w-1/2 h-full md:flex flex-col items-center justify-center">
            <img
              src="../img/5.png"
              className="h-[400px] object-contain"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
