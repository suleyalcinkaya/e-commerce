import React, { useState } from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToSignUpForm = () => {
    history.push("/signup");
  };

  const navigate = (path) => {
    history.push(path);
  };

  return (
    <header className="bg-white py-4">
      <div className="flex items-center justify-between px-16 p-4">
        <h2 onClick={() => navigate('/')} className="text-5xl font-bold cursor-pointer">Store</h2>
        
        <div className="flex gap-6 items-center py-4">
          <Search style={{ width: '56px', height: '56px' }} strokeWidth={2.5} />
          <User onClick={goToSignUpForm} style={{ width: '56px', height: '56px', cursor: 'pointer' }} strokeWidth={2.5} />
          <ShoppingCart style={{ width: '56px', height: '56px' }} strokeWidth={2.5} />
          <Menu onClick={toggleMenu} style={{ width: '56px', height: '56px', cursor: 'pointer' }} strokeWidth={2.5} />
        </div>
      </div>

      <nav className={`${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center space-y-8 p-16 bg-white shadow-md">
          <a onClick={() => navigate('/')} className="text-4xl font-medium text-gray-700 hover:text-indigo-600 cursor-pointer transition-colors">Home</a>
          <a onClick={() => navigate('/products')} className="text-4xl font-medium text-gray-700 hover:text-indigo-600 cursor-pointer transition-colors">Product</a>
          <a onClick={() => navigate('/pricing')} className="text-4xl font-medium text-gray-700 hover:text-indigo-600 cursor-pointer transition-colors">Pricing</a>
          <a onClick={() => navigate('/contact')} className="text-4xl font-medium text-gray-700 hover:text-indigo-600 cursor-pointer transition-colors">Contact</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;