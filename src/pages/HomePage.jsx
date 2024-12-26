// Import necessary libraries and components
import React from 'react';
import Header from '../layout/Header';
import HeroSlider from '../components/HeroSlider';
// import Footer from '../components/Footer';
//import ProductCategoryList from '../components/ProductCategoryList';
import CategoryPick from '../components/CategoryPick';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductSlider from '../components/ProductSlider';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className='home-page'>
            
            <header className='home-header'>
                <Header />
            </header>
            <main className='product-showcase'>
                <HeroSlider />
                <CategoryPick />
                
                <FeaturedProducts />
                <ProductSlider />
            </main>
            <footer className='home-footer'>
                {/* <Footer /> */}
                <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;