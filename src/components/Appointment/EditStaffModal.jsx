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
  updateDoc,
} from "firebase/firestore";
import { auth, createUserAuth, db } from "../../auth/firebase";
import { useAuth } from "../../auth/context/UserAuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, reload } from "firebase/auth";
import Swal from "sweetalert2";

const EditStaffModal = ({ open, close, data }) => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [validation, setValidation] = useState();
  const [validateSubmit, setValidateSubmit] = useState(true);
  const [confirmValidation, setConfirmValidation] = useState();
  const [colorMSG, setColorMSG] = useState();
  const [colorMSGConfirm, setColorMSGConfirm] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    confirmpassword: "",
    profile: "",
  });
  let errMsg = "";
  let colorMsg = "";
  let MSGconfirm = "";
  let colorMsgConfirm = "";
  useEffect(() => {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = user.password.length;
    const uppercasePassword = uppercaseRegExp.test(user.password);
    const lowercasePassword = lowercaseRegExp.test(user.password);
    const digitsPassword = digitsRegExp.test(user.password);
    const specialCharPassword = specialCharRegExp.test(user.password);
    const minLengthPassword = minLengthRegExp.test(user.password);
    if (passwordLength === 0) {
      errMsg = "";
    } else if (!uppercasePassword) {
      colorMsg = "red";
      errMsg = "At least one Uppercase";
    } else if (!lowercasePassword) {
      colorMsg = "red";
      errMsg = "At least one Lowercase";
    } else if (!digitsPassword) {
      colorMsg = "red";
      errMsg = "At least one digit";
    } else if (!specialCharPassword) {
      colorMsg = "red";
      errMsg = "At least one Special Characters";
    } else if (!minLengthPassword) {
      colorMsg = "red";
      errMsg = "At least minumum 8 characters";
    } else {
      colorMsg = "green";
      errMsg = "Strong Password";
    }
    setColorMSG(colorMsg);
    setValidation(errMsg);
    // for confirm password
    if (user.confirmpassword.length > 0) {
      if (user.confirmpassword != user.password) {
        colorMsgConfirm = "red";
        MSGconfirm = "Password is not matched";
      } else {
        colorMsgConfirm = "green";
        MSGconfirm = "Password matched";
        setValidateSubmit(false);
      }
    } else {
      MSGconfirm = "";
    }

    setConfirmValidation(MSGconfirm);
    setColorMSGConfirm(colorMsgConfirm);
  }, [user.password, user.confirmpassword]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUser({ ...user, profile: base64 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    if (window.confirm("Are you Sure to Add this Staff?")) {
      close();
      Swal.showLoading();
      try {
        updateDoc(doc(db, "users", data.id), {
          password: user.password ? user.password : data.password,
          firstname: user.firstname ? user.firstname : data.firstname,
          lastname: user.lastname ? user.lastname : data.lastname,
          photoURL: user.profile ? user.profile : data.photoURL,
        });
        Swal.fire({
          title: "Success",
          html: "Staff Updated Successfully?",
          icon: "success",
          timer: 1000,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location.reload();
    }
  };
  const handleClose = () => {
    setUser({
      ...user,
      profile: "",
    });
    close();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle className="d-flex justify-content-between">
        Edit Staff
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
                    placeholder={data.firstname}
                    style={{
                      borderColor: user.firstname.length != 0 ? "green" : "",
                    }}
                    onChange={(e) =>
                      setUser({ ...user, firstname: e.target.value })
                    }
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
                    placeholder={data.lastname}
                    style={{
                      borderColor: user.lastname.length != 0 ? "green" : "",
                    }}
                    onChange={(e) =>
                      setUser({ ...user, lastname: e.target.value })
                    }
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
                    disabled
                    placeholder={data.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
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
                    placeholder="•••••••••"
                    style={{ borderColor: colorMSG }}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  <p
                    style={{
                      color: colorMSG,
                      marginLeft: 15,
                      fontSize: 14,
                      padding: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {validation}
                  </p>
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
                    style={{ borderColor: colorMSGConfirm }}
                    placeholder="•••••••••"
                    onChange={(e) =>
                      setUser({
                        ...user,
                        confirmpassword: e.target.value,
                      })
                    }
                  />
                  <p
                    style={{
                      color: colorMSGConfirm,
                      marginLeft: 15,
                      fontSize: 14,
                      padding: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {confirmValidation}
                  </p>
                </div>
              </div>
              <div className="form-group row">
                <div>
                  <img
                    className="img-avatar w-20 h-20 mr-2 img-avatar-thumb"
                    src={user.profile ? user.profile : data.photoURL}
                  />
                </div>
                <div>
                  <label className="ml-3 mb-3">Profile Picture</label>
                  <div className="col-12">
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      id="file"
                      name="file"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group row pt-50">
                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-hero btn-alt-primary min-width-175"
                  >
                    <i className="fa fa-send mr-5"></i> Update
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

export default EditStaffModal;
