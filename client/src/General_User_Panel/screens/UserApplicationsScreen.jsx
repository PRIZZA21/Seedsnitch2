import React from "react";
import Infobar from "../../Common_Components/Infobar";
import UserApplicationTable from "../components/UserApplicationTable";
// import img from "../../assets/app.jpg";

const UserApplicationScreen = () => {
  return (
    <div className="flex flex-row">
      <div className="w-full bg-white relative">
        <Infobar start_text={"Your "} end_text={"Applications"} />
        <section className="h-auto min-h-[60vh] w-5/6 py-4 px-2 relative md:mt-0 mt-10 mx-auto">
          {/* <img src={img} /> */}
          <div className="h-full md:flex-row right-4">
            <UserApplicationTable />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserApplicationScreen;
