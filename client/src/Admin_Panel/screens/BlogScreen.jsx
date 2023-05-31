import React from "react";

import Infobar from "../../Common_Components/Infobar";
import Sidebar from "../components/Sidebar";
import BlogTable from "../components/BlogTable";

const BlogScreen = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />

      <div className="w-full relative">
        <Infobar
          start_text={"Blogs"}
          end_text={"written to community"}
          link={"/admin/add-blog"}
          link_text={"Post a new Blog"}
          additonalClass={"mt-0 bg-white"}
        />

        <section className="h-auto w-3/4 py-10 px-2 relative md:mb-20 md:mt-0 mt-10 mx-auto">
          <div className="h-full md:flex-row right-4">
            <BlogTable />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogScreen;
