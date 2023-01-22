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
import moment from "moment/moment";

const UserAddMedicalModal = ({ open, close, data }) => {
  const { user, loading } = useAuth();
  const medicalHistoryRef = collection(db, "medical_records");
  const [type, setType] = useState();
  const [symptoms, setSymptoms] = useState();
  const [weight, setWeight] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [physicalExam, setPhysicalExam] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Confirm to Submit details?")) {
      await addDoc(medicalHistoryRef, {
        petId: data,
        doctorsInfo: user.firstname,
        addedRecord: 1,
        symptoms: symptoms,
        weight: weight,
        description: description,
        diagnosis: diagnosis,
        status: status,
        physical_exam: physicalExam,
        type: type,
        dateCompleted: moment().format("MMM dd, yyyy"),
        createdAt: serverTimestamp(),
      });
      window.location.reload();
    }
  };
  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle className="d-flex justify-content-between">
        <h1>Edit Surgery/Checkup Details</h1>
        <li className="fa fa-close cursor-pointer" onClick={close}></li>
      </DialogTitle>
      <DialogContent>
        <form sx={{ height: "10px" }} onSubmit={handleSubmit}>
          <Box sx={{ paddingTop: 3 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="symptoms">Symptoms</InputLabel>
              <Select
                labelId="symptoms"
                id="symptoms-select"
                label="Symptoms"
                name="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
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
                InputLabelProps={{ shrink: true }}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
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
                InputLabelProps={{ shrink: true }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
                id="purpose"
                label="Purpose"
                name="purpose"
                InputLabelProps={{ shrink: true }}
                value={type}
                onChange={(e) => setType(e.target.value)}
                inputProps={{ required: true }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="physical_exam"
                label="Physical Examinations"
                multiline
                InputLabelProps={{ shrink: true }}
                name="physical_exam"
                value={physicalExam}
                onChange={(e) => setPhysicalExam(e.target.value)}
                rows={5}
                inputProps={{ required: true }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="diagnosis"
                label="Diagnosis"
                name="diagnosis"
                InputLabelProps={{ shrink: true }}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
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
                InputLabelProps={{ shrink: true }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={5}
                inputProps={{ required: true }}
              />
            </FormControl>
          </Box>
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

export default UserAddMedicalModal;
