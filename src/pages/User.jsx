import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Userlogo from "../assets/img/user.png";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import Pawlogo from "../assets/img/paw.png";

function User() {
  const userCollectionRef = collection(db, "users");
  const userQuery = query(userCollectionRef, where("role", "!=", "admin"));
  const [users, loading] = useCollection(userQuery);

  const [loadingPets, setLoadingPets] = useState(false);
  const [selectedPets, setSelectedpets] = useState([]);

  // get selected data to passed in modal
  const handleClick = async (id) => {
    setLoadingPets(true);
    const petCollectionRef = collection(db, "pets");
    const q = query(petCollectionRef, where("ownerId", "==", id));
    const pets = await getDocs(q);
    setSelectedpets(pets.docs);
    setLoadingPets(false);
  };

  return (
    <div
      id="page-container"
      className="sidebar-o enable-page-overlay side-scroll page page-header-inverse header glass"
    >
      <Sidebar />
      <Header />

      <main id="main-container">
        {/* <div className="bg-dark">
          <div className="bg-image bg-image-middle">
            <div className="content content-top text-center ">
              <div className="py-50">
                <h1 className="font-w700 text-white mb-10">ASDASD</h1>
              </div>
            </div>
          </div>
        </div> */}
        <div className="content">
          <div className="block">
            <div className="block-content">
              <div className="row gutters-tiny py-20">
                {loading ? (
                  <div className="h-100 col-12 flex flex-1 justify-content-center">
                    <p>Loading...</p>
                  </div>
                ) : (
                  users.docs.map((doc) => (
                    <div
                      className="col-md-6 col-xl-3 cursor-pointer"
                      key={doc.id}
                      onClick={() => handleClick(doc.id)}
                      data-toggle="modal"
                      data-target="#edit_user_modal"
                    >
                      <a className="block text-center">
                        <div className="block-content block-content-full bg-gradient-to-r from-cyan-900 to-blue-500">
                          <img
                            className="img-avatar img-avatar-thumb"
                            src={
                              doc.data().photoURL
                                ? doc.data().photoURL
                                : Userlogo
                            }
                          />
                        </div>
                        <div className="block-content block-content-full">
                          <div className="font-w600 mb-5">
                            {doc.data().firstname} {doc.data().lastname}
                          </div>
                          <div className="font-size-sm text-muted">
                            {doc.data().role}
                          </div>
                        </div>
                        <div className="block-content block-content-full block-content-sm bg-body-light">
                          <span className="font-w600 font-size-sm text-danger"></span>
                        </div>
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User modal */}
        <div
          className="modal fade"
          id="edit_user_modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="add_attendance_modal"
          aria-hidden="true"
        >
          <div className="modal-dialog " role="document">
            <div className="modal-content">
              <div className="block block-themed block-transparent mb-0">
                <div className="block-header bg-primary-dark">
                  <h3 className="block-title">List of Pets</h3>
                  <div className="block-options">
                    <button
                      type="button"
                      className="btn-block-option"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <i className="si si-close"></i>
                    </button>
                  </div>
                </div>
                <div className="table-responsive px-20 py-20 h-96">
                  <table className="table table-striped table-vcenter table-sm">
                    <thead>
                      <tr>
                        <th>
                          <i
                            className="fa fa-paw d-sm none"
                            aria-hidden="true"
                          ></i>
                        </th>
                        <th>Nickname</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingPets ? (
                        <tr>
                          <td colSpan={5} className="text-center">
                            loading...
                          </td>
                        </tr>
                      ) : (
                        selectedPets.map((doc) => (
                          <tr>
                            <td>
                              <img
                                src={Pawlogo}
                                className="h-8 rounded-3xl bg-blue-600"
                              />
                            </td>
                            <td>{doc.data().nickname}</td>
                            <td>
                              {doc.data().description
                                ? doc.data().description
                                : "n/a"}
                            </td>
                            <td>{doc.data().animalType}</td>
                            <td>{doc.data().animalStatus}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END User modal */}
      </main>
    </div>
  );
}

export default User;
