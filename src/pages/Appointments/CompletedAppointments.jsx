import React, { useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../auth/firebase";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import PageHead from "../../components/Table/PageHead";
import PageToolbar from "../../components/Table/PageToolbar";
import Userlogo from "../../assets/img/user.png";
import { getComparator, stableSort } from "../../utils/tableUtils";
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
    id: "gender",
    label: "Gender",
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

function CompletedAppointments() {
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

  // Fetch Appointments Data
  useEffect(() => {
    async function getUsers() {
      const q = query(
        appointmentsCollectionRef,
        where("status", "==", "Completed")
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
              <h1 className="font-bold">Completed Bookings</h1>
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
                              <TableCell>{list.gender}</TableCell>
                              <TableCell>{list.purpose}</TableCell>
                              <TableCell>{list.description}</TableCell>
                              <TableCell>
                                <Moment format="MMM DD">{list.day}</Moment>
                                {", "}
                                {list.time}
                              </TableCell>
                              <TableCell>
                                <h1 className="bg-success text-center p-1 text-white rounded-xl">
                                  {list.status}
                                </h1>
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
}

export default CompletedAppointments;
