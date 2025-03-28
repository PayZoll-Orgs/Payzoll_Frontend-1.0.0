"use client";

import React, { useState } from "react";
import { Upload, Globe, DollarSign } from "lucide-react";

const GeneralSettings: React.FC = () => {
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => setCompanyLogo(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Organization Details */}
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
        <h2 className="text-xl font-bold mb-6">Organization Details</h2>
        <div className="space-y-6">
          {/* Company Logo */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Company Logo</label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isDragging ? "border-indigo-500 bg-indigo-500/10" : "border-gray-800 hover:border-gray-700"
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => setCompanyLogo(event.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {companyLogo ? (
                <img src={companyLogo} alt="Company Logo" className="max-w-[200px] max-h-[200px] rounded-lg mx-auto" />
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/10 mx-auto flex items-center justify-center">
                    <Upload className="w-8 h-8 text-indigo-400" />
                  </div>
                  <p className="text-sm text-gray-400">Drag and drop your logo here, or click to select</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Language and Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-5 h-5 text-white" />
            <h3 className="font-semibold">Language</h3>
          </div>
          <select className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4 focus:outline-none focus:border-indigo-500 transition-colors">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
          <div className="flex items-center space-x-3 mb-6">
            <DollarSign className="w-5 h-5 text-white" />
            <h3 className="font-semibold">Currency</h3>
          </div>
          <select className="w-full bg-crypto-dark border border-gray-800 rounded-xl py-2 px-4 focus:outline-none focus:border-indigo-500 transition-colors">
            <option value="usd">USD - US Dollar</option>
            <option value="eur">EUR - Euro</option>
            <option value="btc">BTC - Bitcoin</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;
