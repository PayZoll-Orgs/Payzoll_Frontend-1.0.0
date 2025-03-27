"use client";
import Image from "next/image";
import Card from "../ui/Card";

function Testimonial(): React.JSX.Element {
  return (
    <section className="mt-[5vw] flex flex-col items-center gap-y-[5rem] md:gap-y-[9.69rem]">
      <div className="text-brandBlue/80 flex flex-col ">
      <h2 className="text-3xl md:text-5xl font-light relative text-shadow-glow">
  <span className="text-[#c8ceee]">MEET OUR LOVING USERS</span>
  <span className="text-gray-300"></span>
  </h2>
      </div>

      <div className="grid gap-9 md:grid-cols-2 xl:grid-cols-3 mb-20">
        <div className="grid gap-9">
          <Card>
            <Image
              src="/images/test1.jpg" // Replace with the actual image path
              alt="Secret Management Kit"
              width={150}
              height={200}
              className="mx-auto rounded-full mt-10 object-cover mb-5"
            />
            <div className="p-6">
              <h3 className="text-lg font-medium">Secret Management Kit</h3>
              <span className="text-base text-[#9394A1]">
                Import, Manage, and Modify Secrets Directly in Your Environment
                with Our SMK
              </span>
            </div>
          </Card>
          <Card>
            <Image
              src="/images/test2.jpg" // Replace with the actual image path
              alt="Import & Export"
              width={150}
              height={200}
              className="mx-auto rounded-full mt-10 object-cover mb-5"
            />
            <div className="p-6">
              <h3 className="text-lg font-medium">Import & Export</h3>
              <span className="text-base text-[#9394A1]">
                Import Data from External Platforms and Export to Share or
                Backup Your Configurations.
              </span>
            </div>
          </Card>
        </div>
        <Card>
          <div className="flex h-full flex-col justify-between">
            <div className="p-6">
              <h3 className="text-center text-lg font-medium">
                Seamless Integration
              </h3>
              <span className="text-center text-[#9394A1]">
                Effortlessly Connect and Sync Your Data with Partner Platforms
                to Ensure Enhanced Workflow Efficiency.
              </span>
            </div>
            <Image
              src="/images/test3.jpg" // Replace with the actual image path
              alt="Seamless Integration"
              width={300}
              height={300}
              className="mx-auto rounded-full  object-cover mb-20"
            />
          </div>
        </Card>
        <div className="grid gap-9 md:hidden xl:grid">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium">Command Line Interface</h3>
              <span className="text-base text-[#9394A1]">
                Manage Your Configurations Directly from Your Terminal across
                Multiple OS
              </span>
            </div>
            <Image
              src="/images/test4.jpg" // Replace with the actual image path
              alt="Command Line Interface"
              width={150}
              height={200}
              className="mx-auto rounded-full mt-10 object-cover mb-5"
            />
          </Card>
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium">Snapshot</h3>
              <span className="text-base text-[#9394A1]">
                Capture &quot;Pictures&quot; of Your Entire Workspace for Easy
                Restoration at Any Time.
              </span>
            </div>
            <Image
              src="/images/test5.jpg" // Replace with the actual image path
              alt="Snapshot"
              width={150}
              height={200}
              className="mx-auto rounded-full mt-10 object-cover mb-5"
            />
          </Card>
        </div>
        <div className="hidden md:grid xl:hidden">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium">Command Line Interface</h3>
              <span className="text-base text-[#9394A1]">
                Manage Your Configurations Directly from Your Terminal across
                Multiple OS
              </span>
            </div>
            <Image
              src="/images/command-line-interface.png" // Replace with the actual image path
              alt="Command Line Interface"
              width={100}
              height={100}
              className="mx-auto"
            />
          </Card>
        </div>
        <div className="hidden md:grid xl:hidden">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium">Snapshot</h3>
              <span className="text-base text-[#9394A1]">
                Capture &quot;Pictures&quot; of Your Entire Workspace for Easy
                Restoration at Any Time.
              </span>
            </div>
            <Image
              src="/images/snapshot.png" // Replace with the actual image path
              alt="Snapshot"
              width={100}
              height={100}
              className="mx-auto"
            />
          </Card>
        </div>
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