"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RegisterModal from "./RegisterModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    
    // Find the element to scroll to
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll to the section with offset for navbar
      const offset = 100; // Adjust based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  
  return (
    <>
      <div className="h-6"></div> {/* Top spacing */}
      <nav className={`fixed top-6 left-0 right-0 mx-auto z-40 transition-all duration-300 max-w-7xl px-4 md:px-8`}>
        <div className={`
          w-full rounded-2xl flex items-center justify-between py-4 px-5 md:px-8
          border border-white/10 backdrop-blur-md
          ${isScrolled ? 
            'bg-[#111827]/70 shadow-lg shadow-black/20' : 
            'bg-[#111827]/40'}
        `}>
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image 
              src="/images/logonew.png" 
              alt="Logo" 
              width={120} 
              height={40} 
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <NavItem onClick={() => scrollToSection('home')}>Home</NavItem>
            <NavItem onClick={() => scrollToSection('features')}>Features</NavItem>
            <NavItem onClick={() => scrollToSection('working')}>How it Works</NavItem>
            <NavItem onClick={() => scrollToSection('testimonials')}>Testimonials</NavItem>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Connect Wallet Button */}
            <button 
              className="hidden md:flex items-center justify-center px-5 py-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Connect Wallet
            </button>

            {/* Register Button */}
            <button
              onClick={handleOpenModal}
              className="relative overflow-hidden flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-white/20 rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
              <span className="mr-1">Register Now</span>
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-white/5 border border-white/20 text-white transition-all duration-300 hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden mt-2 rounded-xl border border-white/10 backdrop-blur-md bg-[#111827]/70 shadow-lg shadow-black/20"
        >
          <div className="py-4 px-5 flex flex-col space-y-2">
            <NavItemMobile onClick={() => scrollToSection('home')}>Home</NavItemMobile>
            <NavItemMobile onClick={() => scrollToSection('features')}>Features</NavItemMobile>
            <NavItemMobile onClick={() => scrollToSection('working')}>How it Works</NavItemMobile>
            <NavItemMobile onClick={() => scrollToSection('testimonials')}>Testimonials</NavItemMobile>
            
            <div className="h-px w-full bg-white/10 my-2"></div>
            
            <button 
              className="w-full flex items-center justify-center px-4 py-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all"
            >
              Connect Wallet
            </button>
          </div>
        </motion.div>
      </nav>
      
      {/* Register Modal */}
      <RegisterModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

// Desktop Navigation Item Component
const NavItem = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative px-4 py-2 text-white hover:text-white font-medium transition-all rounded-lg overflow-hidden group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
    </button>
  );
};

// Mobile Navigation Item Component
const NavItemMobile = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 text-white hover:text-white font-medium transition-all rounded-xl hover:bg-white/10"
    >
      {children}
    </button>
  );
};

export default Navbar;