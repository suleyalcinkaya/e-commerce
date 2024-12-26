import React from "react";
import PrimaryButton from "./PrimaryButton";
import { Link } from 'react-router-dom'; 

const HeroSlider = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6 flex-shrink-0 overflow-hidden bg-hero bg-cover bg-center bg-no-repeat text-white text-center">
      <h2 className="text-[3rem] text-white">SUMMER 2024</h2>
      <h1 className="text-[6rem] font-bold text-white">NEW <br /> COLLECTION</h1>
      <p className="text-[3rem] text-white min-w-44 max-w-[70%]">
        We know how large objects will act, but things on a small scale.
      </p>
      <Link to="/shop">
        <PrimaryButton> 
          SHOP NOW 
        </PrimaryButton>
      </Link>
    </div>
  );
};

export default HeroSlider;