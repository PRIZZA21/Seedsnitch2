import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Infobar from "../../Common_Components/Infobar";
import "./blog.css";
import Loader from "../../Common_Components/Loader";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item key={x + 1}>
            <Link key={x + 1} to={`/blogs/page/${x + 1}`}>
              {x + 1}
            </Link>
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

const BlogPage = () => {
  const [blogList, setBlogList] = useState([]);
  const { pageNumber } = useParams() || 1;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const blog_detailsHandler = (id) => {
    navigate(`/blog/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`https://seedsnitch-backend.onrender.com/api/blogs?pageNumber=${pageNumber}`).then((res) => {
      setBlogList(res.data.all_blogs);
      setPage(res.data.page);
      setPages(res.data.pages);
      setLoading(false);
    });
  }, [pageNumber]);

  if (loading) return <Loader />;

  return (
    <div className="bg-white relative">
      <Infobar start_text={""} end_text={"Blogs"} invert_text_color={true} />

      {/* <div className="py-10 min-h-[60vh] flex flex-col md:flex-row md:justify-center md:flex-wrap gap-2 mx-3 md:mx-auto">
        {blogList &&
          blogList.map((blog) => (
            <div
              
              className="flex flex-col items-center justify-around gap-y-8 w-full md:w-1/4 mx-2 pb-8 border-[1px] hover:shadow-2xl ease-in duration-200 mb-5 rounded-2xl"
            >
              <div
                className="w-full h-52 cursor-pointer rounded-t-2xl"
                
              >
                <img
                  
                  className="object-cover w-full h-full rounded-t-2xl"
                  alt=""
                />
              </div>

              <div className="flex flex-col items-center md:items-center">
                <span
                  className="font-[500] text-center text-xl text-gray-700 mx-2 cursor-pointer"
                  onClick={() => blog_detailsHandler(blog._id)}
                >

                </span>
              </div>
            </div>
          ))}
      </div> */}
      <div className="container2 mx-auto">
        {blogList &&
          blogList.map((blog) => (
            <div
              className="card"
              key={blog._id}
              onClick={() => blog_detailsHandler(blog._id)}
            >
              <div className="card__header">
                <img
                  src={`/${blog.banner}`}
                  alt="card__image"
                  className="card__image"
                  width="600"
                />
              </div>
              <div className="card__body">
                <h4> {blog.title}</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Soluta porro necessitatibus laborum, velit ex atque nisi
                  voluptate minus iusto adipisci.
                </p>
              </div>
              <div className="card__footer">
                <div className="user">
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/737373/administrator-male.png"
                    alt="user__image"
                    className="user__image"
                  />
                  <div className="user__info">
                    <h5>Admin</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="my-8">
        <Paginate pages={pages} page={page} />
      </div>
    </div>
  );
};

export default BlogPage;
