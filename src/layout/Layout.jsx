import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout({ children }) {
  return (
    <div className="container mx-auto w-[1300px]">
      <div>{<Header />}</div>
      <div>{children}</div>
      <div>{<Footer />}</div>
    </div>
  );
}

export default Layout;
