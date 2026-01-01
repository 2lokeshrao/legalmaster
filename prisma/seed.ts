import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.agreement.deleteMany()
  await prisma.template.deleteMany()
  await prisma.user.deleteMany()

  // Create Admin User
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@legalmaster.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    }
  });

  const templates = [
    {
      title: "Rental Agreement",
      description: "Standard residential rent agreement for landlords and tenants. Updated for 2026.",
      price: 99,
      categoryId: "real-estate",
      requirementsText: "Aadhar Card of both parties, Property Address, PAN Card of Landlord.",
      content: `
# RENTAL AGREEMENT

This Rental Agreement is made on this {{currentDate}} between:

**LANDLORD:** {{landlordName}}, son/daughter of {{landlordFatherName}}, residing at {{landlordAddress}}.
**TENANT:** {{tenantName}}, son/daughter of {{tenantFatherName}}, residing at {{tenantAddress}}.

**1. PROPERTY:** The Landlord agrees to rent the property located at {{propertyAddress}} to the Tenant.

**2. TERM:** The lease shall be for a period of {{duration}} months, starting from {{startDate}}.

**3. RENT:** The Tenant agrees to pay a monthly rent of ₹{{rentAmount}}.

**4. SECURITY DEPOSIT:** The Tenant has paid a security deposit of ₹{{securityDeposit}}.

**5. NOTICE PERIOD:** Either party can terminate this agreement by giving {{noticePeriod}} days notice.

**6. DIGITAL EXECUTION:** This agreement is executed digitally under the Information Technology Act, 2000.

**7. DISPUTE RESOLUTION:** Any disputes shall be resolved through online mediation.

**WITNESSES:**
1. {{witness1Name}}
2. {{witness2Name}}
      `,
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
      title: "NDA (Non-Disclosure Agreement)",
      description: "Confidentiality agreement to protect business secrets. Updated for 2026.",
      price: 199,
      categoryId: "business",
      requirementsText: "Company details, Purpose of NDA.",
      content: `
# NON-DISCLOSURE AGREEMENT

This NDA is entered into on {{currentDate}} between:

**DISCLOSING PARTY:** {{disclosingParty}}, located at {{disclosingAddress}}.
**RECEIVING PARTY:** {{receivingParty}}, located at {{receivingAddress}}.

**1. CONFIDENTIAL INFORMATION:** Includes all business data, trade secrets, and proprietary knowledge shared.

**2. OBLIGATIONS:** The Receiving Party shall maintain strict confidentiality and limit access to authorized personnel.

**3. DATA PROTECTION:** Compliance with Digital Personal Data Protection Act, 2023 is mandatory.

**4. DURATION:** This agreement remains effective for {{duration}} years.

**5. DISPUTE RESOLUTION:** Resolved through mediation via {{onlineMediationService}}.
      `,
      formSchemaJson: {
        fields: [
          { name: "disclosingParty", label: "Disclosing Party Name", type: "text", locked: true },
          { name: "disclosingAddress", label: "Disclosing Party Address", type: "textarea", locked: true },
          { name: "receivingParty", label: "Receiving Party Name", type: "text", locked: true },
          { name: "receivingAddress", label: "Receiving Party Address", type: "textarea", locked: true },
          { name: "duration", label: "Confidentiality Period (Years)", type: "number", locked: false },
          { name: "onlineMediationService", label: "Mediation Service Name", type: "text", locked: false },
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
