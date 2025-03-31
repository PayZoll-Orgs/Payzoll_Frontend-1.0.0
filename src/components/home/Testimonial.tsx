"use client";
import Image from "next/image";
import Card from "../ui/Card";
import { motion } from "framer-motion";

function Testimonial(): React.JSX.Element {
  return (
    <section className="mt-[5vw] flex flex-col items-center gap-y-[5rem] md:gap-y-[9.69rem] bg-black py-20">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(45, 139, 117, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(45, 139, 117, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-light relative text-shadow-glow">
          <span className="text-[#c8ceee]">MEET OUR LOVING USERS</span>
        </h2>
        <p className="text-[#A9A9A9] mt-4 max-w-2xl mx-auto">
          Discover how innovative companies are transforming their payroll 
          processes with PayZoll's cutting-edge blockchain technology.
        </p>
      </motion.div>

      {/* Testimonial Grid */}
      <div className="grid gap-9 md:grid-cols-2 xl:grid-cols-3 mb-20 relative z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-9"
        >
          <Card>
            <Image
              src="/images/test1.jpg"
              alt="Secret Management Kit"
              width={150}
              height={200}
              className="mx-auto rounded-full mt-10 object-cover mb-5"
            />
            <div className="p-6">
              <h3 className="text-lg font-medium text-[#2D8B75]">Secret Management Kit</h3>
              <span className="text-base text-[#A9A9A9]">
                Seamlessly import, manage, and modify secrets directly in your 
                environment with our advanced security protocols.
              </span>
            </div>
          </Card>
          <Card>
            <Image
              src="/images/test2.jpg"
              alt="Import & Export"
              width={150}
              height={200}
              className="mx-auto rounded-full mt-10 object-cover mb-5"
            />
            <div className="p-6">
              <h3 className="text-lg font-medium text-[#2D8B75]">Effortless Integration</h3>
              <span className="text-base text-[#A9A9A9]">
                Easily import and export data across multiple platforms, 
                ensuring smooth data migration and backup.
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <div className="flex h-full flex-col justify-between">
              <div className="p-6">
                <h3 className="text-center text-lg font-medium text-[#2D8B75]">
                  Global Payroll Solutions
                </h3>
                <span className="text-center text-[#A9A9A9] block">
                  Revolutionize your international payroll with our 
                  cross-border blockchain payment infrastructure.
                </span>
              </div>
              <Image
                src="/images/test3.jpg"
                alt="Global Payroll Solutions"
                width={300}
                height={300}
                className="mx-auto rounded-full object-cover mb-10"
              />
            </div>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid gap-9 md:hidden xl:grid"
        >
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-[#2D8B75]">CLI Management</h3>
              <span className="text-base text-[#A9A9A9]">
                Powerful command-line interface for managing configurations 
                across multiple operating systems with precision.
              </span>
            </div>
            <Image
              src="/images/test4.jpg"
              alt="Command Line Interface"
              width={150}
              height={200}
              className="mx-auto rounded-full mt-10 object-cover mb-5"
            />
          </Card>
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-[#2D8B75]">Instant Snapshots</h3>
              <span className="text-base text-[#A9A9A9]">
                Capture and restore entire workspace configurations 
                with a single click, ensuring maximum flexibility.
              </span>
            </div>
            <Image
              src="/images/test5.jpg"
              alt="Workspace Snapshot"
              width={150}
              height={200}
              className="mx-auto rounded-full mt-10 object-cover mb-5"
            />
          </Card>
        </motion.div>
      </div>

      {/* Styled JSX */}
      <style jsx>{`
        * {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </section>
  );
}

export default Testimonial;