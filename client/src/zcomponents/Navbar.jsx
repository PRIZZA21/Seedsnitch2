import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const [colorChange, setColorchange] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleHamburger = () => {
    setOpenMenu(!openMenu);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // console.log(userInfo);

  const changeNavbarColor = () => {
    if (window.scrollY >= 20) {
      // x.classList.add("navbarColor");
      setColorchange(true);
    } else {
      // x.classList.remove("navbarColor");
      setColorchange(false);
    }
  };

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  window.addEventListener("scroll", changeNavbarColor);

  return (
    <nav
      className={
        colorChange
          ? "bg-white px-2 flex items-center justify-between pt-4 pb-4 mx-auto fixed top-0 left-0 right-0 z-[1000] text-textBlue font-[600] navbarColor"
          : "bg-white px-2 flex items-center justify-between pt-4 pb-4 mx-auto fixed top-0 left-0 right-0 z-[1000] text-textBlue font-[600]"
      }
    >
      <div className="max-w-1/3">
        <NavLink to="/">
          <img
            src="https://i.ibb.co/mBv3jLQ/favicon-ico.png"
            className="max-w-max h-10 pl-3 pr-5 md:px-5"
            alt=""
          />
        </NavLink>
      </div>

      <div className="hidden container  flex-row items-center justify-center space-x-10 lg:flex max-w-1/6">
        {userInfo && userInfo.isIncubator && (
          <NavLink to="/incubator" className="link font-bold">
            Applications
          </NavLink>
        )}
        <NavLink to="/about" className="link">
          About
        </NavLink>
        <NavLink to="/faq" className="link">
          FAQ
        </NavLink>

        {/* <NavLink to="/contact" className="link">
          Contact
        </NavLink> */}
        <NavLink to="/discussion-forum" className="link">
          {" "}
          Discussion Forum{" "}
        </NavLink>
        <NavLink to="/blogs/page/1" className="link">
          {" "}
          Blogs{" "}
        </NavLink>
        {/* *************************************************************SERVICES REMOVED FROM NAVBAR******************************** */}
        {/* <div className="relative group">
          <button className="flex flex-row items-center w-full link bg-transparent md:w-auto md:inline focus:outline-none">
            <span className="mr-2">Services</span>
            <span className="mt-3">
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </button>
          <div className="absolute z-10 hidden bg-grey-200 group-hover:block rouded-lg">
            <div className="px-4 py-3 bg-white bg-gray-200 shadow-lg w-52 rounded-lg">
              <div className="my-2">
                <NavLink to="/pitch-deck" className="link">
                  Pitch Deck
                </NavLink>
              </div>
              <div className="my-2">
                <NavLink to="/company-reg" className="link">
                  Company Registration
                </NavLink>
              </div>
            </div>
          </div>
        </div> */}

        {/* <NavLink to="/faq" className="link">
          FAQ
        </NavLink> */}
        {userInfo && userInfo.isAmbassador && (
          <NavLink to="/admin/applications-collection" className="link">
            College Applications
          </NavLink>
        )}
        {userInfo && userInfo.isAdmin && (
          <NavLink to="/admin/applications/page/1" className="link">
            Admin Panel
          </NavLink>
        )}
      </div>

      <div className="max-w-1/3 hidden items-center justify-end pr-4 font-semibold button-effect space-x-4 lg:flex">
        {/* <Link
          to="/apply"
          className="cursor-pointer border-gray-200 border flex justify-center items-center font-medium rounded-md hover:bg-accent text-black text-xs shrink-0 py-2 px-2 md:py-2 md:px-4 md:text-sm"
        >
          Apply
        </Link>

        <Link
          to="/ambassador"
          className="cursor-pointer flex justify-center items-center font-medium rounded-md border bg-[#0C6980] text-white hover:bg-[#084352] hover:text-white text-xs shrink-0 py-2 px-3 md:py-2 md:px-6 md:text-sm"
        >
          Become an ambassador
        </Link> */}

        {!userInfo && (
          <Link
            to="/login"
            className="cursor-pointer border-gray-200 border flex justify-center items-center font-medium rounded-md hover:bg-accent text-black text-xs shrink-0 py-2 px-2 md:py-2 md:px-4 md:text-sm"
          >
            Login
          </Link>
        )}

        {userInfo && (
          <div className="dropdown inline-block relative link">
            <button className="rounded inline-flex items-center">
              {userInfo.profile_pic === "" ? (
                <div className="rounded-full border-gray-200 bg-[#0C6980] text-white border-1 w-8 flex flex-row justify-center h-8 items-center font-bold text-lg">
                  {" "}
                  {userInfo.name.split(" ")[0].charAt(0)}
                </div>
              ) : (
                <div className="rounded-full w-10 h-10 mx-auto bg-gray-100 flex items-center justify-center">
                  <img
                    src={`/${userInfo.profile_pic}`}
                    className="rounded-full w-10 h-10"
                    alt=""
                  />
                </div>
              )}
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 bg-gray-200 pt-1 -ml-10 mt-0">
              <li onClick={logoutHandler}>
                <div
                  className="rounded hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap div"
                  to="/"
                >
                  Logout
                </div>
              </li>
              <li>
                <Link
                  className="rounded hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap link"
                  to="/user/profile"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="lg:hidden w-1/2 ml-16 flex items-center justify-end">
        <button
          className={
            openMenu
              ? "block hamburger lg:hidden focus:outline-none open"
              : "block hamburger lg:hidden focus:outline-none "
          }
          onClick={toggleHamburger}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      <div className="lg:hidden">
        <div
          className={
            openMenu
              ? "absolute flex-col items-center self-end py-4 mt-10 space-y-4 font-bold sm:w-min-3xl sm:self-center px-2 right-6 drop-shadow-md text-black bg-slate-50 flex"
              : "invisible absolute flex-col items-center self-end py-4 mt-10 space-y-4 font-bold sm:w-min-3xl sm:self-center px-2 right-6 drop-shadow-md text-black bg-slate-50 flex"
          }
        >
          {userInfo && userInfo.isIncubator && (
            <Link to="/incubator" className="font-medium px-3">
              Applications
            </Link>
          )}
          <Link to="/about" className="font-medium px-3">
            About
          </Link>
          <Link to="/apply" className="font-medium text-darkBlue px-3">
            Apply
          </Link>
          <Link to="/community" className="font-medium px-3">
            Community
          </Link>
          <Link to="/ambassador" className="font-medium text-darkBlue px-3">
            Ambassador Program
          </Link>{" "}
          <Link to="/discussion-forum" className="font-medium px-3">
            Discussion Forum
          </Link>{" "}
          <Link to="/blogs/page/1" className="font-medium px-3">
            Blogs
          </Link>{" "}
          <Link to="/pitch-deck" className="font-medium px-3">
            Pitch Deck
          </Link>{" "}
          <Link to="/company-reg" className="font-medium px-3">
            Company Registration
          </Link>
          <Link to="/faq" className="font-medium px-3">
            FAQ
          </Link>
          <Link to="/contact" className="font-medium px-3">
            Contact
          </Link>
          {userInfo && userInfo.isAdmin && (
            <Link to="/admin/applications/page/1" className="font-medium px-3">
              Admin Options
            </Link>
          )}
          {!userInfo && (
            <Link to="/login" className="font-medium px-3">
              Login
            </Link>
          )}
          {userInfo && (
            <>
              {" "}
              <Link to="/user/profile" className="font-medium px-3">
                Profile
              </Link>
              <Link to="/" className="font-medium px-3" onClick={logoutHandler}>
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
