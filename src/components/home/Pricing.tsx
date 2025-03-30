
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
    <section id="pricing" className="py-20 bg-crypto-dark relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400">
            Choose the perfect plan for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                tier.isPopular
                  ? 'bg-gradient-to-b from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/20 transform scale-105'
                  : 'bg-crypto-card border border-gray-800'
              }`}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">{tier.name}</h3>
                <div className="text-4xl font-bold mb-2">{tier.price}</div>
                <div className={tier.isPopular ? 'text-indigo-100' : 'text-gray-400'}>
                  {tier.period}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check 
                      className={`h-5 w-5 mr-2 ${
                        tier.isPopular ? 'text-indigo-200' : 'text-indigo-400'
                      }`}
                    />
                    <span className={tier.isPopular ? 'text-white' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full text-center transition-all ${
                  tier.isPopular
                    ? 'bg-white text-indigo-600 hover:shadow-lg'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 
