import React, { useEffect, useState } from "react";
import { deleteData, getData } from "../optimizatsiya";
import { toast } from "sonner";
import Addimgs from "../components/Addimgs";
import Masonry from "react-masonry-css";

function Home() {
  let [data, setData] = useState([]);
  // function handleDelete(id) {
  //   console.log(id);

  //   deleteData(id)
  //     .then((res) => {
  //       toast.success(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
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
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <div>
      <Addimgs />

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="gap- flex-wrap flex"
        // columnClassName="my-masonry-grid_column"
      >
        {data &&
          data.map((value) => {
            return (
              <div
                key={value.id}
                className="group ml-5 mb-5 cursor-pointer relative"
              >
                <div className="relative rounded-md">
                  <img src={value.img} alt="" className="rounded-md" />
                  {/* <button
                    onClick={(e) => {
                      handleDelete(value.id);
                    }}
                    className="absolute top-1"
                  >
                    deleted
                  </button> */}
                </div>
                <div className="opacity-0 group-hover:opacity-100 bg-black/30 inset-0 absolute rounded-md">
                  <button className="w-16 cursor-pointer h-11 rounded-2xl bg-[#ef1751] hover:bg-[#BD001C] text-white absolute right-4 top-4">
                    Save
                  </button>
                  <div className="w-9 h-9 flex items-center justify-center absolute bottom-4 right-4 bg-white rounded-xl">
                    <p className="font-bold -mt-1">...</p>
                  </div>
                  <div className="h-9 absolute flex items-center justify-center bottom-4 right-16 bg-white rounded-xl w-9">
                    <i className="fa-solid fa-download"></i>
                  </div>
                </div>
              </div>
            );
          })}
      </Masonry>
    </div>
  );
}

export default Home;
