import React from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

const About = () => {
  return (
    <>
      <div
        id="page-container"
        className="sidebar-o enable-page-overlay side-scroll page page-header-inverse header glass"
      >
        <Sidebar />
        <Header />
        <main id="main-container">
          <div className="content">
            <div className="content-header">
              <h1>About us</h1>
            </div>
            <div className="block-content block-content-full block-content-sm bg-white"></div>
          </div>
        </main>
      </div>
    </>
  );
};

export default About;
