"use client";

import React, { useState } from "react";
import {  Sun, Moon, Check } from "lucide-react";

const colors = [
  { id: 1, value: "#6366f1", name: "Indigo" },
  { id: 2, value: "#8b5cf6", name: "Purple" },
  { id: 3, value: "#a855f7", name: "Violet" },
  { id: 4, value: "#ec4899", name: "Pink" },
  { id: 5, value: "#10b981", name: "Emerald" },
];

const layouts = [
  { id: "default", name: "Default", description: "Standard dashboard layout" },
  { id: "compact", name: "Compact", description: "Condensed view with smaller elements" },
  { id: "comfortable", name: "Comfortable", description: "Spacious layout with larger elements" },
];

export default function CustomizationSettings() {
  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("#6366f1");
  const [layout, setLayout] = useState("default");

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Theme Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setTheme("light")} className={`p-4 rounded-xl border transition-all ${theme === "light" ? "bg-indigo-500/10 border-indigo-500 text-white" : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"}`}>
            <Sun className="w-5 h-5" /> Light
          </button>
          <button onClick={() => setTheme("dark")} className={`p-4 rounded-xl border transition-all ${theme === "dark" ? "bg-indigo-500/10 border-indigo-500 text-white" : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"}`}>
            <Moon className="w-5 h-5" /> Dark
          </button>
        </div>
      </div>

      {/* Accent Color */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Accent Color</h2>
        <div className="grid grid-cols-5 gap-4">
          {colors.map((color) => (
            <button key={color.id} onClick={() => setAccentColor(color.value)} className="w-full h-12 rounded-xl border border-gray-700 hover:border-gray-500" style={{ backgroundColor: color.value }}>
              {accentColor === color.value && <Check className="w-5 h-5 text-white mx-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Settings */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Layout Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {layouts.map((l) => (
            <button key={l.id} onClick={() => setLayout(l.id)} className={`p-4 rounded-xl border transition-all text-left ${layout === l.id ? "bg-indigo-500/10 border-indigo-500" : "bg-gray-800 border-gray-700 hover:border-gray-500"}`}>
              <div className="font-semibold">{l.name}</div>
              <p className="text-sm text-gray-400">{l.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}
