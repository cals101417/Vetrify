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
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { useAuth } from "../../auth/context/UserAuthContext";

const EditSurgeryModal = ({ open, close, data }) => {
  const { user, loading } = useAuth();
  const [symptoms, setSymptoms] = useState();
  const [weight, setWeight] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [physicalExam, setPhysicalExam] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Confirm to Submit edited details?")) {
      const aptRef = doc(db, "medical_records", data.id);
      await updateDoc(aptRef, {
        symptoms: symptoms ? symptoms : data.data().symptoms,
        weight: weight ? weight : data.data().weight,
        description: description ? description : data.data().description,
        diagnosis: diagnosis ? diagnosis : data.data().diagnosis,
        status: status ? status : data.data().status,
        physical_exam: physicalExam ? physicalExam : data.data().physical_exam,
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
                value={symptoms ? symptoms : data.data().symptoms}
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
                value={weight ? weight : data.data().weight}
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
                value={status ? status : data.data().status}
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
                id="physical_exam"
                label="Physical Examinations"
                multiline
                InputLabelProps={{ shrink: true }}
                name="physical_exam"
                value={physicalExam ? physicalExam : data.data().physical_exam}
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
                value={diagnosis ? diagnosis : data.data().diagnosis}
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
                value={description ? description : data.data().description}
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

export default EditSurgeryModal;
