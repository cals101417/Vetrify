import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../auth/firebase";
import Moment from "react-moment";
import moment from "moment/moment";
import axiosInstance from "../utils/axiosConfig";
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
import Userlogo from "../assets/img/user.png";
import { getComparator, stableSort } from "../utils/tableUtils";
import { useEffect } from "react";

const headCells = [
  {
    label: "#",
    sortable: false,
  },
  {
    id: "firstname",
    label: "Name",
    sortable: true,
  },
  {
    id: "petName",
    label: "Name of Pet",
    sortable: true,
  },
  {
    id: "purpose",
    label: "Purpose",
    sortable: true,
  },
  {
    id: "description",
    label: "Description",
    sortable: true,
  },
  {
    id: "day",
    label: "Date & time",
    sortable: false,
  },
  {
    label: "",
    sortable: false,
  },
];

const PendingAppointments = () => {
  const [order, setOrder] = useState("asc");
  const [tbOrderBy, setTbOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [appointmentData, setAppointmentData] = useState([]);
  const [filterAppointmentData, setFilterAppointmentData] = useState([]);
  const appointmentsCollectionRef = collection(db, "appointments");
  const appointmentsQuery = query(
    appointmentsCollectionRef,
    where("status", "!=", "Deleted")
  );
  let count = 1;
  const [appointments, loadingAppoint] = useCollection(appointmentsQuery);

  useEffect(() => {
    async function getUsers() {
      const q = query(
        appointmentsCollectionRef,
        where("status", "==", "Pending")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const result = [];

        querySnapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setAppointmentData(result);
        setFilterAppointmentData(result);
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
    const filtered = appointmentData.filter((user) =>
      `${user?.fullname}`
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    );
    if (event.target.value != "") {
      setAppointmentData(filtered);
    } else {
      setAppointmentData(filterAppointmentData);
    }
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - appointmentData.length)
      : 0;

  // approved appointment
  const approveClick = async (appoint) => {
    console.log(appoint);
    const updateAppointmentRef = doc(db, "appointments", appoint.id);
    const userRef = doc(db, "users", appoint.userId);

    if (window.confirm("Are you sure to Approve this appointment?")) {
      const user = await getDoc(userRef);
      await updateDoc(updateAppointmentRef, {
        status: "Approved",
      });

      if (user.exists && user.data()?.pushToken) {
        await axiosInstance.post("/send/notification", {
          to: user.data()?.pushToken,
          title: "Booking Has been Approved",
          body: `Your appointment at ${moment(appoint.day).format("LL")} - ${
            appoint.time
          } has been approved.`,
        });
      }
    }
  };

  // decline appointment
  const declineClick = async (apt) => {
    const cancelAppointmentRef = doc(db, "appointments", apt.id);
    const userRef = doc(db, "users", apt.userId);
    if (window.confirm("Are you sure to Cancel this appointment?")) {
      const user = await getDoc(userRef);
      await updateDoc(cancelAppointmentRef, {
        status: "Cancelled",
      });
      if (user.exists && user.data()?.pushToken) {
        await axiosInstance.post("/send/notification", {
          to: user.data()?.pushToken,
          title: "Booking Has been Cancelled",
          body: `Your appointment at ${moment(apt.day).format("LL")} - ${
            apt.time
          } has been cancelled.`,
        });
      }
      window.location.reload();
    }
  };

  return (
    <>
      <div
        id="page-container"
        className="sidebar-o enable-page-overlay side-scroll page page-header-inverse header glass"
      >
        <Sidebar />
        <Header />
        <main id="main-container">
          <div className="content">
            <div className="content-header d-flex justify-content-between">
              <h1 className="font-bold">Pending Bookings</h1>
              <PageToolbar handleSearch={handleFilter} />
            </div>
            <div className="block">
              <TableContainer>
                <Table size="medium">
                  <PageHead
                    order={order}
                    orderBy={tbOrderBy}
                    onRequestSort={handleRequestSort}
                    headCells={headCells}
                  />
                  {loadingAppoint ? (
                    <div className="h-100 col-12 d-flex text-center justify-content-center">
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <TableBody>
                      {stableSort(
                        appointmentData,
                        getComparator(order, tbOrderBy)
                      )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((list, index) => {
                          console.log(list.status);
                          return (
                            <TableRow key={index} tabIndex={-1} hover>
                              <TableCell>{count++}</TableCell>
                              <TableCell>
                                <h1>
                                  {" "}
                                  <img
                                    className="img-avatar w-10 h-10 mr-2 img-avatar-thumb"
                                    src={
                                      list.photoURL ? list.photoURL : Userlogo
                                    }
                                  />
                                  {list.fullname}
                                </h1>
                              </TableCell>
                              <TableCell>{list.petName}</TableCell>
                              <TableCell>
                                {list.purpose.map((item, index) => {
                                  if (item.length > 1) {
                                    return (index ? " & " : "") + item;
                                  } else {
                                    return item;
                                  }
                                })}
                              </TableCell>
                              <TableCell>{list.description}</TableCell>
                              <TableCell>
                                <Moment format="MMM DD">{list.day}</Moment>
                                {", "}
                                {list.time}
                              </TableCell>
                              <TableCell>
                                <div className="d-flex justify-content-center gap-3">
                                  <i
                                    className="cursor-pointer fa fa-check bg-green-600 text-white p-2"
                                    onClick={() => approveClick(list)}
                                  ></i>
                                  <i
                                    className="cursor-pointer fa fa-close bg-red-600 text-white p-2"
                                    onClick={() => declineClick(list)}
                                  ></i>
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
                count={appointmentData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PendingAppointments;
