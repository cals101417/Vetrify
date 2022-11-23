import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import headimg from "../assets/img/bg1.jpg";
import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../auth/firebase";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Moment from "react-moment";
import CompleteModal from "../components/Appointment/CompleteModal";

const headCells = [
  {
    id: "idx",
    label: "#",
  },
  {
    id: "fullname",
    label: "Full Name",
    sortable: false,
    align: "center",
  },
  {
    id: "description",
    label: "Description",
    sortable: true,
  },
  {
    id: "date",
    label: "Action",
    sortable: false,
    align: "right",
  },
  {
    id: "time",
    label: "Time",
    sortable: false,
    align: "right",
  },
  {
    id: "status",
    label: "Action",
    sortable: false,
    align: "right",
  },
];

function Appointments() {
  const appointmentsCollectionRef = collection(db, "appointments");
  const appointmentsQuery = query(
    appointmentsCollectionRef,
    where("status", "!=", "Deleted")
  );
  const [appointments, loadingAppoint] = useCollection(appointmentsQuery);
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
  const CompleteAppoint = async (id) => {
    <CompleteModal id={id}></CompleteModal>;
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
        <div className="content">
          <div className="table-responsive pb-10">
            <div class="block-content">
              <div id="accordion" role="tablist" aria-multiselectable="true">
                <div class="block block-bordered block-rounded mb-2">
                  <div
                    class="block-header bg-primary text-white"
                    role="tab"
                    id="accordion_h1"
                  >
                    <a
                      class="font-w600"
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
                    class="collapse show"
                    role="tabpanel"
                    aria-labelledby="accordion_h1"
                    data-parent="#accordion"
                  >
                    <div class="block-content">
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
                              if (doc.data().status === "Pending") {
                                return (
                                  <>
                                    <tr key={doc.id}>
                                      <td>{index + 1}</td>
                                      <td>{doc.data().fullname}</td>
                                      <td>
                                        {doc.data().description
                                          ? doc.data().description
                                          : "No description added"}
                                      </td>
                                      <td>
                                        <Moment format="MMMM DD">
                                          {doc.data().day}
                                        </Moment>{" "}
                                        {doc.data().time}
                                      </td>
                                      <td>{doc.data().time}</td>
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
                <div class="block block-bordered block-rounded mb-2">
                  <div
                    class="block-header bg-primary text-white"
                    role="tab"
                    id="accordion_h2"
                  >
                    <a
                      class="font-w600"
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
                    class="collapse "
                    role="tabpanel"
                    aria-labelledby="accordion_h2"
                    data-parent="#accordion"
                  >
                    <div class="block-content">
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
                                return (
                                  <>
                                    <tr key={doc.id}>
                                      <td>{index + 1}</td>
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
                                          data-toggle="modal"
                                          data-target="#modal-normal"
                                          style={{ cursor: "pointer" }}
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
                <div class="block block-bordered block-rounded mb-2">
                  <div
                    class="block-header bg-primary text-white"
                    role="tab"
                    id="accordion_h3"
                  >
                    <a
                      class="font-w600"
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
                    class="collapse"
                    role="tabpanel"
                    aria-labelledby="accordion_h3"
                    data-parent="#accordion"
                  >
                    <div class="block-content">
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
                                return (
                                  <>
                                    <tr key={doc.id}>
                                      <td>{index + 1}</td>
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
        <div
          class="modal"
          id="modal-normal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modal-normal"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="block block-themed block-transparent mb-0">
                <div class="block-header bg-primary-dark">
                  <h3 class="block-title">Feedback</h3>
                  <div class="block-options">
                    <button
                      type="button"
                      class="btn-block-option"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <i class="si si-close"></i>
                    </button>
                  </div>
                </div>
                <div class="block-content">
                  <form
                    action="be_forms_elements_bootstrap.html"
                    method="post"
                    enctype="multipart/form-data"
                    onsubmit="return false;"
                  >
                    <div class="form-group row">
                      <label class="col-12" for="example-text-input">
                        Symptoms
                      </label>
                      <div class="col-md-12">
                        <select
                          class="form-control"
                          id="example-select"
                          name="example-select"
                          placeholder="Choose one"
                        >
                          <option style={{ display: "none" }}></option>
                          <option value="1">Vomiting</option>
                          <option value="2">Defecation</option>
                          <option value="3">Urination</option>
                          <option value="1">Coughing</option>
                          <option value="2">Sneezing</option>
                          <option value="3">Skin lesions</option>
                          <option value="1">Dehydration</option>
                          <option value="2">Fever</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12" for="example-textarea-input">
                        Physical Examinations
                      </label>
                      <div class="col-12">
                        <textarea
                          class="form-control"
                          id="example-textarea-input"
                          name="example-textarea-input"
                          rows="6"
                          placeholder="Content.."
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12" for="example-textarea-input">
                        Diagnosis
                      </label>
                      <div class="col-12">
                        <textarea
                          class="form-control"
                          id="example-textarea-input"
                          name="example-textarea-input"
                          rows="6"
                          placeholder="Content.."
                        ></textarea>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center pb-10">
                      <button class="btn btn-primary">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Appointments;
