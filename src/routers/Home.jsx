import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import HeroImageCard from "../components/HeroImage";
import KeyFeaturesCard from "../components/KeyFeatures";

function HomePage() {
  return (
    <>
      <NavBar />
      <HeroImageCard />
      <KeyFeaturesCard />
    </>
  );
}

export default HomePage;
