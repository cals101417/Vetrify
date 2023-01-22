import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../auth/firebase";
import { useAuth } from "../../auth/context/UserAuthContext";

const CompleteModal = ({ open, close, data, pets_data }) => {
  const { user, loading } = useAuth();
  const [input, setInput] = useState(() =>
    data.petIds.reduce((acc, curr) => {
      const pet = pets_data.docs.find((p) => p.id === curr);
      acc[curr] = {
        symptoms: "",
        weight: pet.data().weight || 0,
        physical_exam: "",
        diagnosis: "",
        status: "Healthy",
        description: "",
      };
      return acc;
    }, {})
  );

  const medicalHistoryRef = collection(db, "medical_records");

  const handleChange = (id, event) => {
    setInput((e) => {
      return {
        ...e,
        [id]: {
          ...e[id],
          [event.target.name]: event.target.value,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promisesRecords = Object.entries(input).map(([key, val]) =>
      addDoc(medicalHistoryRef, {
        petId: key,
        doctorsInfo: user.firstname,
        appointment_id: data.id,
        symptoms: val?.symptoms || "",
        description: val?.description || "",
        weight: val?.weight || "",
        diagnosis: val?.diagnosis || "",
        status: val?.status || "",
        physical_exam: val?.physical_exam || "",
        type: data.purpose,
        dateCompleted: data.day,
        createdAt: serverTimestamp(),
      })
    );
    const promisesPets = Object.entries(input).map(([key, val]) => {
      const docRef = doc(db, "pets", key);
      return updateDoc(docRef, {
        status: val.status,
        weight: val.weight,
      });
    });

    await Promise.all([...promisesRecords, ...promisesPets]);

    const aptRef = doc(db, "appointments", data.id);
    await updateDoc(aptRef, {
      status: "Completed",
    });
    close();
  };
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="md">
      <DialogTitle className="d-flex justify-content-between">
        <h1>Complete Appointment</h1>
        <li className="fa fa-close cursor-pointer" onClick={handleReload}></li>
      </DialogTitle>
      <DialogContent>
        <form sx={{ height: "10px" }} onSubmit={handleSubmit}>
          {data?.petIds?.map((pet_id) => {
            const pet = pets_data.docs.find((e) => e.id === pet_id);
            return (
              <>
                <Box key={pet_id} sx={{ paddingTop: 3 }}>
                  <div className="row align-items-center">
                    <img
                      className="img-avatar img-avatar-thumb h-14 w-14 ml-20 mr-20"
                      src={pet.data().petProfilePic}
                    />
                    <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                      {pet.data().nickname}
                    </Typography>
                  </div>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="symptoms">Symptoms</InputLabel>
                    <Select
                      labelId="symptoms"
                      id="symptoms-select"
                      label="Symptoms"
                      name="symptoms"
                      value={input[pet_id].symptoms}
                      onChange={(event) => handleChange(pet_id, event)}
                      inputProps={{ required: true }}
                    >
                      <MenuItem value="Vomiting">Vomiting</MenuItem>
                      <MenuItem value="Defecation">Defecation</MenuItem>
                      <MenuItem value="Urination">Urination</MenuItem>
                      <MenuItem value="Coughing">Coughing</MenuItem>
                      <MenuItem value="Sneezing">Sneezing</MenuItem>
                      <MenuItem value="Skin lesions">Skin lesions</MenuItem>
                      <MenuItem value="Dehydration">Dehydration</MenuItem>
                      <MenuItem value="Fever">Fever</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      type="number"
                      label="Weight"
                      name="weight"
                      value={input[pet_id].weight}
                      onChange={(event) => handleChange(pet_id, event)}
                      inputProps={{ required: true }}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="pet-status">Pet Status</InputLabel>
                    <Select
                      labelId="pet-status"
                      id="pet-status-select"
                      label="pet-status"
                      name="status"
                      value={input[pet_id].status}
                      onChange={(event) => handleChange(pet_id, event)}
                      inputProps={{ required: true }}
                    >
                      <MenuItem value="Healthy">Healthy</MenuItem>
                      <MenuItem value="Sick">Sick</MenuItem>
                      <MenuItem value="Further Examination">
                        Further Examination
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      id="physical_exam"
                      label="Physical Examinations"
                      multiline
                      name="physical_exam"
                      value={input[pet_id].physical_exam}
                      onChange={(event) => handleChange(pet_id, event)}
                      rows={5}
                      inputProps={{ required: true }}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      id="diagnosis"
                      label="Diagnosis"
                      name="diagnosis"
                      value={input[pet_id].diagnosis}
                      onChange={(event) => handleChange(pet_id, event)}
                      multiline
                      rows={5}
                      inputProps={{ required: true }}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      id="description"
                      label="description"
                      name="description"
                      value={input[pet_id].description}
                      onChange={(event) => handleChange(pet_id, event)}
                      multiline
                      rows={5}
                      inputProps={{ required: true }}
                    />
                  </FormControl>
                </Box>
              </>
            );
          })}
          <div className="d-flex justify-content-center py-20">
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "40%", fontSize: 14 }}
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteModal;
