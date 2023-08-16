import React, { useState } from 'react';
import Navbar from './pages/NavBar';
import ListProduct from './pages/ListProducts';
import CreateProduct from './pages/CreateProduct';

function App() {
  const [activeLink, setActiveLink] = useState('ListProduct'); // Initial active link

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  let activeComponent;
  if (activeLink === 'ListProduct') {
    activeComponent = <ListProduct />;
  } else if (activeLink === 'CreateProduct') {
    activeComponent = <CreateProduct />;
  }

  return (
    <>
      <Navbar onNavLinkClick={handleNavLinkClick} />
      {activeComponent}
    </>
  );
}

export default App;
