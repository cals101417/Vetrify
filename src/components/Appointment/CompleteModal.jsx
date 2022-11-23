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
  const [input, setInput] = useState(() =>
    data.petIds.reduce((acc, curr) => {
      acc[curr] = {
        symptoms: "",
        weight: "",
        physical_exam: "",
        diagnosis: "",
      };
      return acc;
    }, {})
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="md">
      <DialogTitle>Complete Appointment</DialogTitle>
      <DialogContent>
        <form sx={{ height: "10px" }} onSubmit={handleSubmit}>
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
                      name="symptoms"
                      value={input[pet_id].symptoms}
                      onChange={(event) => handleChange(pet_id, event)}
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
                    />
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
                      maxRows={4}
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
                      maxRows={4}
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
