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

const EditVaccineModal = ({ open, close, data }) => {
  const [weight, setWeight] = useState();
  const [vaccineType, setVaccineType] = useState();
  const [vaccineBrand, setVaccineBrand] = useState();
  const [treatment, setTreatment] = useState();
  const [doctorsNotation, setDoctorsNotation] = useState();

  const handleSumit = async (e) => {
    e.preventDefault();
    if (window.confirm("Confirm to Submit edited details?")) {
      await updateDoc(doc(db, "vaccine_records", data.id), {
        weight: weight ? weight : data.data().weight,
        vaccineType: vaccineType ? vaccineType : data.data().vaccineType,
        vaccineBrand: vaccineBrand ? vaccineBrand : data.data().vaccineBrand,
        treatment: treatment ? treatment : data.data().treatment,
        doctorsNotation: doctorsNotation
          ? doctorsNotation
          : data.data().doctorsNotation,
      });
      window.location.reload();
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle className="d-flex justify-content-between">
        <h1>Edit Vaccine Details</h1>
        <li className="fa fa-close cursor-pointer" onClick={close}></li>
      </DialogTitle>
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
                value={vaccineType ? vaccineType : data.data().vaccineType}
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
            <FormControl fullWidth margin="normal">
              <TextField
                id="treatment"
                label="Treatment"
                InputLabelProps={{ shrink: true }}
                name="treatment"
                value={treatment ? treatment : data.data().treatment}
                onChange={(e) => setTreatment(e.target.value)}
                inputProps={{ required: true }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <div className="d-flex  justify-content-between">
                <TextField
                  id="weight"
                  label="Weight"
                  InputLabelProps={{ shrink: true }}
                  name="weight"
                  value={weight ? weight : data.data().weight}
                  onChange={(e) => setWeight(e.target.value)}
                  sx={{ width: "45%" }}
                  inputProps={{ required: true }}
                />
                <TextField
                  id="vaccine_brand"
                  label="Vaccine Brand"
                  InputLabelProps={{ shrink: true }}
                  name="vaccine_brand"
                  value={vaccineBrand ? vaccineBrand : data.data().vaccineBrand}
                  sx={{ width: "45%" }}
                  onChange={(e) => setVaccineBrand(e.target.value)}
                  inputProps={{ required: true }}
                />
              </div>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="doctor_notation"
                name="doctor_notation"
                label="Doctors Notation"
                InputLabelProps={{ shrink: true }}
                value={
                  doctorsNotation
                    ? doctorsNotation
                    : data.data().doctorsNotation
                }
                onChange={(e) => setDoctorsNotation(e.target.value)}
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

export default EditVaccineModal;
