import Hero from "@/components/home/Heromain";
import SecrectSection from "@/components/home/Featuresmain";
import  Features  from "@/components/home/Working";
import Agent from "@/components/home/PayzollAgent";
import ScrollingTestimonials from "@/components/home/Testimonial";
import DoubleScrollingLogos from "@/components/home/Sponsors";



export default function Home() {
  return (
    <>
    
     <Hero/>
     <DoubleScrollingLogos/>
   <SecrectSection/>
    
    
    <Features/>
    <Agent/>
    <ScrollingTestimonials/>
 
    </>
  );
}
