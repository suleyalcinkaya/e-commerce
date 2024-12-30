import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../store/actions/categoryActions';

function CategoryList() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(state => state.product);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Sort categories by rating and get top 5
  const topCategories = categories && categories.length > 0 
    ? [...categories]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)
    : [];

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-48"></div>;
  }

  return (
    <div className="bg-white shadow-md">
      {/* Top 5 Categories Banner */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Top Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topCategories.map(category => (
            <Link 
              key={category.id}
              to={`/shop/${category.gender}/${category.title.toLowerCase()}/${category.id}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{category.title}</h3>
                    <div className="flex items-center text-white/90">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{category.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-white/80 capitalize">{category.gender}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dropdown Menu for All Categories */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-2">
          <div className="relative group inline-block">
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center">
              <span>All Categories</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute hidden group-hover:block w-64 bg-white shadow-lg rounded-md mt-1 py-2 z-50">
              {categories && categories.map(category => (
                <Link 
                  key={category.id}
                  to={`/shop/${category.gender}/${category.title.toLowerCase()}/${category.id}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <div className="flex justify-between items-center">
                    <span>{category.title}</span>
                    <span className="text-sm text-gray-500 capitalize">{category.gender}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryList; 