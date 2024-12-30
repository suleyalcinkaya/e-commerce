import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const { categories } = useSelector(state => state.product);

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="relative group">
            <button className="px-4 py-2 hover:bg-gray-100 rounded">
              Categories
            </button>
            <div className="absolute hidden group-hover:block w-64 bg-white shadow-lg rounded-md mt-1">
              {categories.map(category => (
                <Link 
                  key={category.id}
                  to={`/shop/${category.gender}/${category.title.toLowerCase()}/${category.id}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
          {/* Other header content */}
        </div>
      </nav>
    </header>
  );
};

export default Header;