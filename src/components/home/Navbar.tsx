"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import RegisterModal from "./RegisterModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
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

  const navigateToPage = (route) => {
    setMobileMenuOpen(false);
    router.push(route);
  };

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    
    // If we're not on the homepage, navigate there first
    if (pathname !== '/') {
      router.push('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        scrollToElement(sectionId);
      }, 300);
    } else {
      scrollToElement(sectionId);
    }
  };
  
  const scrollToElement = (sectionId) => {
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
          border border-[#22304a]/30 backdrop-blur-md
          ${isScrolled ? 
            'bg-[#0c0f16]/80 shadow-lg shadow-[#2D8B75]/5' : 
            'bg-[#0c0f16]/50'}
          transition-all duration-300
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
            <NavItem onClick={() => navigateToPage('/Pricing')}>Pricing</NavItem>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Connect Wallet Button */}
            <button 
              className="hidden md:flex items-center justify-center px-5 py-2 bg-[#131620]/60 border border-[#22304a]/50 rounded-full transition-all duration-300"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2D8B75] to-[#B38D36] font-medium text-sm">
                Connect Wallet
              </span>
            </button>

            {/* Register Button */}
            <button
              onClick={handleOpenModal}
              className="relative overflow-hidden flex items-center justify-center px-6 py-2.5 bg-[#131620]/60 border border-[#22304a]/50 rounded-full transition-all duration-300 hover:bg-[#131620]/80 hover:shadow-sm hover:shadow-[#2D8B75]/30 group"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2D8B75] to-[#B38D36] font-medium text-sm mr-1">
                Register Now
              </span>
              <svg 
                className="w-4 h-4 ml-1 text-[#2D8B75] group-hover:translate-x-0.5 transition-transform" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M13.75 6.75L19.25 12L13.75 17.25" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M19 12H4.75" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-[#131620]/60 border border-[#22304a]/50 text-[#2D8B75] transition-all duration-300 hover:bg-[#131620]/80"
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
          className="md:hidden overflow-hidden mt-2 rounded-xl border border-[#22304a]/30 backdrop-blur-md bg-[#0c0f16]/80 shadow-lg shadow-[#2D8B75]/5"
        >
          <div className="py-4 px-5 flex flex-col space-y-2">
            <NavItemMobile onClick={() => scrollToSection('home')}>Home</NavItemMobile>
            <NavItemMobile onClick={() => scrollToSection('features')}>Features</NavItemMobile>
            <NavItemMobile onClick={() => scrollToSection('working')}>How it Works</NavItemMobile>
            <NavItemMobile onClick={() => scrollToSection('testimonials')}>Testimonials</NavItemMobile>
            <NavItemMobile onClick={() => navigateToPage('/Pricing')}>Pricing</NavItemMobile>
            
            <div className="h-px w-full bg-[#22304a]/50 my-2"></div>
            
            <button 
              className="w-full flex items-center justify-center px-4 py-3 bg-[#131620]/60 border border-[#22304a]/50 rounded-xl transition-all"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2D8B75] to-[#B38D36] font-semibold">
                Connect Wallet
              </span>
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
      className="relative px-4 py-2 text-[#A9A9A9] hover:text-transparent font-semibold transition-all rounded-lg overflow-hidden group"
    >
      <span className="relative z-10 group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#2D8B75] group-hover:to-[#B38D36]">
        {children}
      </span>
      <span className="absolute inset-0 bg-[#131620]/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
    </button>
  );
};

// Mobile Navigation Item Component
const NavItemMobile = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 text-[#A9A9A9] hover:text-transparent font-medium transition-all rounded-xl hover:bg-[#131620]/40 group"
    >
      <span className="group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#2D8B75] group-hover:to-[#B38D36]">
        {children}
      </span>
    </button>
  );
};

export default Navbar;