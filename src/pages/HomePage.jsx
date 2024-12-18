import React from "react";
import Header from "../layout/Header";
import HeroSlider from "../components/HeroSlider";
import Footer from "../layout/Footer";
import ProductCategoryList from "../components/ProductCategoryList";
import CategoryPick from "../components/CategoryPick";
import { useHistory } from "react-router-dom";

const HomePage = () => {


  

  return (
    <div className="">
      <Header />
      <HeroSlider />
      {/* <CategoryPick/>
      <ProductCategoryList />
      <Footer/> */}
    </div>
  );
};

export default HomePage;