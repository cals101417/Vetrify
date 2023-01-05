import React from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Pawlogo from "../assets/img/paw.png";
import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../auth/firebase";
import moment from "moment";
const History = () => {
  const appointmentsCollectionRef = collection(db, "appointments");
  const appointQuery = query(appointmentsCollectionRef);
  const [appointData, loadingAppointments] = useCollection(appointQuery);
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
            <div className="content-header d-flex justify-content-between">
              <h1 className="font-bold">History of Appointments</h1>
            </div>
            <div className="block-content block-content-full block-content-sm bg-white">
              <div className="col-md-6 col-xl-12">
                <div className="block-content block-content-full">
                  <div className="table-responsive" style={{ height: "650px" }}>
                    <table className="table table-striped table-vcenter table-md">
                      <thead>
                        <tr>
                          <th>
                            <li
                              className="fa fa-user ml-2"
                              style={{ fontSize: 20 }}
                            ></li>
                          </th>
                          <th>Name</th>
                          <th>Purpose</th>
                          <th>Date of Appointment</th>
                          <th className="text-center">Status</th>
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
                            <td>{list.data().fullname} </td>
                            <td>{list.data().purpose}</td>
                            <td>
                              {moment(list.data().day).format("MMMM D YYYY")}
                            </td>
                            <td>
                              {" "}
                              {list.data().status == "Approved" ? (
                                <h1 className="bg-primary text-center p-1 text-white rounded-xl">
                                  {list.data().status}
                                </h1>
                              ) : list.data().status == "Completed" ? (
                                <h1 className="bg-success text-center p-1 text-white rounded-xl">
                                  {list.data().status}
                                </h1>
                              ) : list.data().status == "Cancelled" ? (
                                <h1 className="bg-danger text-center p-1 text-white rounded-xl">
                                  {list.data().status}
                                </h1>
                              ) : list.data().status == "Pending" ? (
                                <h1 className="bg-dark text-center p-1 text-white rounded-xl">
                                  {list.data().status}
                                </h1>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default History;
