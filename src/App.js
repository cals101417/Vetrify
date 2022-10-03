import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
                  <a href="dashboard.php" className="aside-logo">
                    {/* <img
                      className="img pd-l-30"
                      src="assets/media/favicons/Fiafi logo.png"
                      style="height: 60px; !important"
                    /> */}
                  </a>
                  <a href="" className="aside-menu-link">
                    <i data-feather="menu"></i>
                    <i data-feather="x"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="content-side content-side-full content-side-user px-10 align-parent bg-gd-dusk">
              <div className="sidebar-mini-visible-b align-v animated fadeIn">
                {/* <img
                  className="img-avatar img-avatar32"
                  src="<?=$img_src?>"
                  alt=""
                /> */}
              </div>

              <div className="sidebar-mini-hidden-b text-center">
                <a className="img-link" href="profile.php">
                  <img className="img-avatar" src="<?=$img_src?>" alt="" />
                </a>
                <ul className="list-inline mt-10">
                  <li className="list-inline-item">
                    <a
                      className="link-effect text-dual-primary-dark font-size-xs font-w600 text-uppercase"
                      href="profile.php"
                    ></a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="link-effect text-dual-primary-dark"
                      href="logout.php"
                    >
                      <i className="si si-logout"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="content-side content-side-full">
              <ul className="nav-main">
                <li>
                  <a href="dashboard.php">
                    <i className="fa fa-dashboard"></i>
                    <span className="sidebar-mini-hide">Dashboard</span>
                  </a>
                </li>
                <li id="employee_sidebar">
                  <a className="nav-submenu" data-toggle="nav-submenu" href="#">
                    <i className="si si-puzzle"></i>
                    <span className="sidebar-mini-hide">Employee</span>
                  </a>
                  <ul>
                    <li>
                      <a href="employees.php">
                        <span className="sidebar-mini-hide">All Employees</span>
                      </a>
                    </li>
                    <li>
                      <a href="position.php">Manage Positions</a>
                    </li>
                    <li>
                      <a href="department.php">Manage Departments</a>
                    </li>
                    <li>
                      <a href="company.php">Companies</a>
                    </li>
                  </ul>
                </li>
                <li id="first_aid_sidebar">
                  <a className="nav-submenu" data-toggle="nav-submenu" href="#">
                    <i className="si si-puzzle"></i>
                    <span className="sidebar-mini-hide">Incident</span>
                  </a>
                  <ul>
                    <li>
                      <a href="first_aid.php">
                        <span className="sidebar-mini-hide">First Aid</span>
                      </a>
                    </li>
                    <li>
                      <a href="investigation.php">Investigation</a>
                    </li>
                    <li>
                      <a href="incident_report.php">Incident Report</a>
                    </li>
                  </ul>
                </li>
                <li className="" id="training_sidebar">
                  <a className="nav-submenu" data-toggle="nav-submenu" href="#">
                    <i className="si si-puzzle"></i>
                    <span className="sidebar-mini-hide">Training</span>
                  </a>
                  <ul>
                    <li>
                      <a href="training_induction.php">Induction</a>
                    </li>
                    <li>
                      <a href="training_in_house.php">In-house</a>
                    </li>
                    <li>
                      <a href="training_client.php">Client</a>
                    </li>

                    <li>
                      <a href="training_third_party.php">Third Party</a>
                    </li>

                    <li>
                      <a href="training_metrics.php">Training Metrics</a>
                    </li>
                  </ul>
                </li>
                <li className="" id="toolbox_sidebar">
                  <a className="nav-submenu" data-toggle="nav-submenu" href="#">
                    <i className="si si-puzzle"></i>
                    <span className="sidebar-mini-hide">Toolbox Talks</span>
                  </a>
                  <ul>
                    <li>
                      <a href="toolbox_talks.php?type=1">Civil</a>
                    </li>
                    <li>
                      <a href="toolbox_talks.php?type=2">Electrical</a>
                    </li>
                    <li>
                      <a href="toolbox_talks.php?type=3">Mechanical</a>
                    </li>
                    <li>
                      <a href="toolbox_talks.php?type=4">Camp</a>
                    </li>
                    <li>
                      <a href="toolbox_talks.php?type=5">Office</a>
                    </li>
                    <li>
                      <a href="toolbox_talks_reports.php">Man Hour Reports</a>
                    </li>
                    <li>
                      <a href="toolbox_talks_reports2.php">Man Day Reports </a>
                    </li>
                  </ul>
                </li>

                <li id="inventory_sidebar">
                  <a className="nav-submenu" data-toggle="nav-submenu" href="#">
                    <i className="si si-list"></i>
                    <span className="sidebar-mini-hide"> Inventory</span>
                  </a>
                  <ul>
                    <li>
                      <a href="inventory_masterlist.php">All items</a>
                    </li>
                    <li>
                      <a href="inventory_stocks.php">Manage Stocks</a>
                    </li>
                    <li>
                      <a href="inventory_report.php">Report</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;
