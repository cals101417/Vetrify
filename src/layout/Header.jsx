import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/context/UserAuthContext";
function Header() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header id="page-header" style={{ backgroundColor: "#061420" }}>
      <div className="content-header">
        <div className="content-header-section"></div>

        <div className="content-header-section">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-rounded btn-dual-secondary"
              id="page-header-user-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-user d-sm none" aria-hidden="true"></i>
              <span className="d-none d-sm-inline-block"></span>
              <i className="fa fa-angle-down ml-5"></i>
            </button>
            <div
              className="dropdown-menu dropdown-menu-right min-width-200"
              aria-labelledby="page-header-user-dropdown"
            >
              <h5 className="h6 text-center py-10 mb-5 border-b text-uppercase">
                {user.firstname} {user.lastname}
              </h5>
              {/* <a className="dropdown-item" href="profile.php">
                                <i className="si si-user mr-5"></i> Profile
                            </a> */}
              <NavLink to="/Home" className="dropdown-item cursor-pointer">
                <i className="fa fa-dashboard mr-5"></i>
                Dashboard
              </NavLink>
              <NavLink to="/Users" className="dropdown-item cursor-pointer">
                <i className="si si-puzzle mr-5"></i>
                Users
              </NavLink>
              <NavLink
                to="/Appointments"
                className="dropdown-item cursor-pointer"
              >
                <i className="si si-calendar mr-5"></i>
                Appointments
              </NavLink>
              <NavLink to="/History" className="dropdown-item cursor-pointer">
                <i className="fa fa-history mr-5"></i>
                History
              </NavLink>
              <NavLink to="/About" className="dropdown-item cursor-pointer">
                <i className="fa fa-info-circle mr-5"></i>
                About
              </NavLink>
              <a
                className="dropdown-item cursor-pointer"
                onClick={handleLogout}
              >
                <i className="si si-logout mr-5"></i> Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="page-header-search" className="overlay-header">
        <div className="content-header content-header-fullrow">
          <form action="be_pages_generic_search.html" method="post">
            <div className="input-group">
              <div className="input-group-prepend">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-toggle="layout"
                  data-action="header_search_off"
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search or hit ESC.."
                id="page-header-search-input"
                name="page-header-search-input"
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div id="page-header-loader" className="overlay-header bg-primary">
        <div className="content-header content-header-fullrow text-center">
          <div className="content-header-item">
            <i className="fa fa-sun-o fa-spin text-white"></i>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
