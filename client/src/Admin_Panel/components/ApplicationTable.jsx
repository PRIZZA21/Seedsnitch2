import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { listApplications } from "../../redux/actions/applicationsActions";
import Loader from "../../Common_Components/Loader";
import { Pagination } from "react-bootstrap";

const Paginate = ({ pages }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item>
            <Link key={x + 1} to={`/admin/applications/page/${x + 1}`}>
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

const ApplicationTable = () => {
  const table_headers = [
    "Startup Name",
    "Founder",
    "College",
    "Startup Stage",
    "Linkedin",
    "Status",
    "",
  ];

  const applicationsList = useSelector((state) => state.applicationsList);
  const { applications, loading, page, pages } = applicationsList;

  const { pageNumber } = useParams() || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listApplications("", pageNumber));
  }, [dispatch, pageNumber]);

  const navigate = useNavigate();

  const inc_detailsHandler = (id) => {
    navigate(`/application/${id}`);
  };

  return (
    <div className="sm:px-8 py-4 overflow-x-auto ">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <Loader />
        ) : (
          <table className="min-w-full leading-normal text-center">
            <thead>
              {table_headers.map((theader) => (
                <th
                  key={theader}
                  className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-center font-semibold text-black title font-serif tracking-wider"
                >
                  {theader}
                </th>
              ))}
            </thead>

            <tbody>
              {applications &&
                applications.map((application) => (
                  <tr key={application._id}>
                    <TableData
                      child={<TableDataText text={application.startup_name} />}
                    />

                    <TableData
                      child={
                        <>
                          <TableDataText text={application.name} />
                          <p className="text-gray-600 whitespace-no-wrap">
                            {application.email}
                          </p>
                        </>
                      }
                    />

                    <TableData
                      child={<TableDataText text={application.college_name} />}
                    />

                    <TableData
                      child={<TableDataText text={application.startup_stage} />}
                    />

                    <TableData
                      child={
                        <Link
                          as={"p"}
                          to={application.linkedin_profile}
                          className="text-gray-900 whitespace-no-wrap"
                          target="_blank"
                        >
                          Visit
                        </Link>
                      }
                    />

                    {application.curr_status === "Accepted" ? (
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">
                            {application.curr_status}
                          </span>
                        </span>
                      </td>
                    ) : application.curr_status === "Applied" ? (
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                          />
                          <span className="relative">
                            {application.curr_status}
                          </span>
                        </span>
                      </td>
                    ) : (
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          />
                          <span className="relative">
                            {application.curr_status}
                          </span>
                        </span>
                      </td>
                    )}

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                      <button
                        type="button"
                        className="inline-block text-gray hover:text-gray-700"
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => inc_detailsHandler(application._id)}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <Paginate pages={pages} page={page} />
    </div>
  );
};

export default ApplicationTable;
