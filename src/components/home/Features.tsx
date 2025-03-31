"use client";
import Card from '../ui/Card'

const cardData = [
  {
    heading: 'Cross-Chain Efficiency',
    description:
      'PayZoll leverages Stargate protocol to seamlessly transfer funds across different blockchains and convert them to stablecoins, enabling global payments with minimal fees.',
    imageSrc: '/images/monii.png'
  },
  {
    heading: 'Enterprise-Grade Security',
    description:
      'The system employs AES-256 encryption, Shamir\'s Secret Sharing for data sharding, IPFS distributed storage, and blockchain verification hashes to protect sensitive employee information.',
    imageSrc: '/images/versioning.png'
  },
  {
    heading: 'Smart Contract Architecture',
    description:
      'The modular contract system (Registry, Verification, Paymaster) creates a flexible yet secure framework for managing departments, employees, and payroll batches.',
    imageSrc: '/images/role-based-access.png'
  },
  {
    heading: 'Transparent Transactions',
    description:
      'Blockchain integration ensures every payroll transaction is recorded securely and cannot be tampered with, providing a verifiable audit trail.',
    imageSrc: '/images/public-key-encryption.png'
  },
  {
    heading: 'Global Accessibility:',
    description:
      'PayZoll supports multiple currencies and crypto-to-fiat conversions, making it ideal for businesses with international teams',
    imageSrc: '/images/variables.png'
  },
  {
    heading: 'Automated Workflows',
    description:
      'Smart contracts automate salary calculations and payment processing, with future AI integration planned to further streamline operations',
    imageSrc: '/images/auditing-alerting.png'
  }
]

function Features(): React.JSX.Element {
  return (
    <section className="mt-40 flex min-h-[20vh] w-full flex-col items-center gap-y-[5rem] p-6 sm:mt-40 md:gap-y-[9.69rem] landscape:mt-40 bg-black relative">
      {/* Background Grid - Adding from testimonial */}
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

      <div className="flex flex-col gap-y-[0.81rem] relative z-10">
        <h2 className="text-3xl md:text-5xl font-light relative text-shadow-glow">
          <span className="text-[#c8ceee]">WHY CHOOSE PAYZOLL?</span>
          <span className="text-gray-300"></span>
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:gap-9 relative z-10">
        {cardData.map((card, index) => {
          const { heading, description } = card
          return (
            <Card key={index}>
              <div className="flex flex-col h-full p-6">
                <h3 className="text-xl font-medium mb-3 text-[#2D8B75]">{heading}</h3>
                <p className="text-sm text-[#A9A9A9] leading-relaxed">{description}</p>
                <div className="mt-auto pt-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#2D8B75] to-[#45B69C] rounded-full"></div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Styled JSX */}
      <style jsx>{`
        * {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </section>
  )
}

export default Features