import { prisma } from "@/lib/db";
import { login } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, mobile, password } = await request.json();
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        mobile,
        passwordHash,
      },
    });

    await login({ id: user.id, email: user.email, name: user.name });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
