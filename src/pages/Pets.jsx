import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Userlogo from "../assets/img/user.png";
import { db } from "../auth/firebase";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";
const Pets = () => {
  const [petData, setPetData] = useState({});
  let { petID } = useParams();
  const docRef = doc(db, "pets", petID);
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
              <div className="row">
                <div className="col-lg-12">
                  <h1
                    className="text-center p-4 text-white"
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      backgroundColor: "rgb(37, 99, 235)",
                    }}
                  >
                    PET INFORMATION
                  </h1>
                </div>
                <div className="col-lg-6 align-items-center d-flex mt-30">
                  <img
                    className="img-avatar img-avatar-thumb"
                    src={petData.petProfilePic}
                    style={{
                      width: "280px",
                      height: "280px",
                      margin: "auto",
                    }}
                  />
                </div>
                <div className="col-lg-6 mt-30">
                  <table className="table table-md table-borderless table-stripped">
                    <tbody style={{ borderTop: 0, fontSize: 15 }}>
                      <tr>
                        <td className="font-bold">PET NAME</td>
                        <td>{petData.nickname}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">PET AGE</td>
                        <td>
                          {moment().diff(
                            moment(petData.birthDate?.toDate()),
                            "year"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold">BIRTH DATE</td>
                        <td>
                          {moment(petData.birthDate.toDate()).format("LL")}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold">BREED</td>
                        <td>{petData.breed}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">GENDER</td>
                        <td>{petData.gender}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">WEIGHT</td>
                        <td>{petData.weight}</td>
                      </tr>
                    </tbody>
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
