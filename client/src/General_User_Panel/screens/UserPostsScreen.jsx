import React from "react";
import Infobar from "../../Common_Components/Infobar";
import UserPostTable from "../components/UserPostTable";

const UserPostsScreen = () => {
  return (
    <div className="flex flex-row">
      <div className="w-full bg-white relative">
        <Infobar
          start_text={"Your "}
          end_text={"Posts "}
          invert_text_color={true}
        />
        <section className="h-auto min-h-[60vh] w-5/6 py-4 px-2 relative md:mt-0 mt-10 mx-auto">
          <div className="h-full md:flex-row right-4">
            <UserPostTable />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPostsScreen;
