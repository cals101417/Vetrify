import { isHostComponent } from "@mui/base";
import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sideitem = ({ items }) => {
  const { name, links, open } = items;
  const [navOpen, setNavOpen] = useState(open);

  const openSideNav = () => {
    setNavOpen(!navOpen);
  };
  return (
    <div onClick={() => openSideNav()}>
      <a data-toggle="nav-submenu" href="#">
        <i className={items.icon}></i>
        <span className="sidebar-mini-hide">{items.text}</span>
        <span style={{ float: "right" }}>
          <i
            className="fa fa-angle-left"
            style={!navOpen ? {} : { transform: " rotate(-90deg)" }}
          ></i>
        </span>
      </a>
      {navOpen &&
        items.children.map((link, index) => {
          return (
            <>
              <li
                className="{{ request()->is('examples/*') ? ' open' : '' }} bg-light"
                key={index}
                style={{ paddingLeft: "12px" }}
              >
                <Link to={link.href}>
                  <i style={{ color: "#fc1414" }}></i>
                  <span className="sidebar-mini-hide">{link.text}</span>
                </Link>
              </li>
            </>
          );
        })}
    </div>
  );
};

export default Sideitem;
