import React from "react";
import Header from "../layout/Header";
import HeroSlider from "../components/HeroSlider";
//import Footer from "../components/Footer";
import ProductCategoryList from "../components/ProductCategoryList";
import CategoryPick from "../components/CategoryPick";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductSlider from "../components/ProductSlider";
import { useHistory } from "react-router-dom";

const HomePage = () => {

  

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSlider />
      <CategoryPick/>
      <ProductCategoryList />
      <FeaturedProducts />
      <ProductSlider />
      
    </div>
  );
};

export default HomePage;