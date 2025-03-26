"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import useMeasure from "react-use-measure";
import Image from "next/image";
import { Button } from "../ui/MovingBorder";

const Navbar = () => {
  return (
    <section>
      <GlassNavigation />
    </section>
  );
};

const GlassNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="glass-nav fixed px-20 top-0 z-30 mx-auto overflow-hidden border-[1px] border-white/10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl mb-10"
    >
      <div className="glass-nav flex items-center justify-between px-10 py-3">
        {/* Logo on the Left */}
        <Logo />

        {/* Links in the Center */}
        <Links />

        {/* Buttons (Menu) on the Right */}
        <Buttons setMenuOpen={setMenuOpen} />
      </div>

      <MobileMenu menuOpen={menuOpen} />
    </nav>
  );
};

const Logo = () => (
  <div className="relative z-10">
    <Image src="/images/logonew.png" alt="Logo" width={120} height={120} />
  </div>
);

const Links = () => (
  <div className="hidden items-center gap-2 md:flex">
    <GlassLink text="Home" link="#home" />
    <GlassLink text="Features" link="#features" />
    <GlassLink text="How it Works" link="#howitworks" />
    <GlassLink text="Pricing" link="#pricing" />
  </div>
);

const GlassLink = ({ text, link }: { text: string; link: string }) => {
  return (
    <a
      href={link}
      className="group relative scale-100 overflow-hidden rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95"
    >
      <span className="relative z-10 text-white/90 transition-colors group-hover:text-white">
        {text}
      </span>
      <span className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </a>
  );
};

const TextLink = ({ text, link }: { text: string; link: string }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={link}
      onClick={handleClick}
      className="text-white/90 transition-colors hover:text-white"
    >
      {text}
    </a>
  );
};

const Buttons = ({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="flex items-center gap-4">
    {/* Login Button */}
    <Button
      duration={6000}
      className="text-white font-semibold"
      containerClassName="w-32 h-10 border-brandBlue/[8%] rounded-full border p-[0.31rem]"
    >
      Login
    </Button>

    {/* Mobile Menu Button */}
    <button
      onClick={() => setMenuOpen((pv) => !pv)}
      className="ml-2 block scale-100 text-3xl text-white/90 transition-all hover:scale-105 hover:text-white active:scale-95 md:hidden"
    >
      <FiMenu />
    </button>
  </div>
);

const MobileMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  const [ref, { height }] = useMeasure();
  return (
    <motion.div
      initial={false}
      animate={{
        height: menuOpen ? height : "0px",
      }}
      className="block overflow-hidden md:hidden"
    >
      <div ref={ref} className="flex flex-col items-start px-4 pb-4">
        <div className="flex flex-col items-start gap-4 pl-4">
          <TextLink text="Home" link="#home" />
          <TextLink text="Features" link="#features" />
          <TextLink text="How it Works" link="#howitworks" />
          <TextLink text="Pricing" link="#pricing" />
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;