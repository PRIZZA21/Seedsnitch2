import React from "react";
import { Link } from "react-router-dom";

const Infobar = ({
  start_text,
  end_text,
  link,
  link_text,
  additonalClass,
  invert_text_color,
}) => {
  return (
    <section
      className={`gap-x-8 h-auto md:flex-row px-4 md:px-0 md:gap-x-16 w-full border border-b-slate-200 ${
        additonalClass ? additonalClass : "mt-20 bg-[#f8f8f8] "
      }`}
    >
      <div className="text-center py-12 md:w-=full w-full h-auto  mx-auto flex flex-row items-center justify-around">
        <h2
          className={`md:font-extrabold font-bold text-4xl md:text-5xl pb-2  ${
            invert_text_color ? "text-[#242424]" : "text-accent"
          }`}
        >
          {start_text}{" "}
          <span
            className={`${
              invert_text_color ? "text-accent" : "text-[#242424]"
            }`}
          >
            {" "}
            {end_text}{" "}
          </span>
        </h2>
        {link && (
          <Link
            className="cursor-pointer flex justify-center items-center font-medium rounded-md border bg-[#0C6980] text-white hover:bg-[#084352] hover:text-white text-xs shrink-0 py-2 px-3 md:py-2 md:px-6 md:text-sm"
            to={link}
          >
            {link_text}
          </Link>
        )}
      </div>
    </section>
  );
};

export default Infobar;
