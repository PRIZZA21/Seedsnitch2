import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Loader from "../../Common_Components/Loader";
import axios from "axios";

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item>
            <Link key={x + 1} to={`/admin/incubators/page/${x + 1}`}>
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

export const Toggle = ({ label, toggled, onClick }) => {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <label>
      <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
      <span />
      <strong>{label}</strong>
    </label>
  );
};

const IncubatorTable = () => {
  const table_headers = [
    "Incubator Name",
    "Incubator Email",
    "Applications Submitted",
    "Applications Accepted",
    "Recieve Applications",
  ];
  const { pageNumber } = useParams() || 1;
  const [loading, setLoading] = useState("true");
  const [incubatorList, setIncubatorList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const logState = (id) => {
    axios.put(`https://seedsnitch-backend.onrender.com/api/incubators/toggleincubator/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`https://seedsnitch-backend.onrender.com/api/incubators?pageNumber=${pageNumber}`).then((res) => {
      setIncubatorList(res.data.incubators);
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
                className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-black title font-serif tracking-wider"
              >
                {theader}
              </th>
            ))}
          </thead>

          <tbody>
            {incubatorList &&
              incubatorList.map((incubator) => (
                <tr key={incubator._id}>
                  <TableData child={<TableDataText text={incubator.name} />} />
                  <TableData child={<TableDataText text={incubator.email} />} />
                  <TableData
                    child={
                      <TableDataText
                        text={incubator.applications_submitted.length}
                      />
                    }
                  />
                  <TableData
                    child={
                      <TableDataText
                        text={incubator.applications_accepted.length}
                      />
                    }
                  />
                  <TableData
                    child={
                      <Toggle
                        label=""
                        toggled={incubator.active}
                        onClick={() => logState(incubator._id)}
                      />
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
