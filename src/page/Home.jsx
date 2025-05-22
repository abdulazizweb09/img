import React, { useEffect, useState } from "react";
import { getData } from "../optimizatsiya";
import { toast } from "sonner";
import Masonry from "react-masonry-css";
import Addimgs from "../components/Addimgs";

function Home() {
  let [data, setData] = useState([]);
  useEffect(function () {
    getData()
      .then((res) => {
        toast.success("succes");
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);
  return (
    <div>
      <Addimgs/>
      <Masonry
        // breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data &&
          data.map((value) => {
            return (
              <div>
                <img src={value.img} alt="" />
              </div>
            );
          })}
      </Masonry>
    </div>
  );
}

export default Home;
