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
    where: { id: params.agreementId },
    include: { template: true }
  });

  if (!agreement || agreement.userId !== session.user.id) {
    return new Response("Not Found", { status: 404 });
  }

  const newFormData = await request.json();
  const templateSchema = agreement.template.formSchemaJson as any;
  const currentFormData = agreement.formData as any;

  // Locking Logic: If paid, prevent updating locked fields
  if (agreement.status === "Paid") {
    templateSchema.fields.forEach((field: any) => {
      if (field.locked) {
        newFormData[field.name] = currentFormData[field.name];
      }
    });
  }

  await prisma.agreement.update({
    where: { id: params.agreementId },
    data: {
      formData: newFormData,
    },
  });

  return NextResponse.json({ success: true });
}
