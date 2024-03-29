import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Userlogo from "../assets/img/user.png";
import PawLogo from "../assets/img/paw.png";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
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

const headCells = [
  {
    id: "nickname",
    label: "Pet Name",
    sortable: true,
  },
  {
    id: "age",
    label: "Age",
    sortable: true,
  },
  {
    id: "gender",
    label: "Gender",
    sortable: true,
  },
  {
    id: "animalType",
    label: "Type",
    sortable: true,
  },
  {
    id: "weight",
    label: "Weight",
    sortable: true,
  },
  {
    id: "breed",
    label: "Breed",
    sortable: true,
  },
  {
    id: "Action",
    label: "Action",
    sortable: false,
  },
];

const Records = () => {
  const petCollectionRef = collection(db, "pets");
  const petQuery = query(petCollectionRef, orderBy("createdAt", "desc"));
  const navigate = useNavigate();
  const [pets, loading] = useCollection(petQuery);
  const [petDetails, setPetDetails] = useState([]);
  const [openPets, setOpenPets] = useState(false);
  const [filteredPetDetails, setFilteredPetDetails] = useState([]);
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
      const q = query(petCollectionRef, orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const result = [];

        querySnapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setPetDetails(result);
        setFilteredPetDetails(result);
      });
      return unsubscribe;
    }

    getUsers();
  }, []);

  console.log(pets);
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
    const filtered = petDetails.filter((pets) =>
      `${pets?.nickname}`
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    );
    if (event.target.value != "") {
      setPetDetails(filtered);
    } else {
      setPetDetails(filteredPetDetails);
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - petDetails.length) : 0;

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
            <h1 className="font-bold">List of Pets</h1>
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
                      {stableSort(petDetails, getComparator(order, tbOrderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((pets, index) => {
                          return (
                            <TableRow key={index} tabIndex={-1} hover>
                              <TableCell>
                                <h1>
                                  {" "}
                                  <img
                                    className="img-avatar w-10 h-10 mr-2 img-avatar-thumb"
                                    src={
                                      pets.petProfilePic
                                        ? pets.petProfilePic
                                        : PawLogo
                                    }
                                  />
                                  {pets.nickname}
                                </h1>
                              </TableCell>
                              <TableCell>
                                {moment().diff(
                                  moment(pets.birthDate?.toDate()),
                                  "year"
                                )}
                              </TableCell>
                              <TableCell>{pets.gender}</TableCell>
                              <TableCell>{pets.animalType}</TableCell>
                              <TableCell>
                                {pets.weight ? pets.weight + "kg" : "0kg"}
                              </TableCell>
                              <TableCell>{pets.breed}</TableCell>

                              <TableCell>
                                <div className="d-flex justify-content-center">
                                  <Link
                                    to={`/PetRoute/${pets.id}`}
                                    className="text-white bg-primary p-2 rounded-lg"
                                    data-toggle="modal"
                                    data-target="#edit_user_modal"
                                  >
                                    Records
                                  </Link>
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
                count={petDetails.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Records;
