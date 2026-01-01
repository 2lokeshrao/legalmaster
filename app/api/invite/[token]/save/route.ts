import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const agreement = await prisma.agreement.findUnique({
    where: { inviteToken: token }
  });

  if (!agreement) {
    return new Response("Not Found", { status: 404 });
  }

  if (agreement.status === "Paid") {
    return new Response("Agreement is locked", { status: 403 });
  }

  const newFormData = await request.json();
  
  // Merge with existing data
  const mergedData = { ...(agreement.formData as any), ...newFormData };

  await prisma.agreement.update({
    where: { id: agreement.id },
    data: {
      formData: mergedData,
    },
  });

  return NextResponse.json({ success: true });
}
