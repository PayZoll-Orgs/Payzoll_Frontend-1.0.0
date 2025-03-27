"use client";

import React from "react";
import zxcvbn from "zxcvbn";

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const result = zxcvbn(password || "");
  const score = result.score;

  const getStrengthColor = (score: number): string => {
    switch (score) {
      case 0:
        return "bg-red-500 text-red-400";
      case 1:
        return "bg-orange-500 text-orange-400";
      case 2:
        return "bg-yellow-500 text-yellow-400";
      case 3:
        return "bg-green-500 text-green-400";
      case 4:
        return "bg-emerald-500 text-emerald-400";
      default:
        return "bg-gray-500 text-gray-400";
    }
  };

  const getStrengthText = (score: number): string => {
    switch (score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      {/* Strength Indicator Bars */}
      <div className="flex h-1 space-x-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${
              index <= score ? getStrengthColor(score).split(" ")[0] : "bg-gray-700"
            }`}
          />
        ))}
      </div>

      {/* Strength Text */}
      {password && (
        <p className={`text-sm text-right ${getStrengthColor(score).split(" ")[1]}`}>
          {getStrengthText(score)}
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;
