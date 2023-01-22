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

const UserAddGroom = ({ open, close, data }) => {
  const { user, loading } = useAuth();
  const [appointDate, setAppointDate] = useState();

  const markGroomAsCompleted = async (e) => {
    e.preventDefault();
    if (window.confirm("Confirm to add this details?")) {
      addDoc(collection(db, "groom_records"), {
        petId: data,
        doctorsInfo: user.firstname,
        dateGroomed: appointDate,
        createdAt: serverTimestamp(),
      });
      window.location.reload();
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle className="d-flex justify-content-between">
        <h1>Add Groom Details</h1>
        <li className="fa fa-close cursor-pointer" onClick={close}></li>
      </DialogTitle>
      <DialogContent>
        <form sx={{ height: "10px" }} onSubmit={markGroomAsCompleted}>
          <Box sx={{ paddingTop: 3 }}>
            <FormControl fullWidth margin="normal">
              <input
                type="date"
                id="weight"
                label="Weight"
                name="weight"
                className="border p-4"
                InputLabelProps={{ shrink: true }}
                value={appointDate}
                onChange={(e) => setAppointDate(e.target.value)}
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

export default UserAddGroom;
