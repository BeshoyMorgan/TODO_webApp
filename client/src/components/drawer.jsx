import React, { useState } from 'react';
import CategorySideComponent from './category';
import './drawer.css'

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
   <>
   <button onClick={toggleDrawer} className='absolute top-3 left-10 lg:hidden'>
   <svg xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round" className="text-white lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
   </button>
    <div className={`z-20 drawer ${isOpen ? 'open' : 'closed'}`}>
      <button className="drawer__toggle" onClick={toggleDrawer}>
            Menu
      </button>
      
        <CategorySideComponent />
      
    </div>
   </>
  );
};

export default Drawer;
