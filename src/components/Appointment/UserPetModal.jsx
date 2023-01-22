import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Userlogo from "../../assets/img/user.png";
import Pawlogo from "../../assets/img/paw.png";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../auth/firebase";
import { Link, NavLink, useNavigate } from "react-router-dom";

const UserPetModal = ({ open, close, data }) => {
  const [loadingPets, setLoadingPets] = useState(false);
  const [selectedPets, setSelectedpets] = useState([]);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [userMOdalDetails, setUserMOdalDetails] = useState([]);

  useEffect(() => {
    handleAppointments(data);
  }, [data]);

  useEffect(() => {
    handleClick(data);
  }, [data]);

  useEffect(() => {
    handleOpenDetails(data);
  }, [data]);

  console.log(data);
  // get selected data to appointments in modal
  const handleAppointments = async (data) => {
    const appointmentsCollectionRef = collection(db, "appointments");
    const q = query(appointmentsCollectionRef, where("userId", "==", data.id));
    const appointments = await getDocs(q);
    setSelectedAppointments(appointments.docs);
  };

  // get selected data to passed in modal
  const handleClick = async (data) => {
    setLoadingPets(true);
    const petCollectionRef = collection(db, "pets");
    const q = query(petCollectionRef, where("ownerId", "==", data.id));
    const pets = await getDocs(q);
    setSelectedpets(pets.docs);
    setLoadingPets(false);
  };

  const handleOpenDetails = (users) => {
    setUserMOdalDetails(users);
  };

  const handleClose = () => {
    close();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle className="d-flex justify-content-between">
        <h1> User Info</h1>
        <li className="fa fa-close cursor-pointer" onClick={handleClose}></li>
      </DialogTitle>
      <DialogContent>
        <div
          className="table-responsive px-20 py-20"
          style={{ height: "700px" }}
        >
          <div className="col-md-12 col-xl-12 cursor-pointer">
            <a className="block text-center">
              <div className="block-content block-content-full bg-gradient-to-r from-cyan-900 to-blue-500">
                <div>
                  <img className="img-avatar img-avatar-thumb" src={Userlogo} />
                </div>
                <div className="mt-2 text-white font-bold text-lg">
                  {userMOdalDetails.firstname} {userMOdalDetails.lastname}
                </div>
                <div className="mt-1 text-white text-md">
                  {userMOdalDetails.email}
                </div>
              </div>

              <div className="block-content block-content-full d-flex justify-content-around bg-body-light">
                <div className="font-w600 mb-5">
                  {" "}
                  <div className="font-size-h2 text-info font-w700">
                    {selectedAppointments.length}
                  </div>
                  <div className="font-size-sm font-w600  text-uppercase text-muted">
                    <h1 className="text-xs">Total Appointments</h1>
                  </div>
                </div>
                <div className="font-size-sm text-muted">
                  {" "}
                  <div className="font-w600 mb-5">
                    {" "}
                    <div className="font-size-h2 text-warning font-w700">
                      {selectedPets.length}
                    </div>
                    <div className=" font-w600  text-uppercase text-muted">
                      <h1 className="text-xs">Total Added Pets</h1>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="border-b-2 m-3 border-dark pb-3">
            <h1 className="ml-10 font-bold">Added Pets</h1>
          </div>
          <table className="table table-striped table-vcenter table-md">
            <thead>
              <tr>
                <th>
                  <i
                    className="fa fa-paw  none text-center ml-15"
                    aria-hidden="true"
                  ></i>
                </th>
                <th>Name</th>
                <th>Type</th>
                <th>Breed</th>
                <th>Status</th>
                {/* <th className="text-right pr-20">Action</th> */}
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
                selectedPets.map((doc) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <img
                            className="img-avatar img-avatar-thumb h-10 w-10"
                            src={
                              doc.data().petProfilePic
                                ? doc.data().petProfilePic
                                : Pawlogo
                            }
                          />
                        </td>
                        <td>{doc.data().nickname}</td>
                        <td>{doc.data().animalType}</td>
                        <td>{doc.data().breed}</td>
                        <td>{doc.data().status}</td>
                        <td>
                          <Link
                            to={`/PetRoute/${doc.id}`}
                            onClick={handleClose}
                            className="text-white bg-primary p-2 rounded-lg"
                            data-toggle="modal"
                            data-target="#edit_user_modal"
                          >
                            Records
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserPetModal;
