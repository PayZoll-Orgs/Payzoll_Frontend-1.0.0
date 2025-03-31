// src/components/home/Hero.tsx - Only color changes to emerald
"use client";

import EncryptButton from "../ui/EncryptBtn";

export default function Hero() {
  return (
    <div
      className="relative text-white py-20 flex flex-col items-center text-center mt-40 min-h-screen justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[70%] h-[60%] bg-emerald-500/16 blur-3xl rounded-full"></div>
      </div>
      <h1 className="text-3xl md:text-5xl font-light relative text-shadow-glow">
        <span className="text-[#d1fae5]">ENCRYPTED. EFFICIENT. EFFORTLESS.</span><span className="text-gray-300"></span>
      </h1>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl relative">
        The modern payroll platform that moves at the speed of your business.
        <br /> 
      </p>

      <div className="mt-6 flex flex-col md:flex-row items-center gap-4 relative">
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full md:w-96 px-6 py-3 rounded-full bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {/* Fixed Shape Oval Box */}
        <div className="flex items-center justify-center w-64 h-12 border-emerald-500/[8%] rounded-full border p-[0.31rem]">
          <EncryptButton
            TARGET_TEXT="Join the waitlist"
            className="w-full h-full flex items-center justify-center bg-transparent text-white font-semibold transition-all hover:text-emerald-400"
          >
            JOIN WAITLIST
          </EncryptButton>
        </div>
      </div>

      <div className="mt-24 w-full max-w-5xl relative">
        <img
          src="/images/dashboard.png"
          alt="Preview"
          className="rounded-xl shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Styled JSX */}
      <style jsx>{`
        h1 {
          font-family: 'JetBrains Mono', monospace;
        }
        p {
          font-family: 'JetBrains Mono', monospace;
        }
        input {
          font-family: 'JetBrains Mono', monospace;
        }
        button {
          font-family: 'JetBrains Mono', monospace;
        }
        .hover\:text-blue-300:hover {
          color: #34D399; /* Emerald-400 */
        }
      `}</style>
    </div>
  );
}