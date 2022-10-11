import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import headimg from "../assets/img/bg1.jpg";
import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../auth/firebase";

function Appointments() {
  const appointmentsCollectionRef = collection(db, "appointments");
  const appointmentsQuery = query(
    appointmentsCollectionRef,
    where("status", "!=", "Deleted")
  );
  const [appointments, loadingAppoint] = useCollection(appointmentsQuery);
  $(document).ready(function () {
    $("#appointment_table").DataTable();
  });
  // approved appointment
  const approveClick = async (id) => {
    const updateAppointmentRef = doc(db, "appointments", id);
    if (window.confirm("Are you sure to Approve this appointment?")) {
      await updateDoc(updateAppointmentRef, {
        status: "Approved",
      });
      window.location.reload();
    }
  };

  // decline appointment
  const declineClick = async (id) => {
    const cancelAppointmentRef = doc(db, "appointments", id);
    if (window.confirm("Are you sure to Cancel this appointment?")) {
      await updateDoc(cancelAppointmentRef, {
        status: "Cancelled",
      });
      window.location.reload();
    }
  };

  // delete appointment
  const deleteClick = async (id) => {
    const cancelAppointmentRef = doc(db, "appointments", id);
    if (window.confirm("Are you sure to Cancel this appointment?")) {
      await updateDoc(cancelAppointmentRef, {
        status: "Deleted",
      });
      window.location.reload();
    }
  };
  console.log(appointments);
  return (
    <div
      id="page-container"
      className="sidebar-o enable-page-overlay side-scroll page page-header-inverse header glass"
    >
      <Sidebar />
      <Header />
      <main id="main-container">
        <div className="bg-dark">
          <div className="bg-image bg-image-middle bg-gradient-to-r from-cyan-900 to-blue-500">
            <div className="content content-top text-center ">
              <div className="py-30">
                <h1 className="font-w700 text-3xl text-white mb-10">
                  Appointments
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="content-heading px-30">
          <h1>List of Appointments</h1>
        </div>
        <div className="content">
          <div className="table-responsive pb-20 h-96">
            <table
              className="table table-striped table-vcenter table-md"
              id="appointment_table"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loadingAppoint ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      loading...
                    </td>
                  </tr>
                ) : (
                  appointments.docs.map((doc, index) => (
                    <tr key={doc.id}>
                      <td>{index + 1}</td>
                      <td>{doc.data().fullname}</td>
                      <td>
                        {doc.data().description
                          ? doc.data().description
                          : "No description added"}
                      </td>
                      <td>{doc.data().day}</td>
                      <td>{doc.data().time}</td>
                      <td>{doc.data().status}</td>
                      <td>
                        {doc.data().status == "Pending" ? (
                          <div className="flex gap-3">
                            <i
                              className="cursor-pointer fa fa-check bg-green-600 text-white p-2"
                              onClick={() => approveClick(doc.id)}
                            ></i>
                            <i
                              className="cursor-pointer fa fa-close bg-red-600 text-white p-2"
                              onClick={() => declineClick(doc.id)}
                            ></i>
                            <i
                              className="cursor-pointer fa fa-trash bg-red-800 text-white p-2"
                              onClick={() => deleteClick(doc.id)}
                            ></i>
                          </div>
                        ) : (
                          ""
                        )}
                        {doc.data().status == "Approved" ? (
                          <div className="flex gap-3">
                            <i
                              className="cursor-pointer fa fa-close bg-red-600 text-white p-2"
                              onClick={() => declineClick(doc.id)}
                            ></i>
                            <i
                              className="cursor-pointer fa fa-trash bg-red-800 text-white p-2"
                              onClick={() => deleteClick(doc.id)}
                            ></i>
                          </div>
                        ) : (
                          ""
                        )}
                        {doc.data().status == "Cancelled" ? (
                          <div className="flex gap-3">
                            <i
                              className="cursor-pointer fa fa-trash bg-red-800 text-white p-2"
                              onClick={() => deleteClick(doc.id)}
                            ></i>
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Appointments;
