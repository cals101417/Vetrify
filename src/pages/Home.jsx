import { async } from "@firebase/util";
import React from "react";
import { useAuth } from "../auth/context/UserAuthContext";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Pawlogo from "../assets/img/paw.png";
function Home() {
  const { user } = useAuth();

  return (
    <div
      id="page-container"
      className="sidebar-o enable-page-overlay side-scroll page page-header-inverse header glass"
    >
      <Sidebar />
      <Header />
      <main id="main-container">
        <div className="content">
          <div className="content-header">
            <h1>Overview</h1>
          </div>
          <div class="block-content block-content-full block-content-sm bg-body-light">
            <div class="row gutters-tiny">
              <div class="col-md-6 col-xl-3">
                <a class="block block-link-shadow" href="javascript:void(0)">
                  <div class="block-content block-content-full">
                    <div class="font-size-h2 font-w700">64</div>
                    <div class="font-size-sm font-w600 text-uppercase text-muted">
                      Total Users
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-md-6 col-xl-3">
                <a class="block block-link-shadow" href="javascript:void(0)">
                  <div class="block-content block-content-full">
                    <div class="font-size-h2 font-w700">60</div>
                    <div class="font-size-sm font-w600 text-uppercase text-muted">
                      Total Appointments
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-md-6 col-xl-3">
                <a class="block block-link-shadow" href="javascript:void(0)">
                  <div class="block-content block-content-full text-right">
                    <div class="font-size-h2 font-w700">15</div>
                    <div class="font-size-sm font-w600 text-uppercase text-muted">
                      Total Added Pets
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-md-6 col-xl-3">
                <a class="block block-link-shadow" href="javascript:void(0)">
                  <div class="block-content block-content-full text-right">
                    <div class="font-size-h2 font-w700">5</div>
                    <div class="font-size-sm font-w600 text-uppercase text-muted">
                      Finished Appointments
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div class="row gutters-tiny pt-20">
              <div class="col-md-6 col-xl-8">
                <a class="block block-link-shadow">
                  <div class="block-content block-content-full">
                    <div className="table-responsive px-20 py-20 h-96">
                      <table className="table table-striped table-vcenter table-sm">
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td>
                              {" "}
                              <img
                                src={Pawlogo}
                                className="h-8 rounded-3xl bg-blue-600"
                              />
                            </td>
                            <td> Kenneth Ryan Dy</td>
                            <td> Sets a New Appointment</td>
                            <td> October 15, 2022</td>
                          </tr>
                          <tr>
                            <td>
                              {" "}
                              <img
                                src={Pawlogo}
                                className="h-8 rounded-3xl bg-blue-600"
                              />
                            </td>
                            <td> Alden Ramirez</td>
                            <td> Finished an appointment</td>
                            <td> October 25, 2022</td>
                          </tr>
                          <tr>
                            <td>
                              {" "}
                              <img
                                src={Pawlogo}
                                className="h-8 rounded-3xl bg-blue-600"
                              />
                            </td>
                            <td> test</td>
                            <td> test</td>
                            <td> test</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-md-6 col-xl-4">
                <a class="block block-link-shadow">
                  <div class="block-content block-content-full">
                    <div className="table-responsive px-20 py-20 h-96">
                      <table className="table table-vcenter table-sm">
                        <thead>
                          <tr>
                            <th>Pending Appointments</th>
                            <th>
                              <i
                                className="fa fa-clock-o d-sm none"
                                aria-hidden="true"
                              ></i>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-10">
                              <h1>Kenneth Ryan dy</h1>
                            </td>
                            <td className="py-10">
                              {" "}
                              <img
                                src={Pawlogo}
                                className="h-8 rounded-3xl bg-blue-600"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <h1
                onClick={handleLogout}
              >
                Logout
              </h1> */}
    </div>
  );
}

export default Home;
