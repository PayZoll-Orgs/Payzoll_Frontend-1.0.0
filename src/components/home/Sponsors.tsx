"use client";
import { motion } from "framer-motion";
import Image from "next/image"; // Import for custom logos

const Sponsors = () => {
  return (
    <section className="bg-black py-12">
      {/* Heading */}
      <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-light relative text-shadow-glow">
  <span className="text-[#c8ceee]">OUR TRUSTED SPONSORS</span>
  <span className="text-gray-300"></span>
</h2>
      </div>

      {/* Top Row */}
      <div className="flex overflow-hidden">
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
      </div>

      {/* Bottom Row */}
      <div className="flex overflow-hidden mt-4">
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
      </div>

      {/* Styled JSX */}
      <style jsx>{`
        h2,
        a {
          font-family: "JetBrains Mono", monospace;
        }
      `}</style>
    </section>
  );
};

const TranslateWrapper = ({
  children,
  reverse = false,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {children}
    </motion.div>
  );
};

const LogoItem = ({
  imageSrc,
}: {
  imageSrc: string;
}) => {
  return (
    <a
      href="/"
      rel="nofollow"
      target="_blank"
      className="w-16 md:w-24 h-16 md:h-24 flex justify-center items-center hover:bg-gray-800 transition-colors"
    >
      <Image
        src={imageSrc}
        alt="Sponsor Logo"
        width={96} // Set a consistent width
        height={96} // Set a consistent height
        className="object-contain"
      />
    </a>
  );
};

const LogoItemsTop = () => (
  <>
    <LogoItem imageSrc="/images/spon1.png" />
    <LogoItem imageSrc="/images/spon2.png" />
    <LogoItem imageSrc="/images/spon3.png" />
    <LogoItem imageSrc="/images/spon4.png" />
    
    <LogoItem imageSrc="/images/spon6.png" />
    <LogoItem imageSrc="/images/spon8.png" />
    <LogoItem imageSrc="/images/spon7.png" />
    
    <LogoItem imageSrc="/images/spon9.png" />
    <LogoItem imageSrc="/images/spon5.png" />
  </>
);

const LogoItemsBottom = () => (
  <>
     <LogoItem imageSrc="/images/spon1.png" />
    <LogoItem imageSrc="/images/spon2.png" />
    <LogoItem imageSrc="/images/spon3.png" />
    <LogoItem imageSrc="/images/spon4.png" />
    
    <LogoItem imageSrc="/images/spon6.png" />
    <LogoItem imageSrc="/images/spon8.png" />
    <LogoItem imageSrc="/images/spon7.png" />
    
    <LogoItem imageSrc="/images/spon9.png" />
    <LogoItem imageSrc="/images/spon5.png" />
  </>
);

export default Sponsors;