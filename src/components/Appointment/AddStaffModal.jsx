import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Userlogo from "../../assets/img/user.png";
import Pawlogo from "../../assets/img/paw.png";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { auth, createUserAuth, db } from "../../auth/firebase";
import { useAuth } from "../../auth/context/UserAuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, reload } from "firebase/auth";

const AddStaffModal = ({ open, close }) => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    confirmpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you Sure to Add this Staff?")) {
      if (user.password === user.confirmpassword) {
        try {
          const signedUpUser = await createUserWithEmailAndPassword(
            createUserAuth,
            user.email,
            user.password
          );
          const newUser = {
            email: user.email,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            role: "Staff",
            online: false,
            photoURL: "",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          await setDoc(doc(db, "users", signedUpUser.user.uid), newUser);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Password Did not match! Try again..");
        window.location.reload();
      }
    }
  };
  const handleClose = () => {
    close();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle className="d-flex justify-content-between">
        <h1> Add New Staf</h1>
        <li className="fa fa-close cursor-pointer" onClick={handleClose}></li>
      </DialogTitle>
      <DialogContent>
        <div className="table-responsive px-15 py-20">
          <form onSubmit={handleSubmit}>
            <div className="px-5 py-30">
              <div className="form-group row">
                <label className="ml-3 mb-3">First name</label>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="firstname"
                    name="firstname"
                    placeholder="Enter your firstname.."
                    onChange={(e) =>
                      setUser({ ...user, firstname: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="ml-3 mb-3">Last name</label>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter your lastname.."
                    onChange={(e) =>
                      setUser({ ...user, lastname: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="ml-3 mb-3">Email</label>
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    placeholder="Enter your email.."
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="ml-3 mb-3">Password</label>
                <div className="col-12">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    name="password"
                    placeholder="Enter your password.."
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="ml-3 mb-3">Confirm Password</label>
                <div className="col-12">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="Enter your password.."
                    onChange={(e) =>
                      setUser({
                        ...user,
                        confirmpassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group row pt-50">
                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-hero btn-alt-primary min-width-175"
                  >
                    <i className="fa fa-send mr-5"></i> Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffModal;
