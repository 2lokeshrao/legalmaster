import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { generateSecurePDF } from "@/lib/pdf";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ agreementId: string }> }
) {
  const { agreementId } = await params;
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const agreement = await prisma.agreement.findUnique({
    where: { id: agreementId },
    include: { template: true }
  });

  if (!agreement || agreement.userId !== session.user.id) {
    return new Response("Not Found", { status: 404 });
  }

  const formData = agreement.formData as any;
  const isPaid = agreement.status === "Paid";
  let content = agreement.template.content;

  // Replace placeholders with actual data
  Object.entries(formData).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(placeholder, value as string);
  });

  // Add current date
  content = content.replace(/{{currentDate}}/g, new Date().toLocaleDateString('en-GB'));

  // Convert Markdown-like content to simple HTML for PDF
  const html = `
    <div style="font-family: 'Times New Roman', serif; color: #111;">
      ${content.split('\n').map(line => {
        if (line.startsWith('# ')) return `<h1 style="text-align: center; font-size: 24px; margin-bottom: 30px;">${line.substring(2)}</h1>`;
        if (line.startsWith('**')) return `<p style="margin-bottom: 15px;"><strong>${line.replace(/\*\*/g, '')}</strong></p>`;
        if (line.trim() === '') return '<br/>';
        return `<p style="margin-bottom: 10px; text-align: justify;">${line}</p>`;
      }).join('')}
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
