import React, { useEffect, useState } from "react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Seedsnitch";
  }, []);

  const url =
    "https://script.google.com/macros/s/AKfycbyj7EL2tV1oxo9fK9fefAu0EuckxFwwb288r7g_Vy4pO76FB3eysSE7DhivQeh7FkkELA/exec";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const toggleHandler = () => {
    setIsSubmitted(!isSubmitted);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(url, { method: "POST", body: new FormData(e.target) })
      .then((response) => {
        setIsSubmitted(true);
      })
      .catch((error) => console.error("Error!", error.message));
  };

  if (isSubmitted) {
    return (
      <div className="flex h-[88vh] w-full">
        <div className="my-auto w-1/2 mx-auto">
          <div className="bg-white p-6 rounded-lg drop-shadow-2xl">
            <button
              className="block ml-auto hamburger lg:hidden focus:outline-none open"
              onClick={toggleHandler}
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>
            <img
              src="../img/thankyou.png"
              className="h-52 w-52 mx-auto mb-4"
              alt=""
            />
            <h2 className="text-2xl font-serif font-medium mb-2 text-gray-800 text-center">
              Thanks for contacting
            </h2>
            <p className="text-gray-700 font-serif text-center">
              We will revert back to you soon
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white relative">
      <section className="mt-20 gap-x-8 h-[auto] md:flex-row px-4 md:px-0 md:gap-x-16 bg-[#f8f8f8] w-full border border-b-slate-200">
        <div className="text-center md:w-1/2 w-full h-full mx-auto flex flex-col items-center justify-start md:py-12">
          <div className="w-full md:w-[800px] text-center p-4 md:p-2">
            <h2 className="md:font-extrabold font-bold text-4xl md:text-5xl pb-2 text-accent">
              Get in touch <span className="text-[#242424]"> with us </span>
            </h2>
            {/* <h2 className="font-light text-2xl hidden md:block md:font-normal text-[#242424]">
              Our team is always ready to lend a helping hand and engage in a
              creative dialogue with you.
            </h2> */}
          </div>
        </div>
      </section>

      <section className="h-auto py-4 md:py-10 px-2 relative md:mb-20 md:mt-0">
        <div className="h-full w-full flex flex-col gap-4 justify-between md:flex-row right-4">
          <div className="w-full md:w-1/2 h-full rounded-md mx-auto flex flex-row justify-center mr-3">
            <form
              className="w-full h-full max-w-lg px-4 py-6"
              id="contact-form"
              name="contact"
              onSubmit={submitHandler}
            >
              <img
                src="../img/contact.png"
                className="md:hidden w-[400px] object-contain mx-auto "
                alt=""
              />
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-medium mb-2"
                    htmlFor="grid-first-name"
                  >
                    First Name
                  </label>
                  <input
                    className=" font-serif appearance-none block w-full  text-darkBlue border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    required
                    name="First Name"
                    placeholder="First Name"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-medium mb-2"
                    htmlFor="grid-last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className=" font-serif appearance-none block w-full  text-darkBlue border border-gra rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Last Name"
                    name="Last Name"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-medium mb-2"
                    htmlFor="grid-email"
                  >
                    Email
                  </label>
                  <input
                    className=" font-serif appearance-none block w-full  text-darkBlue border border-gra rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    type="email"
                    name="Email"
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-full px-3">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-medium mb-2"
                    htmlFor="grid-subject"
                  >
                    Subject
                  </label>
                  <input
                    className=" font-serif appearance-none block w-full  text-darkBlue border border-gra rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-subject"
                    type="text"
                    required
                    name="Subject"
                    placeholder="Subject"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-2 mt-8">
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block tracking-wide text-darkBlue text-xs font-medium mb-2"
                    htmlFor="grid-message"
                  >
                    Message
                  </label>
                  <textarea
                    className="resize-none w-full  text-darkBlue border border-b-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-message"
                    placeholder="Enter your message"
                    rows="7"
                    name="Message"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full flex flex-row items-center">
                  <input
                    className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697]"
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="md:hidden flex flex-col items-center">
            <img
              src="../img/contact.png"
              className="hidden h-[450px] object-contain"
              alt=""
            />
            <div className="bg-transparent p-2 flex flex-col justify-center items-start text-left">
              <div>
                <p className="text-2xl font-semibold mb-4">
                  You can also reach out on
                </p>
                <div>
                  <div>
                    <p className="font-medium text-center">
                      Phone:&nbsp;+91 7078123790&nbsp;
                    </p>
                    <p className="font-medium text-center">
                      Email:&nbsp;seedsnitch@abc.com&nbsp;
                    </p>
                  </div>
                  <p>&nbsp;</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden w-1/2 h-full md:flex flex-col items-center justify-center">
            <img
              src="../img/contact.png"
              className="h-[400px] object-contain"
              alt=""
            />
            <div className="bg-transparent p-2 flex flex-col justify-center items-start text-left">
              <div>
                <p className="text-2xl font-semibold mb-4">
                  You can also reach out on
                </p>
                <div>
                  <div>
                    <p className="font-medium text-center">
                      Phone:&nbsp;+91 8979630873&nbsp;
                    </p>
                    <p className="font-medium text-center">
                      Email:&nbsp;connect@seedsnitch.in&nbsp;
                    </p>
                  </div>
                  <p>&nbsp;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
