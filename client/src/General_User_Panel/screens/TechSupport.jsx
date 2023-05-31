import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../Common_Components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "react-bootstrap";
import Input from "../components/Input";

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item>
            <Link key={x + 1} to={`/tech-support/page/${x + 1}`}>
              {x + 1}
            </Link>
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

const TechSupport = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { pageNumber } = useParams() || 1;

  const [loading, setLoading] = useState(true);
  const [postsList, setPostsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [reply, setReply] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);

  const replyviewchange = (id) => {
    if (id === selectedPostId) {
      setSelectedPostId(null);
      return;
    }
    setSelectedPostId(id);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/posts?pageNumber=${pageNumber}`).then((res) => {
      setPostsList(res.data.all_posts);
      setPage(res.data.page);
      setPages(res.data.pages);
    });
    setLoading(false);
  }, [pageNumber]);

  let config = {};

  if (userInfo) {
    config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
  }

  const reply_handler = (id) => {
    axios
      .post(`/api/replies/create/${id}`, { comment: reply }, config)
      .then((res) => {
        setReply("");
        setSelectedPostId(null);
      });
  };

  if (loading) return <Loader />;

  return (
    <div className="mt-16 mx-auto faq-body gap-x-8 h-[auto] flex flex-col items-center justify-center px-4 md:px-0 md:gap-x-16 w-full pb-12">
      <img
        src="../img/forum.png"
        className="mt-8 h-[300px] mb-8 object-contain"
        alt=""
      />
      <div className="container">
        <div>
          {userInfo ? (
            <Link
              className="cursor-pointer flex mb-2 justify-center items-center font-medium rounded-md border bg-[#0C6980] text-white hover:bg-[#084352] hover:text-white text-xs mx-auto py-2 px-3 mb-10 w-1/2 md:w-1/4  md:py-2 md:px-6 md:text-sm"
              to="/create-post"
            >
              Ask a Question
            </Link>
          ) : (
            <span className="font-medium text-xl flex justify-center mb-10">
              <Link to="/login" className="font-bold text-accent">
                Login Now
              </Link>{" "}
              &nbsp; to interact with others
            </span>
          )}

          {postsList &&
            postsList.map((post) => (
              <div key={post._id}>
                <div className="post-card my-6" key={post._id}>
                  <div>
                    <div className="post-card-title">
                      {" "}
                      {post.title}
                      <span className="post-open-icon ml-2">
                        {userInfo &&
                          post.author &&
                          userInfo._id !== post.author._id && (
                            <FontAwesomeIcon
                              onClick={() => replyviewchange(post._id)}
                              icon={faReply}
                              className="cursor-pointer text-lg text-gray-400 hover:text-gray-600 px-2"
                            />
                          )}
                      </span>
                    </div>
                    <div className="post-card-author my-2">
                      Posted By: {post.author && post.author.name}
                    </div>
                    <div className="post-card-description">
                      {post.description}
                    </div>
                  </div>
                </div>

                {userInfo &&
                  post.author &&
                  userInfo._id !== post.author._id &&
                  post._id === selectedPostId && (
                    <div className="w-full flex flex-wrap mt-6 mb-4">
                      <div className="w-full px-3 flex flex-row justify-end">
                        <Input
                          label={"Reply to post"}
                          type={"text"}
                          name="reply"
                          placeholder={"Enter you reply"}
                          required={true}
                          onChange={(e) => setReply(e.target.value)}
                          additonalClass={"w-3/4"}
                        />

                        <div className="flex flex-row justify-center pl-4 items-center">
                          {post && (
                            <FontAwesomeIcon
                              icon={faPaperPlane}
                              className="text-gray-400 hover:text-gray-600 px-2 cursor-pointer"
                              onClick={() => reply_handler(post._id)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
        </div>

        <Paginate page={page} pages={pages} />
      </div>
    </div>
  );
};

export default TechSupport;
