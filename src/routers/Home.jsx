import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import HeroImageCard from "../components/HeroImage";
import KeyFeaturesCard from "../components/KeyFeatures";
import SecurityStaregyCard from "../components/SecurityStrategy";

function HomePage() {
  return (
    <>
      <NavBar />
      <HeroImageCard />
      <KeyFeaturesCard />
      <SecurityStaregyCard />
    </>
  );
}

export default HomePage;
