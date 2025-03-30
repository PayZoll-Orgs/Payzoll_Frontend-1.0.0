import Features from "@/components/home/Features";

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-crypto-dark text-white flex flex-col items-center justify-center">
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 via-transparent to-transparent" />
      </div>

      <Features />
    </div>
  );
}

export default FeaturesPage;