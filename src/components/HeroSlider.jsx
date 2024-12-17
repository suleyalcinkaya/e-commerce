import PrimaryButton from "./PrimaryButton";

const HeroSlider = () => {
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center gap-6 flex-shrink-0 overflow-hidden bg-hero bg-cover bg-center bg-no-repeat text-white text-center">

      <h2 className=" text-[3rem] text-white">SUMMER 2024</h2>
      <h1 className="text-[6rem] font-bold text-white">NEW <br /> COLLECTION</h1>
      <p className=" text-[3rem] text-white min-w-44 max-w-[70%]
">
        We know how large objects will act, but things on a small scale.
      </p>
      <PrimaryButton>
        SHOP NOW
      </PrimaryButton>
    </div>
  );
};

export default HeroSlider;