import React from "react";
import { Route, Routes } from "react-router-dom";
import Pets from "./Pets";
const PetRoute = () => {
  return (
    <Routes>
      <Route path=":petID" element={<Pets />} />
    </Routes>
  );
};

export default PetRoute;
