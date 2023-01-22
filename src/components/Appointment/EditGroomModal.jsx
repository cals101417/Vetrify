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

const EditGroomModal = ({ open, close, data }) => {
  const [appointDate, setAppointDate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Confirm to Submit edited details?")) {
      const aptRef = doc(db, "groom_records", data.id);
      await updateDoc(aptRef, {
        dateGroomed: appointDate ? appointDate : data.data().dateGroomed,
      });
      window.location.reload();
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle className="d-flex justify-content-between">
        <h1>Edit Groom Date</h1>
        <li className="fa fa-close cursor-pointer" onClick={close}></li>
      </DialogTitle>
      <DialogContent>
        <form sx={{ height: "10px" }} onSubmit={handleSubmit}>
          <Box sx={{ paddingTop: 3 }}>
            <FormControl fullWidth margin="normal">
              <input
                type="date"
                id="weight"
                label="Weight"
                name="weight"
                className="border p-4"
                InputLabelProps={{ shrink: true }}
                value={appointDate ? appointDate : data.data().dateGroomed}
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

export default EditGroomModal;
