"use client";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Working from "@/components/home/Working";
import Agent from "@/components/home/PayzollAgent";
import Testimonial from "@/components/home/Testimonial";
import Sponsors from "@/components/home/Sponsors";
import Navbar from "@/components/home/Navbar"; // Adjust the path if necessary
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Add section IDs to each component wrapper */}
      <section id="home">
        <Hero />
      </section>
      
      <Sponsors />
      
      <section id="features">
        <Features />
      </section>
      
      <section id="working">
        <Working />
      </section>
      
      <Agent />
      
      <section id="testimonials">
        <Testimonial />
      </section>
      
      <Footer />
    </main>
  );
}