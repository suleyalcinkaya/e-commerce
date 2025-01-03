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
                {/* Default image if category.image is not available */}
                <img 
                  src={category.image || `https://via.placeholder.com/400x300?text=${category.title}`}
                  alt={category.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = `https://via.placeholder.com/400x300?text=${category.title}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{category.title}</h3>
                    <div className="flex items-center text-white/90">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{category.rating?.toFixed(1) || '0.0'}</span>
                    </div>
                    <span className="text-sm text-white/80 capitalize">{category.gender}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      
    </div>
  );
}

export default CategoryList; 