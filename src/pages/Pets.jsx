import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { db } from "../auth/firebase";
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import { useCollection } from "react-firebase-hooks/firestore";
const Pets = () => {
  const [petData, setPetData] = useState({});
  let { petID } = useParams();
  const docRef = doc(db, "pets", petID);
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
  useEffect(
    () =>
      function () {
        getDoc(docRef).then(function (doc) {
          setPetData(doc.data());
        });
      },

    []
  );

  return (
    <div
      id="page-container"
      className="sidebar-o enable-page-overlay side-scroll page page-header-inverse header glass"
    >
      <Sidebar />
      <Header />

      <main id="main-container">
        <div className="content">
          <div className="block">
            <div className="block-content p-4">
              <h2 class="content-heading text-black">Pet Information</h2>
              <div class="row items-push">
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
                <div class="col-lg-7 offset-lg-1">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="re-listing-name">Pet Name</label>
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          readOnly
                          value={petData.nickname}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                      <div class="form-group">
                        <label for="re-listing-address">Pet Age</label>
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          readOnly
                          value={moment().diff(
                            moment(petData.birthDate?.toDate()),
                            "year"
                          )}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                      <div class="form-group">
                        <label for="re-listing-address">Birthdate</label>
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          readOnly
                          value={moment(petData.birthDate?.toDate()).format(
                            "LL"
                          )}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                      <div class="form-group">
                        <label for="re-listing-address">Breed</label>
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          readOnly
                          value={petData.breed}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="re-listing-address">Gender</label>
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          readOnly
                          value={petData.gender}
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                      <div class="form-group">
                        <label for="re-listing-address">Weight</label>
                        <input
                          type="text"
                          class="form-control form-control-lg"
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
            <div className="row">
              <div className="col-lg-6">
                <div className="block-content p-4">
                  <h2 class="content-heading text-black">Vaccine Records</h2>
                  <div class="row items-push">
                    <div class="col-lg-12">
                      <table className="table table-striped table-responsive">
                        <thead>
                          <tr>
                            <th>Appointment Date</th>
                            <th>Vaccine Type</th>
                          </tr>
                        </thead>
                        {petVaccine?.docs.length == 0 ? (
                          <td className="text-center" colSpan={2}>
                            No data Found
                          </td>
                        ) : (
                          <tbody>
                            <tr>
                              {petVaccine?.docs.map((list) => (
                                <>
                                  <td>
                                    {moment(list.data().dateComplete).format(
                                      "MMMM D"
                                    )}
                                  </td>
                                  <td>{list.data().vaccineType}</td>
                                </>
                              ))}
                            </tr>
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="block-content p-4">
                  <h2 class="content-heading text-black">Groom Records</h2>
                  <div class="row items-push">
                    <div class="col-lg-12">
                      <table className="table table-striped table-responsive">
                        <thead>
                          <tr>
                            <th>Appointment Date</th>
                          </tr>
                        </thead>
                        {petGroom?.docs.length == 0 ? (
                          <td className="text-center" colSpan={2}>
                            No data Found
                          </td>
                        ) : (
                          <tbody>
                            <tr>
                              {petGroom?.docs.map((list) => (
                                <>
                                  <td>
                                    {moment(list.data().dateComplete).format(
                                      "MMMM D"
                                    )}
                                  </td>
                                </>
                              ))}
                            </tr>
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block-content p-4">
              <h2 class="content-heading text-black">Medical Records</h2>
              <div class="row items-push">
                <div class="col-lg-12">
                  <table className="table table-striped table-responsive">
                    <thead>
                      <tr>
                        <th>Appointment Date</th>
                        <th>Symptoms</th>
                        <th>Description</th>
                        <th>Diagnosis</th>
                        <th>Physical Examination</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    {petMedical?.docs.length == 0 ? (
                      <td className="text-center" colSpan={6}>
                        No data Found
                      </td>
                    ) : (
                      petMedical?.docs.map((list) => (
                        <>
                          <tbody>
                            <tr>
                              <td>
                                {moment(list.data().dateComplete).format(
                                  "MMMM D"
                                )}
                              </td>
                              <td>{list.data().symptoms}</td>
                              <td>{list.data().description}</td>
                              <td>{list.data().diagnosis}</td>
                              <td>{list.data().physical_exam}</td>
                              <td>{list.data().type}</td>
                            </tr>
                          </tbody>
                        </>
                      ))
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pets;
