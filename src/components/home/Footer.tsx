"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet2,
  Twitter,
  Linkedin,
  Github,
  Mail,
  ArrowRight,
  Globe,
  Shield,
  Layers,
  ChevronUp,
  Instagram,
  Send,
} from "lucide-react";

const Footer: React.FC = () => {
  const [hoverState, setHoverState] = useState({
    newsletter: false,
    scrollTop: false,
  });

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-gray-300 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-12">
                <h3 className="text-2xl font-bold text-white mb-2">Stay updated</h3>
                <p className="text-gray-300">Get the latest news and updates from PayZoll</p>
              </div>
              <form onSubmit={handleSubmit} className="w-full md:w-auto">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full md:w-64 px-4 py-3 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-3 rounded-r-lg flex items-center transition-all duration-300"
                  >
                    <span className="text-white font-medium">Subscribe</span>
                    <ArrowRight className="ml-2 h-5 w-5 text-white transition-transform duration-300" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-6">
            <div className="flex items-center">
              <Wallet2 className="h-8 w-8 text-indigo-500" />
              <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
                PayZoll
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Next-generation crypto payroll platform for the modern workforce.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Product</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Security", "Enterprise", "API"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Company</h3>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact", "Partners"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Legal</h3>
            <ul className="space-y-3">
              {["Privacy", "Terms", "Cookie Policy", "Licenses", "Compliance"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800">
  <h3 className="text-white font-semibold mb-6 text-lg">Contact Us</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {["Founder", "Support", "Marketing", "HR"].map((role, index) => (
      <div key={index}>
        <h4 className="text-white font-medium mb-2">{role}</h4>
        <a
          href={`mailto:${role.toLowerCase()}@payzoll.in`}
          className="text-gray-400 hover:text-white"
        >
          {role.toLowerCase()}@payzoll.in
        </a>
      </div>
    ))}
  </div>
</div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} PayZoll. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
        aria-label="Back to top"
      >
        <ChevronUp className="h-6 w-6 text-white" />
      </button>
    </footer>
  );
};

export default Footer;