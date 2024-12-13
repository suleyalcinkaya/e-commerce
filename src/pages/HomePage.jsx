import React from "react";
import Header from "../layout/Header";
import HeroSlider from "../components/HeroSlider";
import Footer from "../layout/Footer"
import ProductCategoryList from "../components/ProductCategoryList";
import CategoryPick from "../components/CategoryPick";


const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSlider />
      <CategoryPick/>
      <ProductCategoryList />
      <Footer/>
    </div>
  );
};

export default HomePage;