import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Loader from "../../Common_Components/Loader";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item>
            <Link key={x + 1} to={`/admin/ecells/page/${x + 1}`}>
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
  const table_headers = [
    "E-cell Name",
    "E-cell Email",
    "E-cell College",
    "E-cell Logo",
    "",
  ];
  const { pageNumber } = useParams() || 1;
  const [loading, setLoading] = useState("true");
  const [ecellsList, setEcellsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const navigate = useNavigate();
  const ecell_detailsHandler = (id) => {
    navigate(`/admin/ecells/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/ecells?pageNumber=${pageNumber}`).then((res) => {
      setEcellsList(res.data.all_ecells);
      setPage(res.data.page);
      setPages(res.data.pages);
    });
    setLoading(false);
  }, [pageNumber]);

  if (loading) return <Loader />;

  return (
    <div className="sm:px-8 py-4 overflow-x-auto ">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal text-center">
          <thead>
            {table_headers.map((theader) => (
              <th
                key={theader}
                className="px-5 py-3 text-center border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-black title font-serif tracking-wider"
              >
                {theader}
              </th>
            ))}
          </thead>

          <tbody>
            {ecellsList &&
              ecellsList.map((ecell) => (
                <tr key={ecell._id}>
                  <TableData child={<TableDataText text={ecell.name} />} />
                  <TableData child={<TableDataText text={ecell.email} />} />
                  <TableData child={<TableDataText text={ecell.college} />} />
                  <TableData
                    child={
                      <img
                        src={`/${ecell.logo}`}
                        alt=""
                        className="w-8 h-8 mx-auto"
                      />
                    }
                  />

                  <TableData
                    child={
                      <button type="button" className="inline-block text-black">
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => ecell_detailsHandler(ecell._id)}
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
