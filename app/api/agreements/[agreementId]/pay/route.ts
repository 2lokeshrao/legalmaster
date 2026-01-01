import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ agreementId: string }> }
) {
  const { agreementId } = await params;
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const agreement = await prisma.agreement.findUnique({
    where: { id: agreementId }
  });

  if (!agreement || agreement.userId !== session.user.id) {
    return new Response("Not Found", { status: 404 });
  }

  await prisma.agreement.update({
    where: { id: agreementId },
    data: {
      status: "Paid",
      isLocked: true,
    },
  });

  return NextResponse.json({ success: true });
}
