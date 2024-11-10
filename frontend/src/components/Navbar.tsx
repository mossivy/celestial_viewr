import React from "react";

const Navbar: React.FC = () => {
  return(
    <nav className="bg-[#121212] text-[#e0e0e0] px-6 py-4 flex items-center justify-between">
      <div className="text-lg font-bold">
       {/* LOGO GO HERE*/}
        Solar System Explorer
      </div>  
      <div className="flex space-x-4">
        <a href="#home" className="hover:text-gray-400 transition-colors">Home</a>
        <a href="#explore" className="hover:text-gray-400 transition-colors">Explore</a>
      </div>
    </nav>
  );
};

export default Navbar;
