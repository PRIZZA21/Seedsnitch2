import axios from "axios";
import React, { useEffect, useState } from "react";
import Infobar from "../../Common_Components/Infobar";
import Loader from "../../Common_Components/Loader";

const Community = () => {
  const [ecellsList, setEcellsList] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/ecells/all").then((res) => setEcellsList(res.data));
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <Infobar
        start_text={"Our Network of"}
        end_text={"Entrepreneurial Cells"}
        invert_text_color={true}
      />
      <section>
        <div className="py-4 min-h-[60vh] text-center mx-auto flex flex-col items-center justify-start">
          <div className="w-full p-4 flex flex-col  justify-center items-center my-4 md:flex-row md:flex-wrap">
            {ecellsList &&
              ecellsList.map((ecell) => (
                <div
                  key={ecell._id}
                  className="w-full h-100 bg-white rounded-lg border-2 md:shadow-md m-4 md:mx-6 md:my-10 md:w-1/5"
                >
                  <img
                    src={`/${ecell.logo}`}
                    alt=""
                    className="h-52 w-full my-2 md:h-40 object-contain rounded-t-lg"
                  />
                  <div className="px-6 py-2">
                    <h2 className="font-bold mb-2 text-2xl text-gray-800 my-4">
                      {ecell.name}
                    </h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
