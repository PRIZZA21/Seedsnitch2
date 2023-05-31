import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate, redirect } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../Common_Components/Loader";
import axios from "axios";

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item>
            <Link key={x + 1} to={`/users/posts/page/${x + 1}`}>
              {x + 1}
            </Link>
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

const UserPostTable = () => {
  const { pageNumber } = useParams() || 1;
  const [loading, setLoading] = useState("true");
  const [postsList, setPostsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
  }, [userInfo.token]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/posts/creator/${userInfo._id}?pageNumber=${pageNumber}`,
        config
      )
      .then((res) => {
        setPostsList(res.data.all_posts);
        setPage(res.data.page);
        setPages(res.data.pages);
      });
    setLoading(false);
  }, [pageNumber, userInfo._id, config]);

  const replyview = (id) => {
    navigate(`/users/post/${id}`);
  };

  if (!userInfo) redirect(userInfo);

  if (postsList && postsList.length === 0)
    return (
      <div className="text-2xl text-center mt-12 font-semibold font-serif">
        You have not posted any blogs till now.
      </div>
    );

  if (loading) return <Loader />;

  return (
    <div className="sm:px-8 py-4 overflow-x-auto ">
      <div className="inline-block min-w-full overflow-hidden">
        {postsList &&
          postsList.map((post) => (
            <div key={post._id}>
              <div className="post-card" key={post._id}>
                <div>
                  <div className="post-card-title">
                    {post.title}
                    <span className="post-open-icon ml-2">
                      {
                        <FontAwesomeIcon
                          onClick={() => replyview(post._id)}
                          icon={faPlay}
                          className="cursor-pointer text-lg text-gray-400 hover:text-gray-600 px-2"
                        />
                      }
                    </span>
                  </div>
                  <div className="post-card-author">
                    {" "}
                    Posted By: {post.author && post.author.name}{" "}
                  </div>
                  <div className="post-card-description">
                    {" "}
                    {post.description}{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Paginate pages={pages} page={page} />
    </div>
  );
};

export default UserPostTable;
