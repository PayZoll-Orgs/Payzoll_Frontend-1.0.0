"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const footerRef = useRef<HTMLElement>(null);
  const fullText = "PAYZOLL";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (visible) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 150);

      return () => clearInterval(interval);
    }
  }, [visible]);

  return (
    <footer
      ref={footerRef}
      className="relative text-white py-12 px-4 sm:px-6 md:px-12 bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 before:backdrop-blur-lg"
      style={{
        backgroundImage: `url('/images/bg.avif')`,
      }}
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
              Let&apos;s build the future together
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6">
              Connect with our network
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-medium py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
            >
              <Mail className="h-5 w-5" />
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          

          {/* CONNECT COLUMN */}
          <div>
            <h3 className="text-cyan-400 font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                 Enterprise 
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                 API
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY COLUMN */}
          <div>
            <h3 className="text-cyan-400 font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL COLUMN */}
          <div>
            <h3 className="text-cyan-400 font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Licenses
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ANIMATED PAYZOLL TEXT */}
        <div className="border-t border-gray-800 py-8 sm:py-12 flex items-center justify-center">
          <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-cyan-400 tracking-widest flex items-center">
            <span className="text-cyan-400 mr-2 sm:mr-4">&lt;</span>
            
            <span className="overflow-hidden">{displayedText}</span>
           
            <span className="text-cyan-400 ml-2 sm:ml-4">/ &gt;</span>
          </div>
        </div>

       {/* COPYRIGHT TEXT */}
<div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mt-4 sm:mt-8">
  {/* Left Side */}
  <div className="flex items-center">
    <span className="mr-2">&lt;&gt;</span>
    <p>© 2025 PayZoll. All Rights Reserved.</p>
  </div>

  {/* Right Side */}
  <div className="flex space-x-4">
    <Link href="/terms" className="hover:text-cyan-400 transition-colors">
      Terms
    </Link>
    <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
      Privacy
    </Link>
    <Link href="/cookies" className="hover:text-cyan-400 transition-colors">
      Cookies
    </Link>
  </div>
</div>
      </div>
    </footer>
  );
}
