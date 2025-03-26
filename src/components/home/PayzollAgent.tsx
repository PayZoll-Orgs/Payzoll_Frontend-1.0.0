import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-center px-4 md:pl-50 py-12">
      {/* Left Content */}
      <div className="w-full md:w-1/2 space-y-6 md:pr-8 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <h1 className="text-4xl md:text-5xl font-bold">Use Payzoll Agent</h1>
          <span className="bg-blue-900 text-blue-400 text-xs px-3 py-1 rounded-full font-medium">LIVE</span>
        </div>

        <p className="text-gray-400 text-lg max-w-xl mx-auto md:mx-0">
          PayZoll Agent automates your global payroll with AI-powered efficiency. Seamlessly transfer funds across blockchains, optimize exchange rates in real-time, and ensure compliance—all with enterprise-grade security. Eliminate manual processes and reduce costs while gaining complete visibility into your worldwide payroll operations.
        </p>

        <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
            Open Docs
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="bg-transparent border-gray-700 text-white hover:bg-gray-800 rounded-full px-6"
          >
            Learn More
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Right Content - Video */}
      <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center items-center">
        <div className="relative w-full max-w-md aspect-rectangle">
          <video
            src="/images/counter.mp4"
            alt="Agent demonstration"
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </div>
  );
}