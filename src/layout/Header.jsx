import React, { useState } from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { useHistory} from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const history = useHistory();
  /**
   * Toggle the menu open or closed state.
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToSignUpForm = () => {
    history.push("/signup");
  };

  return (
    <header className="bg-white py-4">
      <div className="flex items-center justify-between px-10 p-4">
   
        <h2 className="">Store</h2>


        
        <div className="flex gap-3 ">
          <Search />
          <User onClick={goToSignUpForm} style={{ cursor: "pointer" }} />
          <ShoppingCart />
          <Menu onClick={toggleMenu} />
        </div>
      </div>

      
      <nav className={`${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center space-y-6 p-16 bg-white shadow-md text-2xl">
          <a href="/" className="text-gray-700 hover:text-indigo-600">Home</a>
          <a href="/products" className="text-gray-700 hover:text-indigo-600">Product</a>
          <a href="/pricing" className="text-gray-700 hover:text-indigo-600">Pricing</a>
          <a href="/contact" className="text-gray-700 hover:text-indigo-600">Contact</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;