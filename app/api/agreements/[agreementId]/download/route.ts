import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { generateSecurePDF } from "@/lib/pdf";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { agreementId: string } }
) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const agreement = await prisma.agreement.findUnique({
    where: { id: params.agreementId },
    include: { template: true }
  });

  if (!agreement || agreement.userId !== session.user.id) {
    return new Response("Not Found", { status: 404 });
  }

  const formData = agreement.formData as any;
  const isPaid = agreement.status === "Paid";

  // Simple HTML generation for the prototype
  const html = `
    <h1 style="text-align: center; color: #1e3a8a;">${agreement.template.title}</h1>
    <div style="margin-top: 40px;">
      ${Object.entries(formData).map(([key, value]) => `
        <div style="margin-bottom: 20px;">
          <strong style="text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}:</strong>
          <p style="margin-top: 5px;">${value}</p>
        </div>
      `).join('')}
    </div>
    <div style="margin-top: 60px;">
      <p>This agreement is legally binding and has been executed digitally.</p>
    </div>
  `;

  const pdf = await generateSecurePDF(html, isPaid, agreement.id);

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${agreement.template.title.replace(/\s+/g, '_')}.pdf"`,
    },
  });
}
