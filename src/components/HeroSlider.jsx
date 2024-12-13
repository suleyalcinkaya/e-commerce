import React from "react";

const HeroSlider = () => {
  return (
    <div className=" justify-items-center bg-hero bg-no-repeat bg-cover bg-full p-48 rounded-lg  ">
      <h2 className="text-center text-sm text-white"> SUMMER 2024</h2>
      <h1 className="text-center text-2xl font-bold text-white mt-4">NEW COLLECTION</h1>
      <p className="text-center text-sm text-white min-w-44 mt-4 ">
        We know how large objects will act, but things on a small scale.
      </p>
      <button className="self-center mt-4 min-w-32 px-4 py-2 bg-green-600 text-white font-bold rounded-lg ">
        SHOP NOW
      </button>
     
    </div>
  );
};

export default HeroSlider;