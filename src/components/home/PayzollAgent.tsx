"use client";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] flex flex-col md:flex-row items-center justify-center px-4 md:pl-50 py-12 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(45, 139, 117, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(45, 139, 117, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Left Content */}
      <div className="w-full md:w-1/2 space-y-6 md:pr-8 text-center md:text-left relative z-10">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-5xl font-light relative text-shadow-glow">
              <span className="text-[#c8ceee]">USE PAYZOLL AGENT</span>
              <span className="text-gray-300"></span>
            </h2>
          </div>
          <span className="bg-[#22304a] text-[#2D8B75] text-xs px-3 py-1 rounded-full font-medium">LIVE</span>
        </div>
        
        <p className="text-[#A9A9A9] text-lg max-w-xl mx-auto md:mx-0">
          PayZoll Agent automates your global payroll with AI-powered efficiency. Seamlessly transfer funds across blockchains, optimize exchange rates in real-time, and ensure compliance—all with enterprise-grade security. Eliminate manual processes and reduce costs while gaining complete visibility into your worldwide payroll operations.
        </p>
        
        <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
          <Button className="bg-gradient-to-r from-[#2D8B75] to-[#B38D36] hover:shadow-lg hover:shadow-[#2D8B75]/20 text-[#F2F2F2] rounded-full px-6" 
            style={{ boxShadow: "0 0 5px rgba(45, 139, 117, 0.5)" }}>
            Open Docs
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            className="bg-transparent border-[#22304a] text-[#F2F2F2] hover:bg-[#131620] rounded-full px-6"
          >
            Learn More
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Right Content - Video */}
      <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center items-center relative z-10">
        <div className="relative w-full max-w-md aspect-rectangle"
             style={{ boxShadow: "0 0 5px rgba(45, 139, 117, 0.5), 0 0 10px rgba(45, 139, 117, 0.3)" }}>
          <video
            src="/images/counter.mp4"
            className="w-full h-full object-cover rounded-lg border border-[#22304a]"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
      
      {/* Styled JSX */}
      <style jsx>{`
        * {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </div>
  );
}