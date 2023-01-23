import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Userlogo from "../assets/img/user.png";
import Pawlogo from "../assets/img/paw.png";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import PetsModal from "../components/Appointment/PetsModal";
import UserPetModal from "../components/Appointment/UserPetModal";
import AddStaffModal from "../components/Appointment/AddStaffModal";

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
    id: "password",
    label: "Password",
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

function Staffs() {
  const userCollectionRef = collection(db, "users");
  const userQuery = query(
    userCollectionRef,
    where("role", "==", "Staff"),
    orderBy("createdAt", "desc")
  );
  const navigate = useNavigate();
  const [users, loading] = useCollection(userQuery);
  const [userDetails, setUserDetails] = useState([]);
  const [openStaff, setOpenStaff] = useState(false);
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);
  const [order, setOrder] = useState("asc");
  const [tbOrderBy, setTbOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Fetch Patients Data
  useEffect(() => {
    async function getUsers() {
      const q = query(userCollectionRef, where("role", "==", "Staff"));
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

  const handleOpenStaff = () => {
    setOpenStaff(true);
  };
  const handleCloseStaff = () => {
    setOpenStaff(false);
  };

  const handleDeleteStaff = async (users) => {
    if (window.confirm("Are you Sure to Delete this Staff?")) {
      try {
        await deleteDoc(doc(db, "users", users.id));
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
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
          <div className="content-header d-flex justify-content-between">
            <div>
              <h1 className="font-bold">List of Staffs</h1>
            </div>
            <div className="d-flex justify-content-between">
              <div style={{ marginRight: 20 }}>
                <PageToolbar handleSearch={handleFilter} />
              </div>
              <div className="mt-2.5">
                <button
                  className="btn btn-md btn-primary"
                  onClick={handleOpenStaff}
                >
                  Add New Staff
                </button>
              </div>
            </div>
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
                              <TableCell>{users.password}</TableCell>
                              <TableCell>
                                {moment(users.createdAt.toDate().toDateString())
                                  .add(1, "d")
                                  .format("MMM. d YYYY")}
                              </TableCell>
                              <TableCell>
                                <div className="d-flex justify-content-center">
                                  <button
                                    className="text-white"
                                    onClick={() => handleDeleteStaff(users)}
                                    data-toggle="modal"
                                    data-target="#edit_user_modal"
                                  >
                                    <li className="fa fa-trash bg-danger p-2"></li>
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
      </main>
      <AddStaffModal open={openStaff} close={handleCloseStaff} />
    </div>
  );
}

export default Staffs;
