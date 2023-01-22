import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import noUserImg from "../assets/img/user.png";
import { useAuth } from "../auth/context/UserAuthContext";
import Sideitem from "./Sideitem";

const sidebarItems = [
  {
    text: "Appointments",
    icon: "si si-calendar",
    children: [
      {
        href: "/PendingAppointments",
        text: "Pending",
        icon: "fa fa-cogs",
      },
      {
        href: "/ApproveAppointments",
        text: "Approved",
        icon: "fa fa-cogs",
      },
      {
        href: "/CompletedAppointments",
        text: "Completed",
        icon: "fa fa-cogs",
      },
    ],
  },
];

function Sidebar() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav id="sidebar">
      <div className="sidebar-content">
        <div className="content-header content-header-fullrow px-15 pt-1">
          <div className="content-header-section sidebar-mini-visible-b">
            <span className="content-header-item font-w700 font-size-xl float-left animated fadeIn">
              <span className="text-dual-primary-dark">c</span>
              <span className="text-primary">b</span>
            </span>
          </div>

          <div className="content-header-section text-center align-parent sidebar-mini-hidden">
            <button
              type="button"
              className="btn btn-circle btn-dual-secondary d-lg-none align-v-r"
              data-toggle="layout"
              data-action="sidebar_close"
            >
              <i className="fa fa-times text-danger"></i>
            </button>
            <div className="aside-header">
              <img className="aside-logo h-14 mx-auto" src={logo} />

              <a href="" className="aside-menu-link">
                <i data-feather="menu"></i>
                <i data-feather="x"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="content-side content-side-full content-side-user px-10 align-parent bg-image bg-image-middle bg-gradient-to-r from-cyan-900 to-blue-500">
          <div className="sidebar-mini-visible-b align-v animated fadeIn">
            <img
              className="img-avatar img-avatar32"
              src={user.photoURL || noUserImg}
              alt=""
            />
          </div>
          <div className="sidebar-mini-hidden-b text-center">
            <a className="img-link">
              <img className="img-avatar" src={user.photoURL || noUserImg} />
            </a>
            <ul className="list-inline mt-10">
              <li className="list-inline-item">
                <a className="link-effect text-white font-size-xs font-w600 text-uppercase">
                  {user.firstname}
                </a>
              </li>
              <li className="list-inline-item">
                <a className="link-effect text-white">
                  <i
                    className="si si-logout cursor-pointer"
                    onClick={handleLogout}
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="content-side content-side-full">
          <ul className="nav-main">
            <br></br>
            <li>
              <Link to="/Home" activeclassname="selected">
                <i className="fa fa-dashboard mt-0.5"></i>
                <span className="sidebar-mini-hide">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/Users">
                <i className="si si-puzzle mt-0.5"></i>
                <span className="sidebar-mini-hide">Users</span>
              </Link>
            </li>
            <li>
              <Link to="/PetsRecord">
                <i className="fa fa-paw mt-0.5"></i>
                <span className="sidebar-mini-hide">Pets</span>
              </Link>
            </li>
            {sidebarItems.map((items, index) => {
              return <Sideitem key={index} items={items} />;
            })}
            <li>
              <Link to="/Records">
                <i className="fa fa-file mt-0.5"></i>
                <span className="sidebar-mini-hide">Records</span>
              </Link>
            </li>
            <li>
              <Link to="/History">
                <i className="fa fa-history mt-0.5"></i>
                <span className="sidebar-mini-hide">History</span>
              </Link>
            </li>
            <li>
              <Link to="/About">
                <i className="fa fa-info-circle mt-0.5"></i>
                <span className="sidebar-mini-hide">About</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
