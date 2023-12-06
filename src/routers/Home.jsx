import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import HeroImageCard from "../components/HeroImage";
import KeyFeaturesCard from "../components/KeyFeatures";
import { useGlobalStore } from "@/common/useGlobalStore.jsx";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const symmetricKey = useGlobalStore((state) => state.symmetricKey);

  useEffect(() => {
    if(symmetricKey) {
      if(!location.state || !location.state.from || location.state.from !== "navbar") {
        navigate("/dashboard");
      }
    }
  }, [symmetricKey]);

  return (
    <>
      <NavBar />
      <HeroImageCard />
      <KeyFeaturesCard />
    </>
  );
}

export default HomePage;
