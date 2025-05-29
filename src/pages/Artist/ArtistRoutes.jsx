import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ArtistHome from "./ArtistHome";
import ArtistAbout from "./ArtistAbout";
import ArtistWork from "./ArtistWork";
import ArtistContact from "./ArtistContact";

const ArtistRoutes = () => {
  const location = useLocation();
  
  // Debug: Log current location
  console.log("Current location:", location.pathname);
  
  return (
    <Routes>
      <Route index element={<ArtistHome />} />
      <Route path="about" element={<ArtistAbout />} />
      <Route path="work" element={<ArtistWork />} />
      <Route path="contact" element={<ArtistContact />} />
    </Routes>
  );
};

export default ArtistRoutes;