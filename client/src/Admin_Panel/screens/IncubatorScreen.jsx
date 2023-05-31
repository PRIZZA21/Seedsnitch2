import React from "react";
import Infobar from "../../Common_Components/Infobar";
import IncubatorTable from "../components/IncubatorTable";
import Sidebar from "../components/Sidebar";

const IncubatorScreen = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-full bg-white relative">
        <Infobar
          start_text={"Incubators"}
          end_text={"associated with us"}
          link={"/admin/add-incubator"}
          link_text={"Add an Incubator"}
          additonalClass={"mt-0 bg-white"}
        />

        <section className="h-auto w-5/6 py-10 px-2 relative md:mb-20 md:mt-0 mt-10 mx-auto">
          <div className="h-full  md:flex-row right-4">
            <IncubatorTable />
          </div>
        </section>
      </div>
    </div>
  );
};

export default IncubatorScreen;
