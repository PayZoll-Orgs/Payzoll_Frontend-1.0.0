import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import  Working  from "@/components/home/Working";
import Agent from "@/components/home/PayzollAgent";
import Testimonial from "@/components/home/Testimonial";

import Sponsors from "@/components/home/Sponsors";
import Navbar from "@/components/home/Navbar"; // Adjust the path if necessary
import Footer from "@/components/home/Footer";



export default function Home() {
  return (
    <>
    <Navbar />
     <Hero/>
     <Sponsors/>
   
    
    
    <Features/>
    <Working/>
    <Agent/>
  <Testimonial/>
  <Footer/>
 
    </>
  );
}
