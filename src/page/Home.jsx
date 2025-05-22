import React, { useEffect, useState } from "react";
import { deleteData, getData } from "../optimizatsiya";
import { toast } from "sonner";
import Masonry from "react-masonry-css";
import Addimgs from "../components/Addimgs";

function Home() {
  let [data, setData] = useState([]);
  function handleDelete(id) {
    console.log(id);
    
    deleteData(id)
      .then((res) => {
        toast.success(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
      <Addimgs />
      <Masonry
        // breakpointCols={breakpoints}
        className="my-masonry-grid flex"
        columnClassName="my-masonry-grid_column"
      >
        {data &&
          data.map((value) => {
            return (
              <div key={value.id} className="relative">
                <img src={value.img} alt="" />
                <button
                  onClick={(e) => {
                    handleDelete(value.id);
                  }}
                  className="absolute top-1"
                >
                  deleted
                </button>
              </div>
            );
          })}
      </Masonry>
    </div>
  );
}

export default Home;
