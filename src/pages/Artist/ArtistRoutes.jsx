import React from "react";
import { Routes, Route } from "react-router-dom";
import ArtistHome from "./ArtistHome";
import ArtistAbout from "./ArtistAbout";
import ArtistWork from "./ArtistWork";
import ArtistContact from "./ArtistContact";

const ArtistRoutes = () => {
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