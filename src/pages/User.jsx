import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Userlogo from "../assets/img/user.png";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import PageHead from "../components/Table/PageHead";
import PageToolbar from "../components/Table/PageToolbar";
import { getComparator, stableSort } from "../utils/tableUtils";
import moment from "moment/moment";
import { useEffect } from "react";

const headCells = [
  {
    id: "firstname",
    label: "Name",
    sortable: true,
  },
  {
    id: "email",
    label: "Email",
    sortable: true,
  },
  {
    id: "created_at",
    label: "Date Created",
    sortable: true,
  },
  {
    id: "Action",
    label: "Action",
    sortable: false,
  },
];

function User() {
  const userCollectionRef = collection(db, "users");
  const userQuery = query(
    userCollectionRef,
    where("role", "==", "user"),
    orderBy("createdAt", "desc")
  );
  const [users, loading] = useCollection(userQuery);
  const [userDetails, setUserDetails] = useState([]);
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [selectedPets, setSelectedpets] = useState([]);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [order, setOrder] = useState("asc");
  const [tbOrderBy, setTbOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userMOdalDetails, setUserMOdalDetails] = useState([]);
  // Fetch Patients Data
  useEffect(() => {
    async function getUsers() {
      const q = query(
        userCollectionRef,
        where("role", "==", "user"),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const result = [];

        querySnapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setUserDetails(result);
        setFilteredUserDetails(result);
      });
      return unsubscribe;
    }

    getUsers();
  }, []);

  const handleTest = (id) => {
    window.location.href = "/Pets/" + id;
  };

  const handleRequestSort = (_event, property) => {
    const isAsc = tbOrderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setTbOrderBy(property);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilter = (event) => {
    const filtered = userDetails.filter((user) =>
      `${user?.firstname} ${user?.lastname}`
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    );
    if (event.target.value != "") {
      setUserDetails(filtered);
    } else {
      setUserDetails(filteredUserDetails);
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userDetails.length) : 0;

  const handleOpenDetails = (users) => {
    console.log(users);
    setUserMOdalDetails(users);
    handleAppointments(users.id);
    handleClick(users.id);
  };

  // get selected data to appointments in modal
  const handleAppointments = async (id) => {
    const appointmentsCollectionRef = collection(db, "appointments");
    const q = query(appointmentsCollectionRef, where("userId", "==", id));
    const appointments = await getDocs(q);
    setSelectedAppointments(appointments.docs);
  };

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
        <div className="content">
          <div className="content-header d-flex justify-content-between">
            <h1 className="font-bold">List of Users</h1>
            <PageToolbar handleSearch={handleFilter} />
          </div>
          <div className="block">
            <div className="block-content block-content-full block-content-sm bg-white">
              <TableContainer>
                <Table size="medium">
                  <PageHead
                    order={order}
                    orderBy={tbOrderBy}
                    onRequestSort={handleRequestSort}
                    headCells={headCells}
                  />
                  {loading ? (
                    <div className="h-100 col-12 d-flex text-center justify-content-center">
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <TableBody>
                      {stableSort(userDetails, getComparator(order, tbOrderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((users, index) => {
                          return (
                            <TableRow key={index} tabIndex={-1} hover>
                              <TableCell>
                                <h1>
                                  {" "}
                                  <img
                                    className="img-avatar w-10 h-10 mr-2 img-avatar-thumb"
                                    src={
                                      users.photoURL ? users.photoURL : Userlogo
                                    }
                                  />
                                  {users.firstname} {users.lastname}
                                </h1>
                              </TableCell>
                              <TableCell>{users.email}</TableCell>
                              <TableCell>
                                {moment(users.createdAt.toDate().toDateString())
                                  .add(1, "d")
                                  .format("MMM. d YYYY")}
                              </TableCell>
                              <TableCell>
                                <div className="d-flex justify-content-center">
                                  <button
                                    className="text-white"
                                    onClick={() => handleOpenDetails(users)}
                                    data-toggle="modal"
                                    data-target="#edit_user_modal"
                                  >
                                    <li className="fa fa-search bg-primary p-1"></li>
                                  </button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 53 * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userDetails.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
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
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="block block-themed block-transparent mb-0">
                <div className="block-header bg-light">
                  <h3 className="block-title text-black font-bold">
                    User Info
                  </h3>
                  <div className="block-options">
                    <button
                      type="button"
                      className="btn-block-option"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <i className="si si-close text-black font-bold"></i>
                    </button>
                  </div>
                </div>
                <div
                  className="table-responsive px-20 py-20"
                  style={{ height: "700px" }}
                >
                  <div className="col-md-12 col-xl-12 cursor-pointer">
                    <a className="block text-center">
                      <div className="block-content block-content-full bg-gradient-to-r from-cyan-900 to-blue-500">
                        <div>
                          <img
                            className="img-avatar img-avatar-thumb"
                            src={Userlogo}
                          />
                        </div>
                        <div className="mt-2 text-white font-bold text-lg">
                          {userMOdalDetails.firstname}{" "}
                          {userMOdalDetails.lastname}
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
                    <h1 className="ml-10 font-bold">List of Pets</h1>
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
                        <th className="text-right pr-20">Action</th>
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
                                        : Userlogo
                                    }
                                  />
                                </td>
                                <td>{doc.data().nickname}</td>
                                <td>{doc.data().animalType}</td>
                                <td>{doc.data().breed}</td>
                                <td>{doc.data().status}</td>
                                <td className="d-flex justify-content-end">
                                  <button
                                    to={"/Pets/" + doc.id}
                                    className="btn btn-primary"
                                    onClick={() => handleTest(doc.id)}
                                  >
                                    View Record
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })
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
