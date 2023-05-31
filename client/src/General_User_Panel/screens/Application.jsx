import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Common_Components/Loader";

const ApplicationDetails = () => {
  const params = useParams();
  // const [name,setName] = useState('')
  const [appln, setAppln] = useState({});

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [reason, setReason] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
  }, [userInfo.token]);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`https://seedsnitch-backend.onrender.com/api/applications/details/`, { appln_id: params.id }, config)
      .then((res) => {
        setAppln(res.data);
      })
      .catch((error) => {
        setErr(error.response.data.message);
      });
    setLoading(false);
  }, [appln, params.id, config]);

  let navigate = useNavigate();

  const acceptHandler = () => {
    axios.post(
      `https://seedsnitch-backend.onrender.com/api/applications/accept/${params.id}`,
      { email: userInfo.email, reason: reason },
      config
    );
    navigate("/incubator");
  };

  const rejectHandler = () => {
    if (reason === "") {
      alert("Reason can't be empty");
    } else {
      axios.post(
        `https://seedsnitch-backend.onrender.com/api/applications/reject/${params.id}`,
        { email: userInfo.email, reason: reason },
        config
      );
      navigate("/incubator");
    }
  };

  if (loading && err === "") {
    return (
      <div className="mt-48 mx-80 mb-80 px-96">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <section className="mt-20 gap-x-8 mb-6 h-[auto] md:flex-row px-4 md:px-0 md:gap-x-16 bg-[#f8f8f8] w-full border border-b-slate-200">
        <div className="text-center md:w-1/2 w-full h-full mx-auto flex flex-col items-center justify-start md:py-12">
          <div className="w-full md:w-[800px] text-center p-4 md:p-2">
            <h2 className="md:font-extrabold font-medium text-4xl md:text-5xl pb-2 text-[#242424]">
              Application <span className="text-accent">Details</span>
            </h2>
          </div>
        </div>
      </section>

      {err ? (
        <div className="min-h-[400px] mx-auto  text-center text-3xl mt-12">
          {err}
        </div>
      ) : (
        <section
          id="about-container"
          className="mt-10 md:mt-10 md:mb-20 h-auto"
        >
          <div className="h-full w-full flex flex-col gap-4 justify-between items-center space-y-8 p-4 md:pt-10">
            <div className="w-full md:w-[800px] h-auto rounded-md mx-auto border-t px-2 bg-white">
              <form
                className="w-full h-full md:px-8 pt-6 pb-3 box-shadow-xl"
                name="apply"
                id="apply-form"
              >
                <div className="md:flex md:items-start md:justify-between bg-white justify-center">
                  <div className="w-full md:w-1/2 flex flex-col md:items-start md:justify-start items-center">
                    <div className="flex flex-wrap mb-6 w-full">
                      <div className="w-full px-3">
                        <label className="block tracking-wide text-darkBlue text-xs font-medium mb-2">
                          First Name
                        </label>
                        <input
                          className="appearance-none block w-full  text-darkBlue border border-gray font-serif  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          readOnly
                          value={appln.name}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap mb-6 w-full">
                      <div className="w-full px-3">
                        <label className="block tracking-wide text-darkBlue text-xs font-medium mb-2">
                          E-Mail
                        </label>
                        <input
                          className="appearance-none block w-full  text-darkBlue border border-gray font-serif  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-email"
                          type="email"
                          value={appln.email}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap mb-6 w-full">
                      <div className="w-full px-3">
                        <label className="block tracking-wide text-darkBlue text-xs font-medium mb-2">
                          Linkedin Profile Link
                        </label>
                        <input
                          className="appearance-none block w-full  text-darkBlue border border-gray font-serif  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="url"
                          value={appln.linkedin_profile}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col md:items-start md:justify-start items-center">
                    <div className="flex flex-wrap mb-6 w-full">
                      <div className="w-full md:w-full px-3">
                        <label className="block tracking-wide text-darkBlue text-xs font-medium mb-2">
                          Startup Name
                        </label>
                        <input
                          className="appearance-none block w-full  text-darkBlue border border-gray font-serif  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          value={appln.startup_name}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-6 w-full">
                      <div className="w-full px-3">
                        <label className="block tracking-wide text-darkBlue text-xs font-medium mb-2">
                          College
                        </label>
                        <input
                          className="appearance-none block w-full  text-darkBlue border border-gray font-serif  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          value={appln.college_name}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-6 w-full">
                      <div className="w-full px-3">
                        <label className="block tracking-wide text-darkBlue text-xs font-medium mb-2">
                          Contact Number
                        </label>
                        <input
                          className="appearance-none block w-full  text-darkBlue border border-gray font-serif  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="number"
                          value={appln.contact_number}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="px-4"> */}
                <div className="flex flex-wrap mb-6 w-full">
                  <div className="w-full md:w-full px-3">
                    <label className="block tracking-wide text-darkBlue text-xs font-medium mb-2">
                      What is the current status of your startup (Ideation,
                      Early-stage)?
                    </label>
                    <input
                      className="appearance-none block w-full  text-darkBlue border border-gray font-serif  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      value={appln.startup_stage}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-wrap mb-2">
                  <div className="w-full mb-6 md:mb-0 px-3">
                    <label className="block tracking-wide text-darkBlue text-xs font-medium mb-2">
                      Describe your startup?
                    </label>
                    <textarea
                      className="w-full  text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      rows="7"
                      value={appln.startup_problem}
                    ></textarea>
                  </div>
                </div>

                <div className="w-full flex flex-wrap">
                  <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-darkBlue text-xs font-medium mb-2">
                      How does your startup differentiate itself from similar
                      products (if any)?
                    </label>
                    <textarea
                      className="w-full  text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      rows="7"
                      value={appln.startup_differentiator}
                    ></textarea>
                  </div>
                </div>

                {appln.pitch_deck && appln.pitch_deck !== "" && (
                  <div className="w-full flex flex-wrap">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                      <div className="block tracking-wide text-darkBlue text-xs font-medium mb-2">
                        PitchDeck -{" "}
                        <Link
                          target="_blank"
                          to={appln.pitch_deck}
                          className="text-blue-400 text-md font-semibold"
                        >
                          Check Now
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {userInfo &&
            userInfo.isIncubator &&
            appln.curr_status === "Applied" && (
              <div className="mx-auto">
                <div className="flex flex-wrap mx-auto mb-6 w-3/4 md:w-2/4">
                  <div className="w-full px-3">
                    <input
                      className="appearance-none block w-full  text-darkBlue border border-gray font-serif  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-name"
                      type="text"
                      required
                      name="Name"
                      placeholder="Enter the reason to reject"
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-8 md:gap-0 md:flex-wrap mx-auto w-1/5 md:w-1/6 justify-around mb-8">
                  <button
                    className="rounded-lg px-4 py-2 bg-green-300 text-black-100 font-medium hover:bg-green-500 duration-300"
                    onClick={acceptHandler}
                  >
                    Accept
                  </button>
                  <button
                    className="rounded-lg px-4 py-2 bg-red-300 text-black-100 font-medium hover:bg-red-500 duration-300"
                    onClick={rejectHandler}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
        </section>
      )}
    </div>
  );
};

export default ApplicationDetails;
