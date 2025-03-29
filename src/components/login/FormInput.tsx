"use client";

import React from "react";

interface FormInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: { message: string };
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon, endIcon, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
        <div className="relative">
          {/* Left Icon */}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#93c5fd]">
              {icon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            className={`w-full bg-[#1D202D] border ${
              error ? "border-red-500" : "border-[#3B4058]/20"
            } text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#93c5fd]/50 transition-all`}
            {...props}
          />

          {/* Right End Icon */}
          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {endIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
