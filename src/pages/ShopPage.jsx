
    
import React, { useEffect } from 'react';
import Header from '../layout/Header';
import ProductCategoryList from '@/components/ProductCategoryList';

//import ProductGrid from '../components/ProductGrid'; // Main product grid
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList, setFetchState, setLimit, setOffset, setTotal } from '../store/actions/productActions';
import { useParams, Link } from 'react-router-dom';

function createSlug(name) {
    return name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
  }

const ShopPage = () => {
    const dispatch = useDispatch();
    const {productList, fetchState, total, limit, offset} = useSelector((state) => state.product);
    const products = productList || [];
    const { gender, categoryName, categoryId } = useParams();
    useEffect(() => {
        dispatch(setOffset(0));
        
      }, [dispatch, categoryId, categoryName, gender]);
    useEffect(() => {
        dispatch(fetchProductList({ category: categoryId }));
      }, [dispatch, categoryId,limit, offset, gender]);


    return (
        <div className='shop-page'>
            {/* Header Section */}
            <header className='shop-header'>
                <Header />
            </header>

            {/* Main Content Section */}
            <div className='shop-container' style={{ display: 'flex', flexDirection: 'row' }}>
                {/* Sidebar 
                <aside className='shop-sidebar' style={{ width: '20%', borderRight: '1px solid #ddd' }}>
                    <Sidebar />
                </aside> */}


            </div>

            <ProductCategoryList />
            <div
            className={
              'grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }
          >
            {products.map((product, ind) => {
              const slug = createSlug(product.name);
              const productUrl = `/shop/${gender || 'erkek'}/${categoryName || 'category'}/${categoryId || '0'}/${slug}/${product.id}`;
              return (
                <div 
                key={ind}
                className={`border border-gray-200 rounded p-4 flex min-h-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-gray-500 flex-col text-center`}
              >
                <Link to={productUrl} className="cursor-pointer">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Product Image ${index}`}
                      className={'w-32 h-40 object-cover rounded'}
                    />
                  ))}
                </Link>

                <div className={'gap-2 justify-center items-start text-left flex flex-col'}>
                  <Link to={productUrl} className="cursor-pointer">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{product.description}</p>
                    <div className={'justify-center flex items-center space-x-2 mb-2'}>
                      <span className="text-sm text-green-600 font-semibold">₺{product.price}</span>
                      <span className="text-xs text-gray-400">Stock: {product.stock}</span>
                    </div>
                    <div className={'justify-center flex space-x-1 gap-2'}>
                      <span className="text-yellow-500">
                        {"★".repeat(Math.round(product.rating))}
                        {"☆".repeat(5 - Math.round(product.rating))}
                      </span>
                      <span className='text-gray-700 font-semibold'>
                        {product.rating}
                      </span>
                    </div>
                  </Link>

                  <button
                
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>


            {/* Footer Section */}
            <footer className='shop-footer' style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ShopPage;