"use client";

import Working from "@/components/home/Working";
import Navbar from "@/components/home/Navbar";
import { usePathname } from "next/navigation";

function WorkingPage() {
  const pathname = usePathname();
  console.log("Current path (working):", pathname);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Working />
    </div>
  );
}

export default WorkingPage;