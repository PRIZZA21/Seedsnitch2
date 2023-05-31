import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About | Seedsnitch";
  }, []);
  return (
    <div>
      <section class="mt-20 gap-x-8 h-[auto] md:flex-row px-4 md:px-0 md:gap-x-16 bg-[#f8f8f8] w-full border border-b-slate-200 ">
        <div class="text-center md:w-1/2 w-full h-full mx-auto flex flex-col items-center justify-start md:py-12 ">
          <div class="w-full md:w-[800px] text-center p-4 md:p-2">
            <h2 class="hidden md:block md:font-extrabold font-bold text-4xl md:text-5xl pb-2 text-black">
              Get to know <span class="text-accent"> about us</span>
            </h2>
            <h2 class="block md:hidden md:font-extrabold font-bold text-4xl md:text-5xl pb-2 text-black">
              Get to know <span class="text-accent"> about us</span>
            </h2>
          </div>
        </div>
      </section>

      <section className="mt-10 ">
        <div className="py-4 -mt-16 md:-mt-20  text-center mx-auto flex flex-col items-center justify-start ">
          <div className="w-full md:p-4 flex flex-row justify-between items-center md:my-4">
            <div className="hidden md:flex flex-row justify-center w-1/2">
              <img
                src="../img/About_us.png"
                className="w-[600px] object-right"
                alt=""
              />
            </div>
            <div className="container md:w-1/2 w-full flex flex-col items-center md:items-start justify-center md:px-12  space-y-3 md:pb-12">
              <img
                src="../img/About_us.png"
                className="block w-[320px] md:hidden "
                alt=""
              />
              <h1 className="font-bold text-4xl md:text-5xl md:pb-2 text-accent text-center w-full">
                What is Seedsnitch?
              </h1>

              <p className="text-center text-[20px] font-normal w-full px-4">
                Seedsnitch is a platform dedicated to helping college students
                transform their ideas into successful ventures{" "}
                <span className="hidden md:inline">
                  Being aware of the unique challenges that a student might come
                  across while starting up, we are here to bridge the gap
                  through guidance and resources essential for overcoming them.
                  We are a community with a stern belief that when entrepreneurs
                  come together to share their experiences and get support,
                  great things happen.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="service" className="mb-12   md:pl-10 px-24">
        <div className="mx-auto text-center text-[40px] md:text-5xl font-bold text-[#242424] mb-8">
          <span className="text-accent"> Why</span> Choose Us?
        </div>

        <main>
          <p className="text-[16px]">
            <img
              src="../img/choose1.png"
              alt=""
              className="hidden absolute -left-64 w-60 top-2 md:top-0 md:block"
            />
            <b> Seed funding and pre-seed funding opportunities :</b> We provide
            the initial funding required to get your business off the ground and
            assist with the early phases of execution.
          </p>
          <p className="text-[16px]">
            <img
              src="../img/choose2.png"
              alt=""
              className="hidden absolute -right-64 w-64 top-2 md:top-0 md:block"
            />
            <b> Mentorship and guidance from experienced entrepreneurs : </b>Our
            network of experienced entrepreneurs, industry professionals, and
            educators provides guidance and support to help you navigate the
            startup world and achieve your goals.
          </p>
          <p className="text-[16px]">
            <img
              src="../img/calendar.png"
              alt=""
              className="hidden absolute -left-64 w-44 top-2 md:top-0 md:block"
            />
            <b> Comprehensive Idea Validation : </b>Our platform provides a
            comprehensive examination of your idea through multiple incubators,
            ensuring maximum funding opportunities and delivering a detailed
            validation report that identifies areas for improvement.
          </p>

          <p className="text-[16px]">
            <img
              src="../img/campus.png"
              alt=""
              className="hidden absolute -right-64 w-64 top-2 md:top-0 md:block"
            />
            <b> Campus ambassador program:</b> The program, which is open to all
            college students, is an excellent way to gain valuable experience in
            the startup world, network with like-minded individuals, and earn
            extra money.
          </p>
        </main>
      </section>
    </div>
  );
};

export default About;
