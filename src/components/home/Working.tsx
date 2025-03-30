"use client";
import React, { useState, useEffect } from "react";

interface Step {
  video: string; // Path to the video file
  title: string;
  description: string;
  highlight: string;
  bgHighlight: string;
}

const Working: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const steps: Step[] = [
    {
      video: "/images/verf.mp4", // Replace with your video path
      title: "Enterprise Verification",
      description:
        "Complete streamlined KYC/AML verification for your company and team members across jurisdictions with our advanced validation protocol.",
      highlight: "from-[#3B4058] to-[#93c5fd]",
      bgHighlight: "from-[#3B4058]/5 to-[#93c5fd]/5",
    },
    {
      video: "/images/multi.mp4", // Replace with your video path
      title: "Multi-Chain Funding",
      description:
        "Deposit funds using any blockchain token or network. Our protocol automatically detects and secures your assets in your enterprise vault.",
      highlight: "from-[#3B4058] to-[#93c5fd]",
      bgHighlight: "from-[#3B4058]/5 to-[#93c5fd]/5",
    },
    {
      video: "/images/stable.mp4", // Replace with your video path
      title: "Automated Conversion & Scheduling",
      description:
        "Our smart contracts handle token swaps, cross-chain bridges, and establish recurring payment streams with programmable distribution logic.",
      highlight: "from-[#3B4058] to-[#93c5fd]",
      bgHighlight: "from-[#3B4058]/5 to-[#93c5fd]/5",
    },
    {
      video: "/images/stok.mp4", // Replace with your video path
      title: "Seamless Distribution & Off-ramping",
      description:
        "Recipients receive funds instantly with customizable off-ramp options—direct to bank accounts, crypto wallets, or mobile payment systems.",
      highlight: "from-[#3B4058] to-[#93c5fd]",
      bgHighlight: "from-[#3B4058]/5 to-[#93c5fd]/5",
    },
  ];

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [steps.length, isHovered]);

  return (
    <section
      id="Working"
      className="py-24 pt-40 bg-black relative overflow-hidden font-jetbrains"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(147, 197, 253, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(147, 197, 253, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            animation: "gradientMove 20s linear infinite",
          }}
        />
      </div>
      
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[70%] h-[60%] bg-blue-300/16 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
        <div className="text-brandBlue/80 flex flex-col ">
      <h2 className="text-3xl md:text-5xl font-light relative text-shadow-glow">
<span className="text-[#c8ceee]">SIMPLE FOUR-STEP PROCESS</span>
<span className="text-gray-300"></span>
</h2>
      </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience seamless payroll management with our enterprise-grade
            blockchain solution
          </p>
        </div>

        {/* Steps Progress Bar */}
        <div className="flex justify-between mb-20 relative max-w-4xl mx-auto">
          <div className="absolute h-1 bg-gray-800 left-0 right-0 top-4 -z-10"></div>
          <div
            className="absolute h-1 bg-gradient-to-r from-[#3B4058] to-[#93c5fd] left-0 top-4 -z-10 transition-all duration-500"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          ></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="z-10 flex flex-col items-center relative cursor-pointer group"
              onMouseEnter={() => {
                setIsHovered(true);
                setActiveStep(index);
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500
                  ${
                    activeStep >= index
                      ? `bg-gradient-to-r ${step.highlight} shadow-lg scale-125`
                      : "bg-gray-800"
                  }`}
              >
                {activeStep > index ? (
                  <span className="text-xs font-bold text-white">✓</span>
                ) : (
                  <span className="text-xs font-bold text-white">
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={`absolute -bottom-6 text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${
                    activeStep === index
                      ? "text-white scale-110"
                      : "text-gray-500"
                  }`}
              >
                {step.title.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="relative">
            <div className="relative bg-black rounded-2xl overflow-hidden border border-[#93c5fd]/20">
              <div className="relative h-[400px]">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700
                      ${activeStep === index ? "opacity-100 transform scale-100 rotate-0" : "opacity-0 transform scale-90 rotate-12"}`}
                  >
                    <div className="relative w-full h-full">
                      {step.video.endsWith(".gif") ? (
                        <img
                          src={step.video}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source src={step.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`transition-all duration-700 absolute w-full
                  ${
                    activeStep === index
                      ? "opacity-100 transform translate-x-0"
                      : "opacity-0 transform translate-x-8 pointer-events-none"
                  }`}
                style={{
                  position: activeStep === index ? "relative" : "absolute",
                }}
              >
                <div className="mb-4">
                  <span
                    className={`inline-block px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r ${step.bgHighlight} border border-[#93c5fd]/30`}
                  >
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-[#c8ceee] mb-6">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  {step.description}
                </p>

                {/* Progress indicator */}
                <div className="flex space-x-2">
                  {steps.map((_, dotIndex) => (
                    <div
                      key={dotIndex}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        dotIndex === activeStep
                          ? `w-8 bg-gradient-to-r ${steps[dotIndex].highlight}`
                          : "w-2 bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes gradientMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }

        h2,
        h3,
        p,
        span {
          font-family: "JetBrains Mono", monospace;
        }
      `}</style>
    </section>
  );
};

export default Working;