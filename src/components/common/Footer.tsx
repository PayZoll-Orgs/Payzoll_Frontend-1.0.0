"use client";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Send, Layers, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0E0F12] text-gray-400 py-12 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/stars.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-black opacity-90"></div>
      </div>
      {/* Content - ensure it's above the video with z-10 */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {/* Brand Section */}
        <div>
          <Image src="/images/logonew.png" alt="PayZoll Logo" width={100} height={100} />

          <p className="mt-2 text-sm">
            Next-generation crypto payroll platform for the modern workforce.
            Secure, efficient, and transparent.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="hover:text-white transition">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <Linkedin size={20} />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <Send size={20} />
            </Link>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            {["Features", "Pricing", "Security", "Enterprise", "API"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-white transition">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            {["About", "Blog", "Careers", "Contact", "Partners"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-white transition">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            {["Privacy", "Terms", "Cookie Policy", "License", "Compliance"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-white transition">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Legal Terms Section */}
      <div className="max-w-7xl mx-auto px-6 mt-8 border-t border-gray-700 pt-6 text-sm text-gray-500 flex flex-wrap justify-between relative z-10">
        <span>&copy; {new Date().getFullYear()} PayZoll. All rights reserved.</span>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <Globe size={18} />
            <span>English</span>
          </div>
          <span className="text-gray-500">|</span>
          <div className="flex items-center space-x-2">
            <Layers size={18} />
            <span>All chains supported</span>
            <span className="text-gray-500">|</span>
          </div>
          <Link href="#" className="hover:text-white transition">Legal Terms</Link>
          <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition">Terms of Use</Link>
        </div>
      </div>

      {/* Styled JSX */}
      <style jsx>{`
        * {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </footer>
  );
};

export default Footer;