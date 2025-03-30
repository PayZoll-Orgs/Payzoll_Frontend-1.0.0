"use client";

import Features from "@/components/home/Features";
import Navbar from "@/components/home/Navbar";
import { usePathname } from "next/navigation";

function FeaturesPage() {
  const pathname = usePathname();
  console.log("Current path (features):", pathname);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Features />
    </div>
  );
}

export default FeaturesPage;