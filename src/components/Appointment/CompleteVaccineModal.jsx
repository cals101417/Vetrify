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

const CompleteVaccineModal = ({ open, close, data }) => {
  const [vaccineType, setVaccineType] = useState();

  const handleSumit = async (e) => {
    e.preventDefault();
    console.log(data.id);
    console.log(vaccineType);

    if (window.confirm("Are you Sure to Complete this Appointment?")) {
      const aptPets = data.petIds.map((petId) => {
        return addDoc(collection(db, "vaccine_records"), {
          petId,
          dateComplete: data.day,
          vaccineType: vaccineType,
          appointment_id: data.id,
          createdAt: serverTimestamp(),
        });
      });

      await Promise.all(aptPets);
      await updateDoc(doc(db, "appointments", data.id), {
        status: "Completed",
      });
      window.location.reload();
    }
  };
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle>Complete Appointment</DialogTitle>
      <DialogContent>
        <form sx={{ height: "10px" }} onSubmit={handleSumit}>
          <Box sx={{ paddingTop: 3 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="symptoms">Select Type of Vaccine</InputLabel>
              <Select
                labelId="symptoms"
                id="symptoms-select"
                label="Select Type of Vaccine"
                name="vaccine_type"
                value={vaccineType}
                onChange={(e) => setVaccineType(e.target.value)}
                inputProps={{ required: true }}
              >
                <MenuItem value="Bordetella Bronchiseptica">
                  Bordetella Bronchiseptica
                </MenuItem>
                <MenuItem value="Canine Distemper">Canine Distemper</MenuItem>
                <MenuItem value="Canine Hepatitis">Canine Hepatitis</MenuItem>
                <MenuItem value="Canine Parainfluenza">
                  Canine Parainfluenza
                </MenuItem>
                <MenuItem value="Heartworm">Heartworm</MenuItem>
                <MenuItem value="Kennel Cough">Kennel Cough</MenuItem>
                <MenuItem value="Leptospirosis">Leptospirosis</MenuItem>
                <MenuItem value="Lyme Disease">Lyme Disease</MenuItem>
                <MenuItem value="Parvovirus">Parvovirus</MenuItem>
                <MenuItem value="Anti Rabies">Anti Rabies</MenuItem>
              </Select>
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

export default CompleteVaccineModal;
