"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import useMeasure from "react-use-measure";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/MovingBorder";

const Navbar = () => {
  const pathname = usePathname();
  console.log("Current path (navbar):", pathname);
  
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
  <Link href="/" className="relative z-10">
    <Image src="/images/logonew.png" alt="Logo" width={120} height={120} />
  </Link>
);

const Links = () => {
  const pathname = usePathname();
  console.log("Links component pathname:", pathname);
  
  return (
    <div className="hidden items-center gap-2 md:flex">
      <GlassLink text="Home" link="/" isActive={pathname === '/'} />
      <GlassLink text="Features" link="/Features" isActive={pathname === '/Features'} />
      <GlassLink text="How it Works" link="/working" isActive={pathname === '/working'} />
      <GlassLink text="Pricing" link="/Pricing" isActive={pathname === '/Pricing'} />
    </div>
  );
};

const GlassLink = ({ text, link, isActive }: { text: string; link: string; isActive?: boolean }) => {
  return (
    <Link
      href={link}
      className={`group relative scale-100 overflow-hidden rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95 ${isActive ? 'bg-white/10' : ''}`}
    >
      <span className={`relative z-10 ${isActive ? 'text-white' : 'text-white/90'} transition-colors group-hover:text-white`}>
        {text}
      </span>
      <span className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
};

const Buttons = ({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="flex items-center gap-4">
    {/* Login Button */}
    <Link href="/login">
      <Button
        duration={6000}
        className="text-white font-semibold"
        containerClassName="w-32 h-10 border-brandBlue/[8%] rounded-full border p-[0.31rem]"
      >
        Login
      </Button>
    </Link>

    {/* Mobile Menu Button */}
    <button
      onClick={() => setMenuOpen((pv) => !pv)}
      className="ml-2 block scale-100 text-3xl text-white/90 transition-all hover:scale-105 hover:text-white active:scale-95 md:hidden"
      aria-label="Toggle menu"
    >
      <FiMenu />
    </button>
  </div>
);

const MobileMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  const [ref, { height }] = useMeasure();
  const pathname = usePathname();
  
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
          <Link href="/" className={`text-white/90 transition-colors hover:text-white ${pathname === '/' ? 'text-white' : ''}`}>
            Home
          </Link>
          <Link href="/Features" className={`text-white/90 transition-colors hover:text-white ${pathname === '/Features' ? 'text-white' : ''}`}>
            Features
          </Link>
          <Link href="/working" className={`text-white/90 transition-colors hover:text-white ${pathname === '/working' ? 'text-white' : ''}`}>
            How it Works
          </Link>
          <Link href="/Pricing" className={`text-white/90 transition-colors hover:text-white ${pathname === '/Pricing' ? 'text-white' : ''}`}>
            Pricing
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;