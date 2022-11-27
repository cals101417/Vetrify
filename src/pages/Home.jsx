import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Pawlogo from "../assets/img/paw.png";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../auth/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
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
    navigate("/Appointments");
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
          <div className="content-header">
            <h1>Overview</h1>
          </div>
          <div className="block-content block-content-full block-content-sm bg-body-light">
            <div className="row gutters-tiny">
              <div className="col-md-6 col-xl-3">
                <a className="block block-link-shadow">
                  <div className="block-content block-content-full">
                    <div className="font-size-h2 font-w700">
                      {users?.docs.length}
                    </div>
                    <div className="font-size-sm font-w600 text-uppercase text-muted">
                      Total Users
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-xl-3">
                <a className="block block-link-shadow">
                  <div className="block-content block-content-full">
                    <div className="font-size-h2 font-w700">
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
                  <div className="block-content block-content-full text-right">
                    <div className="font-size-h2 font-w700">
                      {petsData?.docs.length}
                    </div>
                    <div className="font-size-sm font-w600 text-uppercase text-muted">
                      Total Added Pets
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-xl-3">
                <a className="block block-link-shadow">
                  <div className="block-content block-content-full text-right">
                    <div className="font-size-h2 font-w700">
                      {finishData?.docs.length}
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
                <a className="block block-link-shadow">
                  <div
                    className="block-content block-content-full"
                    onClick={navigateAppointments}
                  >
                    <div
                      className="table-responsive px-20"
                      style={{ height: "550px", paddingTop: "10px" }}
                    >
                      <table className="table table-striped table-vcenter table-md">
                        <thead>
                          <tr>
                            <th>Appointments Log</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointData?.docs.map((list) => (
                            <tr>
                              <td>
                                {" "}
                                <img
                                  src={
                                    list.data().photoURL
                                      ? list.data().photoURL
                                      : Pawlogo
                                  }
                                  className="h-8 w-8 rounded-3xl bg-blue-600"
                                />
                              </td>
                              <td> {list.data().fullname} </td>
                              <td>
                                {list.data().status == "Approved"
                                  ? "Appointment has been approved"
                                  : list.data().status == "Completed"
                                  ? "Finish an appointment"
                                  : list.data().status == "Cancelled"
                                  ? "Appointment has been cancelled"
                                  : list.data().status == "Pending"
                                  ? "Book a appointment"
                                  : ""}
                              </td>
                              <td> October 25, 2022</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-md-6 col-xl-4">
                <a className="block block-link-shadow">
                  <div
                    className="block-content block-content-full cursor-pointer"
                    onClick={navigateAppointments}
                  >
                    <div
                      className="table-responsive px-20 py-20"
                      style={{ height: "550px" }}
                    >
                      <table className="table table-vcenter table-sm">
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
                                  <td className="py-10">
                                    <h1>{list.data().fullname}</h1>
                                  </td>
                                  <td className="py-10">
                                    {" "}
                                    <img
                                      src={
                                        list.data().photoURL
                                          ? list.data().photoURL
                                          : Pawlogo
                                      }
                                      className="h-8 w-8 rounded-3xl bg-blue-600"
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          })}
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
