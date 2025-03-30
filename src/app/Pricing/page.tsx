"use client";

import Pricing from "@/components/home/Pricing";
import Navbar from "@/components/home/Navbar";
import { usePathname } from "next/navigation";

export default function PricingPage() {
  const pathname = usePathname();
  console.log("Current path (pricing):", pathname);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Pricing />
    </div>
  );
}
