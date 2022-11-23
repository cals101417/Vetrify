import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CompleteModal = ({ open, close, data, pets_data }) => {
  console.log({ data });
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="md">
      <DialogTitle>Complete Appointment</DialogTitle>
      <DialogContent>
        <form sx={{ height: "10px" }}>
          {data?.petIds?.map((pet_id) => {
            const pet = pets_data.docs.find((e) => e.id === pet_id);
            console.log(pet.data().nickname);
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
                    <TextField type="number" label="Weight" />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      id="physical_exam"
                      label="Physical Examinations"
                      multiline
                      rows={5}
                      maxRows={4}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      id="physical_exam"
                      label="Diagnosis"
                      multiline
                      rows={5}
                      maxRows={4}
                    />
                  </FormControl>
                </Box>
              </>
            );
          })}
          <div className="d-flex justify-content-center py-20">
            <Button variant="contained" sx={{ width: "40%", fontSize: 14 }}>
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteModal;
