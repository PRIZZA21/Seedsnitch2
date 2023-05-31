import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Loader from "../../Common_Components/Loader";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item>
            <Link key={x + 1} to={`/admin/blogs/page/${x + 1}`}>
              {x + 1}
            </Link>
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

const TableData = ({ child }) => {
  return (
    <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm">
      {child}
    </td>
  );
};

const TableDataText = ({ text }) => {
  return <p className="text-center text-gray-900 whitespace-no-wrap">{text}</p>;
};

const IncubatorTable = () => {
  const table_headers = ["Author", "Title", "Banner", ""];
  const { pageNumber } = useParams() || 1;
  const [loading, setLoading] = useState("true");
  const [blogsList, setBlogsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const navigate = useNavigate();
  const blog_detailsHandler = (id) => {
    navigate(`/admin/blogs/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`https://seedsnitch-backend.onrender.com/api/blogs?pageNumber=${pageNumber}`).then((res) => {
      setBlogsList(res.data.all_blogs);
      setPage(res.data.page);
      setPages(res.data.pages);
    });
    setLoading(false);
  }, [pageNumber]);

  if (loading) return <Loader />;

  return (
    <div className="sm:px-8 py-4 overflow-x-auto ">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            {table_headers.map((theader) => (
              <th className="px-5 py-3 text-center border-b-2 border-gray-200 font-serif text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {theader}
              </th>
            ))}
          </thead>

          <tbody>
            {blogsList &&
              blogsList.map((blog) => (
                <tr>
                  <TableData
                    child={
                      <TableDataText text={blog.author && blog.author.name} />
                    }
                  />
                  <TableData child={<TableDataText text={blog.title} />} />
                  <TableData
                    child={
                      <img src={`/${blog.banner}`} className="w-8 h-8" alt="" />
                    }
                  />

                  <TableData
                    child={
                      <button
                        type="button"
                        className="inline-block text-gray-500 hover:text-gray-700"
                      >
                        <FontAwesomeIcon
                          icon={faPlay}
                          onClick={() => blog_detailsHandler(blog._id)}
                        />
                      </button>
                    }
                  />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Paginate pages={pages} page={page} />
    </div>
  );
};

export default IncubatorTable;
