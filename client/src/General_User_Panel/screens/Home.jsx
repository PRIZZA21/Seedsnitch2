import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { login_google } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Community from "./Community.jsx"

const Home = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const getUser = () => {
    if (!userInfo)
      fetch("https://seedsnitch-backend.onrender.com/api/users/glogin/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //"Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          else {
          }
        })
        .then((resObject) => {
          dispatch(login_google(resObject));
        })
        .catch((err) => {});
  };

  useEffect(() => {
    document.title = "Home | Seedsnitch";
    getUser();
  });

  return (
    <div>
      <section
        id="intro"
        className="hidden h-auto w-full overflow-hidden md:flex justify-between flex-row mt-24 px-24 mb-6 text-left"
      >
        <div
          className="w-1/2 space-y-8 flex flex-col justify-center items-start pt-20 text-center pl-32"
          id="intro-text"
        >
          <div
            className="text-3xl pt-5 md:max-w-3xl text-accent md:text-6xl md:font-bold lg:font-black text-left"
            id="intro-text"
          >
            <span className="mt-64 relative text-center">
              Fueling the college startup revolution
              <img
                src="./img/icon.png"
                className="w-[50px] absolute -right-14 -top-6"
                alt={"icon"}
              />
            </span>
          </div>
          <div className="max-w-lg text-medBlue font-semibold text-[20px] text-left">
            <p>
              Supporting college entrepreneurs through funding prospects,
              mentorship, and campus representation.
            </p>
          </div>
          <div className="flex gap-4">
            {/* <Link to="/about">
              <button className="text-white bg-[#0C6980] rounded-md py-3 px-7 text-[18px] hover:bg-[#084352]">
                Learn More
              </button>
            </Link> */}
            <Link to="/apply">
              <button className="text-black text-[700] border-[1px] border-gray rounded-md py-3 px-7 text-[18px] hover:bg-accent">
                Apply
              </button>
            </Link>
            <Link to="/ambassador">
              <button className="text-white bg-[#0C6980] rounded-md py-3 px-7 text-[18px] hover:bg-[#084352]">
                Become an ambassador
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex flex-row items-center justify-end p-8">
          <img src="img/2.jpg" className="object-cover" alt="" />
        </div>
      </section>

      <section id="intro2" className="w-screen h-fit mb-10 block md:hidden ">
        <div className="w-full h-fit space-y-12 pt-12 pb-4 flex flex-col items-center justify-center mt-12 md:mt-28 rounded-xl z-10">
          <div
            className="hidden container text-center text-4xl md:text-5xl text-accent font-[800] md:flex flex-col justify-center md:bg-[#f8f8f8] py-8"
            id="intro-text"
          >
            <span>Fueling the college</span>
            <span> startup revolution</span>
          </div>
          <div
            className=" block md:hidden container text-center text-4xl text-accent font-[800] flex flex-col justify-center md:bg-[#f8f8f8] py-8"
            id="intro-text"
          >
            <span>Fueling the college startup revolution</span>
          </div>
          <div className="px-3">
            <img src="img/2.jpg" className="object-cover" alt="" />
          </div>

          <div className="text-medBlue font-bold text-center text-[24px] md:text-[20px] px-2 ">
            <p>
              Supporting college entrepreneurs with funding prospects,
              networking, and campus representation.
            </p>
          </div>
          <div>
            <Link to="/apply">
              <button className="text-white bg-[#0C6980] rounded-md py-3 px-9 mt-4 text-[16px] hover:bg-[#084352]">
                Apply
              </button>
            </Link>
          </div>
          {/* <img src="./img/cover.jpg" className="-z-10" id="index-img" alt="" /> */}
        </div>
      </section>
      <Community></Community>

      <section className="mt-2 md:mt-20 gap-x-8 h-auto md:flex-row px-4 md:px-0 md:gap-x-16 md:bg-[#f8f8f8] w-full md:border border-b-slate-200">
        <div className="text-center md:w-1/2 w-full h-full mx-auto flex flex-col items-center justify-start md:py-12">
          <div className="w-full md:w-[800px] text-center p-4 md:p-2">
            <h2 className="md:font-extrabold font-bold text-[1.8rem] md:text-5xl pb-2 text-accent">
              A Guide <span className="text-[#242424]">for Participants</span>
            </h2>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full mx-auto h-auto flex flex-col items-center justify-center px-2 md:px-10  md:mb-0 md:pb-10 mb-6 mt-18 pt-4">
          <div className="index-row gap-5 flex flex-col justify-between w-5/6 md:w-5/6 md:flex-row ">
            <div className="course-col flex flex-col gap-3 p-2 pt-0">
              <img
                src="img/Student_Founders.png"
                alt="incubators"
                className="p-2"
              />

              <div>
                <h3>Student Founders</h3>
                <p className="pb-2 pt-1 px-2">
                  Our platform is designed in a manner that ensures maximum
                  number of applications bag funding whereas the ones that do
                  not, receive a thorough examination of their idea.
                </p>
              </div>
            </div>

            <div className="course-col flex flex-col gap-3 p-2 pt-0">
              <img
                className="mt-6 p-2"
                src="img/Incubators_.png"
                alt="incubators"
              />
              <div>
                <h3>Investors</h3>
                <p className="pb-2 pt-1 px-2">
                  Being a part of a large community gives you the advantage of
                  connecting with a diverse group of entrepreneurs, which
                  translates into potentially high-yielding investment
                  opportunities.
                </p>
              </div>
            </div>

            <div className="course-col flex flex-col gap-3 px-2 pt-0">
              <img
                src="img/College_Students.png"
                alt="incubators"
                className="p-2"
              />

              <div>
                <h3>College Students</h3>
                <p className="pb-2 pt-1 md:px-2">
                  Earn by referring startups to our platform. Our Ambassador
                  Program is designed to incentivise and promote the spirit of
                  entrepreneurship among college students and encourage them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
