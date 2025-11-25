import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-md"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-gray-200">Shoe Store</Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-200 hover:text-white focus:outline-none focus:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Navigation Links */}
        <nav className={`hidden md:flex space-x-6`}>
          <motion.div variants={linkVariants} whileHover="hover">
            <Link to="/" className="text-gray-200 hover:text-white">Home</Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover">
            <Link to="/products" className="text-gray-200 hover:text-white">Products</Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover">
            <Link to="/about" className="text-gray-200 hover:text-white">About Us</Link>
          </motion.div>
        </nav>

        {/* Search Bar (Placeholder) */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-gray-300 rounded-full px-4 py-2 focus:outline-none"
          />
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="text-gray-200 hover:text-white">
          <ShoppingCart className="h-6 w-6" />
        </Link>
      </div>

      {/* Mobile Menu (Conditional Rendering) */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-white/5 backdrop-blur-md py-4 px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
        >
          <Link to="/" className="block py-2 text-gray-200 hover:text-white">Home</Link>
          <Link to="/products" className="block py-2 text-gray-200 hover:text-white">Products</Link>
          <Link to="/about" className="block py-2 text-gray-200 hover:text-white">About Us</Link>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
