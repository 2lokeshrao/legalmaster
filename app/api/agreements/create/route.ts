import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { searchParams } = new URL(request.url);
  const templateId = searchParams.get("templateId");
  const mode = searchParams.get("mode");

  if (!templateId || !mode) redirect("/dashboard/create");

  const agreement = await prisma.agreement.create({
    data: {
      userId: session.user.id,
      templateId: templateId,
      inviteMode: mode === "invite",
      inviteToken: mode === "invite" ? nanoid(10) : null,
      formData: {},
      status: "Draft",
    },
  });

  redirect(`/dashboard/edit/${agreement.id}`);
}
