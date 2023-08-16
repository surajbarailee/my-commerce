import React from 'react';

const Navbar = ({onNavLinkClick}) => {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-semibold">
          My Commerce
        </a>
        <ul className="flex space-x-4">
          <li>
            <button href="#" className="text-white hover:underline"
            onClick={() => onNavLinkClick('CreateProduct')}>
              New Product
            </button>
          </li>
          <li>
            <button href="#" className="text-white hover:underline"
            onClick={() => onNavLinkClick('ListProduct')}>
              Products
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
