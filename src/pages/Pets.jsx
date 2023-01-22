import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { db } from "../auth/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import PropTypes from "prop-types";
import { useCollection } from "react-firebase-hooks/firestore";
import CompleteVaccineModal from "../components/Appointment/EditVaccineModal";
import EditVaccineModal from "../components/Appointment/EditVaccineModal";
import EditSurgeryModal from "../components/Appointment/EditSurgeryModal";
import EditGroomModal from "../components/Appointment/EditGroomModal";
import { Box } from "@mui/system";
import { Tab, Tabs, Typography } from "@mui/material";
import UserAddVaccineModal from "../components/Appointment/UserAddVaccineModal";
import UserAddMedicalModal from "../components/Appointment/UserAddMedicalModal";
import UserAddGroom from "../components/Appointment/UserAddGroom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Pets = () => {
  const [petData, setPetData] = useState({});
  const { petID } = useParams();
  const [openVaccine, setOpenVaccine] = useState(false);
  const [addVaccine, setAddVaccine] = useState(false);
  const [addMedical, setAddMedical] = useState(false);
  const [addGroom, setAddGroom] = useState(false);
  const [openSurgery, setOpenSurgery] = useState(false);
  const [openGroomed, setOpenGroomed] = useState(false);
  const [addVaccineData, setAddVaccineData] = useState([]);
  const [addMedicalData, setAddMedicalData] = useState([]);
  const [addGroomData, setAddGroomData] = useState([]);
  const [editGroomData, setEditGroomData] = useState([]);
  const [editSurgeryData, setEditSurgeryData] = useState([]);
  const [editVaccineData, setEditVaccineData] = useState([]);
  const vaccineRef = collection(db, "vaccine_records");
  const groomRef = collection(db, "groom_records");
  const medicalRef = collection(db, "medical_records");
  const vaccineQuery = query(
    vaccineRef,
    where("petId", "==", petID),
    orderBy("createdAt", "desc")
  );
  const groomQuery = query(
    groomRef,
    where("petId", "==", petID),
    orderBy("createdAt", "desc")
  );
  const medicalQuery = query(
    medicalRef,
    where("petId", "==", petID),
    orderBy("createdAt", "desc")
  );
  const [petVaccine, loadingVaccine, error] = useCollection(vaccineQuery);
  const [petGroom, loadingGroom, errorGroom] = useCollection(groomQuery);
  const [petMedical, loadingMedical, errorMedical] =
    useCollection(medicalQuery);

  const handleCloseVaccine = () => {
    setOpenVaccine(false);
  };

  const handleOpenVaccine = (data) => {
    setEditVaccineData(data);
    setOpenVaccine(true);
  };

  const handleCloseSurgery = () => {
    setOpenSurgery(false);
  };

  const handleOpenSurgery = (data) => {
    setEditSurgeryData(data);
    setOpenSurgery(true);
  };

  const handleCloseGroomed = () => {
    setOpenGroomed(false);
  };

  const handleOpenGroom = (data) => {
    setEditGroomData(data);
    setOpenGroomed(true);
  };
  useEffect(() => {
    const fetchRecords = async () => {
      const Records = collection(db, "pets");
      const recordsRef = doc(Records, petID);
      const newRecord = await getDoc(recordsRef);
      setPetData(newRecord.data());
    };

    fetchRecords();
  }, [petID]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCompleteVaccine = () => {
    setAddVaccineData(petID);
    setAddVaccine(true);
  };
  const handleCloseAddVaccine = () => {
    setAddVaccine(false);
  };

  const handleCompleteMedical = () => {
    setAddMedicalData(petID);
    setAddMedical(true);
  };
  const handleCloseAddMedical = () => {
    setAddMedical(false);
  };

  const handleCompleteGroom = () => {
    setAddGroomData(petID);
    setAddGroom(true);
  };
  const handleCloseAddGroom = () => {
    setAddGroom(false);
  };

  const handleDeleteMedical = async (list) => {
    if (window.confirm("Are you sure you want to delete")) {
      await deleteDoc(doc(db, "medical_records", list.id));
    }
  };
  const handleDeleteVaccinel = async (list) => {
    if (window.confirm("Are you sure you want to delete")) {
      await deleteDoc(doc(db, "vaccine_records", list.id));
    }
  };
  const handleDeleteGroom = async (list) => {
    if (window.confirm("Are you sure you want to delete")) {
      await deleteDoc(doc(db, "groom_records", list.id));
    }
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
          <div className="block p-4">
            <div className="block-content p-4">
              <NavLink
                to="/Home"
                className="font-bold"
                style={{ cursor: "pointer" }}
              >
                <li className="fa fa-arrow-left text-lg mr-5"></li> Back
              </NavLink>
              <h2 className="content-heading text-black">Pet Records</h2>
              <div className="row items-push">
                <div className="col-lg-3 d-flex ">
                  <img
                    className="img-avatar img-avatar-thumb"
                    src={petData.petProfilePic}
                    style={{
                      width: "240px",
                      height: "240px",
                      margin: "auto",
                    }}
                  />
                </div>
                <div className="col-lg-7 offset-lg-1">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label for="re-listing-name">Pet Name</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          readOnly
                          value={petData.nickname}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                      <div className="form-group">
                        <label for="re-listing-address">Pet Age</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          readOnly
                          value={moment().diff(
                            moment(petData.birthDate?.toDate()),
                            "year"
                          )}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                      <div className="form-group">
                        <label for="re-listing-address">Birthdate</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          readOnly
                          value={moment(petData.birthDate?.toDate()).format(
                            "LL"
                          )}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                      <div className="form-group">
                        <label for="re-listing-address">Breed</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          readOnly
                          value={petData.breed}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label for="re-listing-address">Gender</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          readOnly
                          value={petData.gender}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                      <div className="form-group">
                        <label for="re-listing-address">Weight</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          readOnly
                          value={petData.weight}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Box sx={{ width: "100%", marginTop: 10 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Vaccine Records" {...a11yProps(0)} />
                  <Tab label="Medical Records" {...a11yProps(1)} />
                  <Tab label="Groom Records" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="content-heading d-flex justify-content-end">
                  <button
                    className="btn btn-md text-white bg-primary"
                    onClick={handleCompleteVaccine}
                  >
                    Add Record
                  </button>
                </div>
                <div className="row items-push">
                  <div className="col-lg-12">
                    <div style={{ height: "300px", overflowY: "scroll" }}>
                      <table className="table table-striped table-responsive">
                        <thead>
                          <tr>
                            <th>Doctor</th>
                            <th>Vaccine Type</th>
                            <th>Vaccine Brand</th>
                            <th>Weight</th>
                            <th>Treatment</th>
                            <th>Doctor's Notation</th>
                            <th>Appointment Date</th>
                          </tr>
                        </thead>
                        {petVaccine?.docs.length == 0 ? (
                          <td className="text-center" colSpan={7}>
                            No data Found
                          </td>
                        ) : (
                          <tbody>
                            {petVaccine?.docs.map((list) => (
                              <>
                                <tr>
                                  <td>{list.data().doctorsInfo}</td>
                                  <td>{list.data().vaccineType}</td>
                                  <td>{list.data().vaccineBrand}</td>
                                  <td>{list.data().weight}</td>
                                  <td>{list.data().treatment}</td>
                                  <td>{list.data().doctorsNotation}</td>
                                  <td>
                                    {moment(list.data().dateComplete).format(
                                      "MMMM D, Y"
                                    )}
                                  </td>
                                  <td>
                                    <div className="d-flex justify-content-center">
                                      <button
                                        className="text-white"
                                        onClick={() => handleOpenVaccine(list)}
                                        data-toggle="modal"
                                        data-target="#edit_user_modal"
                                      >
                                        <li className="fa fa-pencil bg-success p-2"></li>
                                      </button>
                                      <button
                                        className="text-white"
                                        onClick={() =>
                                          handleDeleteVaccinel(list)
                                        }
                                      >
                                        <li className="fa fa-trash bg-danger p-2"></li>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="content-heading d-flex justify-content-end">
                  <button
                    className="btn btn-md text-white bg-primary"
                    onClick={handleCompleteMedical}
                  >
                    Add Record
                  </button>
                </div>
                <div className="row items-push">
                  <div className="col-lg-12">
                    <div style={{ height: "300px", overflowY: "scroll" }}>
                      <table className="table table-striped table-responsive">
                        <thead>
                          <tr>
                            <th>Doctor</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Weight</th>
                            <th>Symptoms</th>
                            <th>Description</th>
                            <th>Diagnosis</th>
                            <th>Physical Examination</th>
                            <th>Appointment Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {petMedical?.docs.length == 0 ? (
                            <td className="text-center" colSpan={9}>
                              No data Found
                            </td>
                          ) : (
                            petMedical?.docs.map((list) => (
                              <tr>
                                <td>{list.data().doctorsInfo}</td>
                                <td>{list.data().status}</td>
                                <td>{list.data().type}</td>
                                <td>{list.data().weight}</td>
                                <td>{list.data().symptoms}</td>
                                <td>{list.data().description}</td>
                                <td>{list.data().diagnosis}</td>
                                <td>{list.data().physical_exam}</td>
                                <td>
                                  {moment(list.data().dateComplete).format(
                                    "MMMM D, Y"
                                  )}
                                </td>
                                <td>
                                  <div className="d-flex justify-content-center">
                                    <button
                                      className="text-white"
                                      onClick={() => handleOpenSurgery(list)}
                                      data-toggle="modal"
                                      data-target="#edit_user_modal"
                                    >
                                      <li className="fa fa-pencil bg-success p-2"></li>
                                    </button>
                                    <button
                                      className="text-white"
                                      onClick={() => handleDeleteMedical(list)}
                                    >
                                      <li className="fa fa-trash bg-danger p-2"></li>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="content-heading d-flex justify-content-end">
                  <button
                    className="btn btn-md text-white bg-primary"
                    onClick={handleCompleteGroom}
                  >
                    Add Record
                  </button>
                </div>
                <div className="row items-push">
                  <div className="col-lg-12">
                    <div style={{ height: "300px", overflowY: "scroll" }}>
                      <table className="table table-striped table-responsive">
                        <thead>
                          <tr>
                            <th>Doctor</th>
                            <th>Appointment Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {petGroom?.docs.length == 0 ? (
                            <td className="text-center" colSpan={2}>
                              No data Found
                            </td>
                          ) : (
                            <>
                              {petGroom?.docs.map((list) => (
                                <tr>
                                  <td>{list.data().doctorsInfo}</td>
                                  <td>
                                    {moment(list.data().dateGroomed).format(
                                      "MMMM D, Y"
                                    )}
                                  </td>
                                  <td>
                                    <div className="d-flex justify-content-center">
                                      <button
                                        className="text-white"
                                        onClick={() => handleOpenGroom(list)}
                                        data-toggle="modal"
                                        data-target="#edit_user_modal"
                                      >
                                        <li className="fa fa-pencil bg-success p-2"></li>
                                      </button>
                                      <button
                                        className="text-white"
                                        onClick={() => handleDeleteGroom(list)}
                                      >
                                        <li className="fa fa-trash bg-danger p-2"></li>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </main>
      {addVaccine && (
        <UserAddVaccineModal
          open={addVaccine}
          close={handleCloseAddVaccine}
          data={addVaccineData}
        />
      )}
      {addMedical && (
        <UserAddMedicalModal
          open={addMedical}
          close={handleCloseAddMedical}
          data={addMedicalData}
        />
      )}
      {addGroom && (
        <UserAddGroom
          open={addGroom}
          close={handleCloseAddGroom}
          data={addGroomData}
        />
      )}

      {openVaccine && (
        <EditVaccineModal
          open={openVaccine}
          close={handleCloseVaccine}
          data={editVaccineData}
        />
      )}
      {openSurgery && (
        <EditSurgeryModal
          open={openSurgery}
          close={handleCloseSurgery}
          data={editSurgeryData}
        />
      )}
      {openGroomed && (
        <EditGroomModal
          open={openGroomed}
          close={handleCloseGroomed}
          data={editGroomData}
        />
      )}
    </div>
  );
};

export default Pets;
