import React, { useState } from "react";
import Infobar from "../../Common_Components/Infobar";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const AddIncubator = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/admin/incubators";
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("/api/incubators/create", { name, email });
    navigate(redirect);
  };

  return (
    <div className="flex flex-row">
      <Sidebar />

      <div className="w-full bg-white relative">
        <Infobar start_text={"Add"} end_text={"new Incubator"} additonalClass={"mt-0 bg-white"}/>

        <section className="h-auto py-10 px-2 relative md:mb-20 md:mt-0 mt-10">
          <div className="h-full w-full flex flex-col gap-4 justify-between md:flex-row right-4">
            <div className="w-full md:w-1/2 h-full rounded-md mx-auto flex flex-row justify-center">
              <form
                className="w-full h-full max-w-lg px-4 py-6 mx-auto"
                id="contact-form"
                name="addinc"
                onSubmit={submitHandler}
              >
                <Input
                  label="Incubator Name"
                  type="text"
                  name="name"
                  placeholder="Enter the name of incubator"
                  required={true}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  label="Incubator Email"
                  type="email"
                  name="email"
                  placeholder="Enter email id of incubator"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="w-5/6 mx-auto">
                  <div className="w-full flex flex-row items-center">
                    <input
                      className="shadow color focus:shadow-outline focus:outline-none text-white font-semibold px-3 py-2 rounded w-full bg-accent hover:bg-[#37a697] cursor-pointer"
                      type="submit"
                      value="Add Now"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddIncubator;
