import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Common_Components/Loader";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/blogs/${id}`).then((res) => {
      setBlog(res.data);
    });
    setLoading(false);
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="p-8 md:px-20 mt-20 md:py-20">
        <div className="flex flex-col items-center gap-20 md:gap-8 justify-center mb-5">
          <div className="flex flex-col w-full md:w-1/2 justify-center ">
            <div className="text-4xl text-left font-medium mb-2 text-center text-[#242424]">
              {blog.title}
            </div>
            <p className="text-xl  font-semibold text-center md:ml-48  my-4">
              - Posted By:{" "}
              <span className="text-accent">
                {/* {blog.author && blog.author.name} */}
                Admin
              </span>
            </p>
          </div>
          <img
            src={`/${blog.banner}`}
            className="h-96 w-full md:w-1/2 object-cover rounded-lg"
            alt=""
          />
        </div>

        <div
          className="text-justify leading-10 text-[1.5rem] w-full md:w-1/2 md:mx-auto text-[#242424]"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetails;
