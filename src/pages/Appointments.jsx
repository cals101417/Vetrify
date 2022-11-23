import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../auth/firebase";
import Moment from "react-moment";
import CompleteModal from "../components/Appointment/CompleteModal";

function Appointments() {
  const [open, setOpen] = useState(false);
  const [selectedApprove, setSelectedApprove] = useState(null);

  const handleOpen = (data) => {
    setOpen(true);
    setSelectedApprove(data);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedApprove(null);
  };

  const appointmentsCollectionRef = collection(db, "appointments");
  const petsCollectionRef = collection(db, "pets");
  const appointmentsQuery = query(
    appointmentsCollectionRef,
    where("status", "!=", "Deleted")
  );
  const [appointments, loadingAppoint] = useCollection(appointmentsQuery);
  const [pets, loadingPet] = useCollection(petsCollectionRef);
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

  return (
    <>
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
          <div className="content">
            <div className="table-responsive pb-10">
              <div className="block-content">
                <div id="accordion" role="tablist" aria-multiselectable="true">
                  <div className="block block-bordered block-rounded mb-2">
                    <div
                      className="block-header bg-primary text-white"
                      role="tab"
                      id="accordion_h1"
                    >
                      <a
                        className="font-w600"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#accordion_q1"
                        aria-expanded="true"
                        aria-controls="accordion_q1"
                      >
                        Pending Appointments
                      </a>
                    </div>
                    <div
                      id="accordion_q1"
                      className="collapse show"
                      role="tabpanel"
                      aria-labelledby="accordion_h1"
                      data-parent="#accordion"
                    >
                      <div className="block-content">
                        <table
                          className="table table-striped table-vcenter table-md"
                          id="appointment_table"
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Date & Time</th>
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
                              appointments.docs.map((doc) => {
                                if (doc.data().status === "Pending") {
                                  let count = 0;
                                  return (
                                    <>
                                      <tr key={doc.data().userId}>
                                        <td>{count + 1}</td>
                                        <td>{doc.data().fullname}</td>
                                        <td>
                                          {doc.data().description
                                            ? doc.data().description
                                            : "No description added"}
                                        </td>
                                        <td>
                                          <Moment format="MMM DD">
                                            {doc.data().day}
                                          </Moment>
                                          {", "}
                                          {doc.data().time}
                                        </td>
                                        <td>{doc.data().status}</td>
                                        <td>
                                          {doc.data().status == "Pending" ? (
                                            <div className="flex gap-3">
                                              <i
                                                className="cursor-pointer fa fa-check bg-green-600 text-white p-2"
                                                onClick={() =>
                                                  approveClick(doc.id)
                                                }
                                              ></i>
                                              <i
                                                className="cursor-pointer fa fa-close bg-red-600 text-white p-2"
                                                onClick={() =>
                                                  declineClick(doc.id)
                                                }
                                              ></i>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                      </tr>
                                    </>
                                  );
                                }
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="block block-bordered block-rounded mb-2">
                    <div
                      className="block-header bg-primary text-white"
                      role="tab"
                      id="accordion_h2"
                    >
                      <a
                        className="font-w600"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#accordion_q2"
                        aria-expanded="true"
                        aria-controls="accordion_q2"
                      >
                        Approved Appointments
                      </a>
                    </div>
                    <div
                      id="accordion_q2"
                      className="collapse "
                      role="tabpanel"
                      aria-labelledby="accordion_h2"
                      data-parent="#accordion"
                    >
                      <div className="block-content">
                        <table
                          className="table table-striped table-vcenter table-md"
                          id="appointment_table"
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
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
                              appointments.docs.map((doc, index) => {
                                if (doc.data().status === "Approved") {
                                  let count = 0;
                                  return (
                                    <>
                                      <tr key={doc.id}>
                                        <td>{count + 1}</td>
                                        <td>{doc.data().fullname}</td>
                                        <td>
                                          {doc.data().description
                                            ? doc.data().description
                                            : "No description added"}
                                        </td>
                                        <td>
                                          <Moment format="MMMM DD">
                                            {doc.data().day}
                                          </Moment>
                                          {doc.data().time}
                                        </td>
                                        <td>{doc.data().time}</td>
                                        <td>{doc.data().status}</td>
                                        <td>
                                          <div
                                            className="flex gap-3"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleOpen(doc.data())
                                            }
                                          >
                                            <h1 className="bg-green-600 text-white p-2 px-3">
                                              Mark as Complete
                                            </h1>
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                }
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="block block-bordered block-rounded mb-2">
                    <div
                      className="block-header bg-primary text-white"
                      role="tab"
                      id="accordion_h3"
                    >
                      <a
                        className="font-w600"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#accordion_q3"
                        aria-expanded="true"
                        aria-controls="accordion_q3"
                      >
                        Completed Appointments
                      </a>
                    </div>
                    <div
                      id="accordion_q3"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="accordion_h3"
                      data-parent="#accordion"
                    >
                      <div className="block-content">
                        <table
                          className="table table-striped table-vcenter table-md"
                          id="appointment_table"
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
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
                              appointments.docs.map((doc, index) => {
                                if (doc.data().status === "Approved") {
                                  let count = 0;
                                  return (
                                    <>
                                      <tr key={doc.id}>
                                        <td>{count + 1}</td>
                                        <td>{doc.data().fullname}</td>
                                        <td>
                                          {doc.data().description
                                            ? doc.data().description
                                            : "No description added"}
                                        </td>
                                        <td>
                                          <Moment format="MMMM DD">
                                            {doc.data().day}
                                          </Moment>
                                          {doc.data().time}
                                        </td>
                                        <td>{doc.data().time}</td>
                                        <td>{doc.data().status}</td>
                                        <td>
                                          <div className="flex gap-3">
                                            <h1 className="bg-green-600 text-white p-2 px-3">
                                              Mark as Complete
                                            </h1>
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                }
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {open && (
        <CompleteModal
          open={open}
          close={handleClose}
          data={selectedApprove}
          pets_data={pets}
        />
      )}
    </>
  );
}

export default Appointments;
