import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../auth/firebase";
import Moment from "react-moment";
import CompleteModal from "../components/Appointment/CompleteModal";
import CompleteVaccineModal from "../components/Appointment/CompleteVaccineModal";
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
import { useAuth } from "../auth/context/UserAuthContext";

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

const ApproveAppointments = () => {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [openVaccine, setOpenVaccine] = useState(false);
  const [order, setOrder] = useState("asc");
  const [tbOrderBy, setTbOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedApprove, setSelectedApprove] = useState(null);
  const [appointmentData, setAppointmentData] = useState([]);
  const [filterAppointmentData, setFilterAppointmentData] = useState([]);
  const appointmentsCollectionRef = collection(db, "appointments");
  const petsCollectionRef = collection(db, "pets");
  const appointmentsQuery = query(
    appointmentsCollectionRef,
    where("status", "!=", "Deleted")
  );
  let count = 1;
  const [appointments, loadingAppoint] = useCollection(appointmentsQuery);
  const [pets] = useCollection(petsCollectionRef);

  useEffect(() => {
    async function getUsers() {
      const q = query(
        appointmentsCollectionRef,
        where("status", "==", "Approved")
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
  const handleOpen = async (apt) => {
    console.log(apt);

    setSelectedApprove({ ...apt, id: apt.id });
    if (apt.purpose === "Groom") {
      markGroomAsCompleted(apt);
    } else if (apt.purpose === "Vaccine") {
      markCompleteVaccine(apt.id);
    } else {
      markCompleteSurgery(apt.id);
    }
  };

  const markCompleteVaccine = async (id) => {
    if (window.confirm("Complete this appointment?")) {
      const aptRef = doc(db, "appointments", id);
      await updateDoc(aptRef, {
        status: "Completed",
      });
    }
  };

  const markCompleteSurgery = async (id) => {
    if (window.confirm("Complete this appointment?")) {
      const aptRef = doc(db, "appointments", id);
      await updateDoc(aptRef, {
        status: "Completed",
      });
    }
  };

  const markGroomAsCompleted = async (apt) => {
    if (window.confirm("Mark Groom as Done?")) {
      const aptPets = apt.petIds.map((petId) => {
        return addDoc(collection(db, "groom_records"), {
          petId,
          doctorsInfo: user.firstname,
          petName: apt.petName,
          gender: apt.gender,
          dateGroomed: apt.day,
          appointment_id: apt.id,
          createdAt: serverTimestamp(),
        });
      });
      await Promise.all(aptPets);
      await updateDoc(doc(db, "appointments", apt.id), {
        status: "Completed",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
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
              <h1 className="font-bold">Approve Bookings</h1>
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
                                <div
                                  className="d-flex justify-content-center"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleOpen(list)}
                                >
                                  <h1 className="bg-green-600 text-white p-2 px-3 mr-3">
                                    Mark as Complete
                                  </h1>
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
      {open && (
        <CompleteModal
          open={open}
          close={handleClose}
          data={selectedApprove}
          pets_data={pets}
        />
      )}

      {openVaccine && (
        <CompleteVaccineModal
          open={openVaccine}
          close={handleClose}
          data={selectedApprove}
        />
      )}
    </>
  );
};

export default ApproveAppointments;
