import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing templates
  await prisma.template.deleteMany()

  const templates = [
    // Real Estate
    {
      title: "Rental Agreement",
      description: "Legally binding residential rent agreement for landlords and tenants. Includes all standard clauses.",
      price: 99,
      categoryId: "real-estate",
      requirementsText: "Aadhar Card of both parties, Property Address, PAN Card of Landlord.",
      formSchemaJson: {
        fields: [
          { name: "landlordName", label: "Landlord Full Name", type: "text", locked: true },
          { name: "landlordFatherName", label: "Landlord Father/Husband Name", type: "text", locked: true },
          { name: "landlordAddress", label: "Landlord Permanent Address", type: "textarea", locked: true },
          { name: "tenantName", label: "Tenant Full Name", type: "text", locked: true },
          { name: "tenantFatherName", label: "Tenant Father/Husband Name", type: "text", locked: true },
          { name: "tenantAddress", label: "Tenant Permanent Address", type: "textarea", locked: true },
          { name: "propertyAddress", label: "Rented Property Address", type: "textarea", locked: true },
          { name: "rentAmount", label: "Monthly Rent (₹)", type: "number", locked: false },
          { name: "securityDeposit", label: "Security Deposit (₹)", type: "number", locked: false },
          { name: "startDate", label: "Agreement Start Date", type: "date", locked: false },
          { name: "duration", label: "Duration (Months)", type: "number", locked: false },
          { name: "noticePeriod", label: "Notice Period (Days)", type: "number", locked: false },
          { name: "witness1Name", label: "Witness 1 Name", type: "text", locked: false },
          { name: "witness2Name", label: "Witness 2 Name", type: "text", locked: false },
        ]
      }
    },
    {
      title: "Lease Deed",
      description: "Comprehensive lease agreement for commercial or residential properties for long-term use.",
      price: 499,
      categoryId: "real-estate",
      requirementsText: "Property documents, Aadhar, PAN, Witness details.",
      formSchemaJson: {
        fields: [
          { name: "lessorName", label: "Lessor (Owner) Name", type: "text", locked: true },
          { name: "lesseeName", label: "Lessee (Tenant) Name", type: "text", locked: true },
          { name: "propertyDetails", label: "Property Description & Area", type: "textarea", locked: true },
          { name: "leasePeriod", label: "Lease Period (Years)", type: "number", locked: false },
          { name: "annualRent", label: "Annual Rent (₹)", type: "number", locked: false },
          { name: "escalationClause", label: "Rent Escalation % per year", type: "number", locked: false },
        ]
      }
    },
    {
      title: "Sale Agreement",
      description: "Agreement for sale of property between buyer and seller. Essential for property transactions.",
      price: 999,
      categoryId: "real-estate",
      requirementsText: "Property registry, Aadhar, PAN of both parties.",
      formSchemaJson: {
        fields: [
          { name: "sellerName", label: "Seller Name", type: "text", locked: true },
          { name: "buyerName", label: "Buyer Name", type: "text", locked: true },
          { name: "propertyAddress", label: "Property Address", type: "textarea", locked: true },
          { name: "totalSalePrice", label: "Total Sale Consideration (₹)", type: "number", locked: true },
          { name: "advancePaid", label: "Advance Amount Paid (₹)", type: "number", locked: false },
          { name: "balanceAmount", label: "Balance Amount (₹)", type: "number", locked: false },
          { name: "possessionDate", label: "Possession Date", type: "date", locked: false },
        ]
      }
    },

    // Business & Corporate
    {
      title: "NDA (Non-Disclosure Agreement)",
      description: "Confidentiality agreement to protect business secrets and sensitive information.",
      price: 199,
      categoryId: "business",
      requirementsText: "Company details, Purpose of NDA.",
      formSchemaJson: {
        fields: [
          { name: "disclosingParty", label: "Disclosing Party Name", type: "text", locked: true },
          { name: "receivingParty", label: "Receiving Party Name", type: "text", locked: true },
          { name: "purpose", label: "Purpose of Disclosure", type: "textarea", locked: false },
          { name: "duration", label: "Confidentiality Period (Years)", type: "number", locked: false },
          { name: "jurisdiction", label: "Governing Law / Jurisdiction", type: "text", locked: false },
        ]
      }
    },
    {
      title: "Partnership Deed",
      description: "Legal document for starting a partnership business. Defines roles and profit sharing.",
      price: 499,
      categoryId: "business",
      requirementsText: "Partner details, Capital contribution, Profit sharing ratio.",
      formSchemaJson: {
        fields: [
          { name: "firmName", label: "Partnership Firm Name", type: "text", locked: true },
          { name: "firmAddress", label: "Principal Place of Business", type: "textarea", locked: true },
          { name: "partner1Name", label: "Partner 1 Name", type: "text", locked: true },
          { name: "partner2Name", label: "Partner 2 Name", type: "text", locked: true },
          { name: "capital1", label: "Partner 1 Capital (₹)", type: "number", locked: false },
          { name: "capital2", label: "Partner 2 Capital (₹)", type: "number", locked: false },
          { name: "profitRatio", label: "Profit Sharing Ratio", type: "text", locked: false },
        ]
      }
    },

    // Legal & Personal
    {
      title: "Affidavit",
      description: "General, Name Change, or Address Proof affidavits. Legally vetted for court use.",
      price: 49,
      categoryId: "personal",
      requirementsText: "Aadhar Card, Purpose of Affidavit.",
      formSchemaJson: {
        fields: [
          { name: "declarantName", label: "Declarant Name", type: "text", locked: true },
          { name: "fatherName", label: "Father/Husband Name", type: "text", locked: true },
          { name: "age", label: "Age", type: "number", locked: true },
          { name: "address", label: "Full Address", type: "textarea", locked: true },
          { name: "purpose", label: "Purpose of Affidavit", type: "textarea", locked: false },
          { name: "declaration", label: "Declaration Content", type: "textarea", locked: false },
        ]
      }
    },
    {
      title: "Power of Attorney",
      description: "Legal authority given to someone to act on your behalf for property or legal matters.",
      price: 199,
      categoryId: "personal",
      requirementsText: "Principal details, Attorney details, Powers granted.",
      formSchemaJson: {
        fields: [
          { name: "principalName", label: "Principal (Giver) Name", type: "text", locked: true },
          { name: "attorneyName", label: "Attorney (Receiver) Name", type: "text", locked: true },
          { name: "powers", label: "Specific Powers Granted", type: "textarea", locked: false },
          { name: "validUntil", label: "Validity Date", type: "date", locked: false },
        ]
      }
    },

    // IT & Web
    {
      title: "Privacy Policy",
      description: "Legal pages for your website or mobile app. Compliant with data protection laws.",
      price: 199,
      categoryId: "legal-compliance",
      requirementsText: "Website URL, Company name, Data collection details.",
      formSchemaJson: {
        fields: [
          { name: "websiteName", label: "Website/App Name", type: "text", locked: true },
          { name: "companyName", label: "Company Name", type: "text", locked: true },
          { name: "contactEmail", label: "Support Email", type: "text", locked: false },
          { name: "dataCollected", label: "Types of Data Collected", type: "textarea", locked: false },
          { name: "thirdPartyServices", label: "Third Party Services Used", type: "textarea", locked: false },
        ]
      }
    }
  ]

  for (const t of templates) {
    await prisma.template.create({ data: t })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
