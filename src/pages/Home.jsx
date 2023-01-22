import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Pawlogo from "../assets/img/paw.png";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../auth/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { NavLink, useNavigate } from "react-router-dom";
function Home() {
  const [totalUser, setTotalUser] = useState([]);
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");
  const userQuery = query(usersCollectionRef, where("role", "!=", "admin"));
  const [users, loading] = useCollection(userQuery);

  const appointmentsCollectionRef = collection(db, "appointments");
  const appointQuery = query(
    appointmentsCollectionRef,
    where("status", "!=", "Cancelled")
  );
  const [appointData, loadingAppointments] = useCollection(appointQuery);

  const petsCollectionRef = collection(db, "pets");
  const petsQuery = query(petsCollectionRef);
  const [petsData, loadingPets] = useCollection(petsQuery);

  const finishCollectionRef = collection(db, "appointments");
  const finishQuery = query(
    finishCollectionRef,
    where("status", "==", "Completed")
  );
  const [finishData, loadingfinish] = useCollection(finishQuery);

  const navigateAppointments = () => {
    navigate("/Appointments/pendings");
  };
  return (
    <div
      id="page-container"
      className="sidebar-o enable-page-overlay side-scroll page page-header-inverse header glass"
    >
      <Sidebar />
      <Header />
      <main id="main-container">
        <div className="content">
          <div className="block-content block-content-full bg-body-light">
            <div className="row gutters-tiny">
              <div className="col-md-6 col-xl-3 ">
                <a className="block block-link-shadow">
                  <div className="block-content block-content-full text-lg-left text-center">
                    <div className="font-size-h2 font-w700">
                      <li
                        className="fa fa-user mr-2"
                        style={{ color: "#1c51c2" }}
                      ></li>
                      {users?.docs.length}
                    </div>
                    <div className="font-size-sm font-w600  text-uppercase text-muted">
                      Total Users
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-xl-3">
                <a className="block block-link-shadow">
                  <div className="block-content block-content-full text-lg-left text-center">
                    <div className="font-size-h2 font-w700">
                      <li
                        className="fa fa-calendar mr-2"
                        style={{ color: "red" }}
                      ></li>
                      {appointData?.docs.length}
                    </div>
                    <div className="font-size-sm font-w600 text-uppercase text-muted">
                      Total Appointments
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-xl-3">
                <a className="block block-link-shadow">
                  <div className="block-content block-content-full text-lg-right text-center">
                    <div className="font-size-h2 font-w700">
                      {petsData?.docs.length}{" "}
                      <li
                        className="fa fa-paw mr-2"
                        style={{ color: "#cccc00" }}
                      ></li>
                    </div>
                    <div className="font-size-sm font-w600 text-uppercase text-muted">
                      Total Added Pets
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-xl-3">
                <a className="block block-link-shadow">
                  <div className="block-content block-content-full text-lg-right text-center">
                    <div className="font-size-h2 font-w700">
                      {finishData?.docs.length}{" "}
                      <li
                        className="fa fa-calendar-check-o mr-2"
                        style={{ color: "green" }}
                      ></li>
                    </div>
                    <div className="font-size-sm font-w600 text-uppercase text-muted">
                      Finished Appointments
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="row gutters-tiny pt-20">
              <div className="col-md-6 col-xl-8 cursor-pointer">
                <NavLink
                  to="/PendingAppointments"
                  className="block block-link-shadow"
                >
                  <div className="block-content block-content-full">
                    <div
                      className="table-responsive px-20"
                      style={{ height: "650px", paddingTop: "10px" }}
                    >
                      <table className="table table-striped table-vcenter table-lg">
                        <thead>
                          <tr>
                            <th>Appointments Log</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointData?.docs.map((list) => (
                            <tr>
                              <td className="d-flex justify-content-start">
                                {" "}
                                <img
                                  src={
                                    list.data().photoURL
                                      ? list.data().photoURL
                                      : Pawlogo
                                  }
                                  className="h-8 w-8 rounded-3xl bg-blue-600 mr-2"
                                />{" "}
                                {list.data().fullname}{" "}
                              </td>
                              <td className="text-center">
                                {list.data().status == "Approved" ? (
                                  <h1 className="bg-primary text-center p-1 text-white rounded-xl">
                                    Approved
                                  </h1>
                                ) : list.data().status == "Completed" ? (
                                  <h1 className="bg-success text-center p-1 text-white rounded-xl">
                                    Completed
                                  </h1>
                                ) : list.data().status == "Cancelled" ? (
                                  <h1 className="bg-danger text-center p-1 text-white rounded-xl">
                                    Cancelled
                                  </h1>
                                ) : list.data().status == "Pending" ? (
                                  <h1 className="bg-dark text-center p-1 text-white rounded-xl">
                                    Pending
                                  </h1>
                                ) : (
                                  ""
                                )}
                              </td>
                              <td className="text-right"> October 25, 2022</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="col-md-6 col-xl-4">
                <NavLink
                  to="/PendingAppointments"
                  className="block block-link-shadow"
                >
                  <div
                    className="block-content block-content-full cursor-pointer"
                    onClick={navigateAppointments}
                  >
                    <div
                      className="table-responsive px-20 py-20"
                      style={{ height: "650px" }}
                    >
                      <table className="table table-vcenter table-lg">
                        <thead>
                          <tr>
                            <th>Pending Appointments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointData?.docs.map((list) => {
                            if (list.data().status === "Pending") {
                              return (
                                <tr>
                                  <td className="d-flex justify-content-start py-10">
                                    {" "}
                                    <img
                                      src={
                                        list.data().photoURL
                                          ? list.data().photoURL
                                          : Pawlogo
                                      }
                                      className="h-8 w-8 rounded-3xl bg-blue-600 mr-3"
                                    />{" "}
                                    {list.data().fullname}
                                  </td>
                                  <td className="py-10">
                                    {" "}
                                    <li className="fa fa-arrow-right bg-success text-white p-2"></li>
                                  </td>
                                </tr>
                              );
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </NavLink>
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
