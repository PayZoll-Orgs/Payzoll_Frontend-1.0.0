"use client";

import React from 'react';
import { Check } from 'lucide-react';

interface PricingFeature {
  text: string;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: PricingFeature[];
  isPopular?: boolean;
}

const Pricing = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Free Trial",
      price: "$0",
      period: "for 1 month",
      features: [
        { text: "Up to 10 employees" },
        { text: "Basic payroll features" },
        { text: "Email support" },
        { text: "Basic analytics" }
      ]
    },
    {
      name: "Standard",
      price: "$99",
      period: "per month",
      isPopular: true,
      features: [
        { text: "Up to 50 employees" },
        { text: "Advanced payroll features" },
        { text: "Priority support" },
        { text: "Advanced analytics" },
        { text: "Custom payment schedules" },
        { text: "Multi-currency support" }
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored for you",
      features: [
        { text: "Unlimited employees" },
        { text: "Full feature access" },
        { text: "Dedicated support" },
        { text: "Custom integration" },
        { text: "Advanced security" },
        { text: "SLA guarantee" }
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 pt-40 bg-black relative min-h-screen flex flex-col items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[70%] h-[60%] bg-blue-300/16 blur-3xl rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#c8ceee] mb-4 font-mono tracking-wider uppercase">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 font-mono">
            Choose the perfect plan for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 border ${
                tier.isPopular
                  ? 'border-[#93c5fd]/30 bg-gradient-to-b from-[#14161E] to-[#0c0e14] shadow-xl shadow-[#93c5fd]/10 transform hover:scale-105 transition-all duration-300'
                  : 'border-gray-800 bg-[#14161E] hover:border-[#93c5fd]/30 transition-all duration-300'
              }`}
            >
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${tier.isPopular ? 'text-[#93c5fd]' : 'text-white'} font-mono`}>{tier.name}</h3>
                <div className={`text-4xl font-bold mb-2 ${tier.isPopular ? 'text-white' : 'text-white'} font-mono`}>{tier.price}</div>
                <div className={tier.isPopular ? 'text-[#93c5fd]/80' : 'text-gray-400'}>
                  {tier.period}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check 
                      className={`h-5 w-5 mr-2 ${
                        tier.isPopular ? 'text-[#93c5fd]' : 'text-[#93c5fd]/60'
                      }`}
                    />
                    <span className={tier.isPopular ? 'text-white' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full text-center transition-all font-mono ${
                  tier.isPopular
                    ? 'bg-gradient-to-r from-[#3B4058] to-[#93c5fd] text-white hover:shadow-lg hover:shadow-[#93c5fd]/20'
                    : 'bg-[#1D202D] border border-[#3B4058]/30 text-white hover:bg-[#2d3045] hover:border-[#93c5fd]/40'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        h2, h3, div, span, button {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </section>
  );
};

export default Pricing; 
