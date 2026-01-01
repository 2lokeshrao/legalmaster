import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { agreementId: string } }
) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const agreement = await prisma.agreement.findUnique({
    where: { id: params.agreementId }
  });

  if (!agreement || agreement.userId !== session.user.id) {
    return new Response("Not Found", { status: 404 });
  }

  // In a real app, we'd integrate with a payment gateway here
  // For this prototype, we'll just mark it as paid and lock it
  await prisma.agreement.update({
    where: { id: params.agreementId },
    data: {
      status: "Paid",
      isLocked: true,
    },
  });

  return NextResponse.json({ success: true });
}
