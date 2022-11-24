import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { addDoc, collection, doc, getDoc, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../auth/firebase";
import Moment from "react-moment";
import CompleteModal from "../components/Appointment/CompleteModal";
import moment from "moment/moment";
import axiosInstance from "../utils/axiosConfig";

function Appointments () {
	const [open, setOpen] = useState(false);
	const [selectedApprove, setSelectedApprove] = useState(null);

	const appointmentsCollectionRef = collection(db, "appointments");
	const petsCollectionRef = collection(db, "pets");
	const appointmentsQuery = query(
		appointmentsCollectionRef,
		where("status", "!=", "Deleted")
	);
	const [appointments, loadingAppoint] = useCollection(appointmentsQuery);
	const [pets] = useCollection(petsCollectionRef);

	const handleOpen = async (apt) => {
		setSelectedApprove({ ...apt.data(), id: apt.id });
		if (apt.data().purpose === "Groom") {
			markGroomAsCompleted(apt);
		} else if (apt.data().purpose === "Vaccine") {
			// setVaccineOpen(true);
		} else {
			setOpen(true);
		}
	};
	const handleClose = () => {
		setOpen(false);
	};

	const markGroomAsCompleted = async (apt) => {
		if (window.confirm("Mark Groom as Done?")) {
			const aptPets = apt.data().petIds.map(petId => {
				return addDoc(collection(db, "groom_records"), {
					petId,
					dateGroomed: apt.data().day,
					createdAt: serverTimestamp()
				});
			});
			await Promise.all(aptPets);
			await updateDoc(doc(db, "appointments", apt.id), {
				status: "Completed",
			});
		}
	}


	// approved appointment
	const approveClick = async (appoint) => {
		const updateAppointmentRef = doc(db, "appointments", appoint.id);
		const userRef = doc(db, "users", appoint.data().userId);
		if (window.confirm("Are you sure to Approve this appointment?")) {
			const user = await getDoc(userRef);
			await updateDoc(updateAppointmentRef, {
				status: "Approved",
			});
			if (user.exists && user.data()?.pushToken) {
				await axiosInstance.post("/send/notification", {
					"to": user.data()?.pushToken,
					"title": "Booking Has been Approved",
					"body": `Your appointment at ${moment(appoint.data().day).format("LL")} - ${appoint.data().time} has been approved.`
				});
			}
		}
	};

	// decline appointment
	const declineClick = async (apt) => {
		const cancelAppointmentRef = doc(db, "appointments", apt.id);
		const userRef = doc(db, "users", apt.data().userId);
		if (window.confirm("Are you sure to Cancel this appointment?")) {
			const user = await getDoc(userRef);
			await updateDoc(cancelAppointmentRef, {
				status: "Cancelled",
			});
			if (user.exists && user.data()?.pushToken) {
				await axiosInstance.post("/send/notification", {
					"to": user.data()?.pushToken,
					"title": "Booking Has been Cancelled",
					"body": `Your appointment at ${moment(apt.data().day).format("LL")} - ${apt.data().time} has been cancelled.`
				});
			}
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
					<div className="bg-dark">
						<div className="bg-image bg-image-middle bg-gradient-to-r from-cyan-900 to-blue-500">
							<div className="content content-top text-center ">
								<div className="py-30">
									<h1 className="font-w700 text-3xl text-white mb-10">
										Appointments
									</h1>
								</div>
							</div>
						</div>
					</div>
					<div className="content">
						<div className="table-responsive pb-10">
							<div className="block-content">
								<div id="accordion" role="tablist" aria-multiselectable="true">
									<div className="block block-bordered block-rounded mb-2">
										<div
											className="block-header bg-primary text-white"
											role="tab"
											id="accordion_h1"
										>
											<a
												className="font-w600"
												data-toggle="collapse"
												data-parent="#accordion"
												href="#accordion_q1"
												aria-expanded="true"
												aria-controls="accordion_q1"
											>
												Pending Appointments
											</a>
										</div>
										<div
											id="accordion_q1"
											className="collapse show"
											role="tabpanel"
											aria-labelledby="accordion_h1"
											data-parent="#accordion"
										>
											<div className="block-content">
												<table
													className="table table-striped table-vcenter table-md"
													id="appointment_table"
												>
													<thead>
														<tr>
															<th>#</th>
															<th>Name</th>
															<th>Purpose</th>
															<th>Description</th>
															<th>Date & Time</th>
															<th>Status</th>
															<th>Action</th>
														</tr>
													</thead>
													<tbody>
														{loadingAppoint ? (
															<tr>
																<td colSpan={5} className="text-center">
																	loading...
																</td>
															</tr>
														) : (
															appointments.docs.map((doc) => {
																if (doc.data().status === "Pending") {
																	let count = 0;
																	return (
																		<>
																			<tr key={doc.data().userId}>
																				<td>{count + 1}</td>
																				<td>{doc.data().fullname}</td>
																				<td>{doc.data().purpose}</td>
																				<td>
																					{doc.data().description
																						? doc.data().description
																						: "No description added"}
																				</td>
																				<td>
																					<Moment format="MMM DD">
																						{doc.data().day}
																					</Moment>
																					{", "}
																					{doc.data().time}
																				</td>
																				<td>{doc.data().status}</td>
																				<td>
																					{doc.data().status == "Pending" ? (
																						<div className="flex gap-3">
																							<i
																								className="cursor-pointer fa fa-check bg-green-600 text-white p-2"
																								onClick={() =>
																									approveClick(doc)
																								}
																							></i>
																							<i
																								className="cursor-pointer fa fa-close bg-red-600 text-white p-2"
																								onClick={() =>
																									declineClick(doc)
																								}
																							></i>
																						</div>
																					) : (
																						""
																					)}
																				</td>
																			</tr>
																		</>
																	);
																}
															})
														)}
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className="block block-bordered block-rounded mb-2">
										<div
											className="block-header bg-primary text-white"
											role="tab"
											id="accordion_h2"
										>
											<a
												className="font-w600"
												data-toggle="collapse"
												data-parent="#accordion"
												href="#accordion_q2"
												aria-expanded="true"
												aria-controls="accordion_q2"
											>
												Approved Appointments
											</a>
										</div>
										<div
											id="accordion_q2"
											className="collapse "
											role="tabpanel"
											aria-labelledby="accordion_h2"
											data-parent="#accordion"
										>
											<div className="block-content">
												<table
													className="table table-striped table-vcenter table-md"
													id="appointment_table"
												>
													<thead>
														<tr>
															<th>#</th>
															<th>Name</th>
															<th>Purpose</th>
															<th>Description</th>
															<th>Date</th>
															<th>Time</th>
															<th>Status</th>
															<th>Action</th>
														</tr>
													</thead>
													<tbody>
														{loadingAppoint ? (
															<tr>
																<td colSpan={5} className="text-center">
																	loading...
																</td>
															</tr>
														) : (
															appointments.docs.map((doc) => {
																if (doc.data().status === "Approved") {
																	let count = 0;
																	return (
																		<>
																			<tr key={doc.id}>
																				<td>{count + 1}</td>
																				<td>{doc.data().fullname}</td>
																				<td>{doc.data().purpose}</td>
																				<td>
																					{doc.data().description
																						? doc.data().description
																						: "No description added"}
																				</td>
																				<td>
																					<Moment format="MMMM DD">
																						{doc.data().day}
																					</Moment>
																					{doc.data().time}
																				</td>
																				<td>{doc.data().time}</td>
																				<td>{doc.data().status}</td>
																				<td>
																					<div
																						className="flex gap-3"
																						style={{ cursor: "pointer" }}
																						onClick={() =>
																							handleOpen(doc)
																						}
																					>
																						<h1 className="bg-green-600 text-white p-2 px-3">
																							Mark as Complete
																						</h1>
																						<i
																							className="cursor-pointer fa fa-close bg-red-600 text-white p-2"
																							onClick={() =>
																								declineClick(doc)
																							}
																						></i>
																					</div>
																				</td>
																			</tr>
																		</>
																	);
																}
															})
														)}
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className="block block-bordered block-rounded mb-2">
										<div
											className="block-header bg-primary text-white"
											role="tab"
											id="accordion_h3"
										>
											<a
												className="font-w600"
												data-toggle="collapse"
												data-parent="#accordion"
												href="#accordion_q3"
												aria-expanded="true"
												aria-controls="accordion_q3"
											>
												Completed Appointments
											</a>
										</div>
										<div
											id="accordion_q3"
											className="collapse"
											role="tabpanel"
											aria-labelledby="accordion_h3"
											data-parent="#accordion"
										>
											<div className="block-content">
												<table
													className="table table-striped table-vcenter table-md"
													id="appointment_table"
												>
													<thead>
														<tr>
															<th>#</th>
															<th>Name</th>
															<th>Purpose</th>
															<th>Description</th>
															<th>Date</th>
															<th>Time</th>
															<th>Status</th>
															<th>Action</th>
														</tr>
													</thead>
													<tbody>
														{loadingAppoint ? (
															<tr>
																<td colSpan={5} className="text-center">
																	loading...
																</td>
															</tr>
														) : (
															appointments.docs.map((doc, index) => {
																if (doc.data().status === "Approved") {
																	let count = 0;
																	return (
																		<>
																			<tr key={doc.id}>
																				<td>{count + 1}</td>
																				<td>{doc.data().fullname}</td>
																				<td>{doc.data().purpose}</td>
																				<td>
																					{doc.data().description
																						? doc.data().description
																						: "No description added"}
																				</td>
																				<td>
																					<Moment format="MMMM DD">
																						{doc.data().day}
																					</Moment>
																					{doc.data().time}
																				</td>
																				<td>{doc.data().time}</td>
																				<td>{doc.data().status}</td>
																				<td>
																					<div className="flex gap-3">
																						<h1 className="bg-green-600 text-white p-2 px-3">
																							Mark as Complete
																						</h1>
																					</div>
																				</td>
																			</tr>
																		</>
																	);
																}
															})
														)}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
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
		</>
	);
}

export default Appointments;
