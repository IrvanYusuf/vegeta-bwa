import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();
    console.log("Payload:", payload);
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (
      !user ||
      !user.password ||
      !bcrypt.compareSync(payload.password, user.password)
    ) {
      return Response({
        message: "failed sign in",
        data: { error: "Invalid credentials" },
        status: 400,
      });
    }

    const data: Partial<User> = { ...user, password: undefined };
    return Response({ message: "success sign in", data });
  } catch (error: any) {
    console.log("error api", error);

    return Response({ message: "failed sign in", data: error, status: 500 });
  }
};
