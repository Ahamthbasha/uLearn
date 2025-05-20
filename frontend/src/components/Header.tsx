import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">Ulearn</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 font-bold">
          <a href="/homePage" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">Courses</a>
          <a href="#" className="hover:text-gray-300">Mentors</a>
          <a href="#" className="hover:text-gray-300">About Us</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4 font-bold">
          <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200">Login</button>
          <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200" onClick={()=>navigate('/enrollPage')}>Sign Up</button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 font-bold">
          <a href="/homePage" className="block hover:text-gray-300">Home</a>
          <a href="#" className="block hover:text-gray-300">Courses</a>
          <a href="#" className="block hover:text-gray-300">Mentors</a>
          <a href="#" className="block hover:text-gray-300">About Us</a>
          <button className="w-full mt-2 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200">Login</button>
          <button className="w-full bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200" onClick={()=>navigate('/enrollPage')}>Sign Up</button>
        </div>
      )}
    </header>
  );
};

export default Header;
