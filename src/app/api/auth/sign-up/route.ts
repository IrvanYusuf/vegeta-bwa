import Response from "@/lib/api.response";
import { SALT_BCRYPT } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

type CreateUserPayload = Pick<User, "name" | "email" | "password">;

export const POST = async (req: NextRequest) => {
  try {
    const payload = (await req.json()) as CreateUserPayload;
    const existing = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (existing) {
      return Response({
        message: "Email already exists",
        data: null,
        status: 400,
      });
    }

    const { name, email, password } = payload;

    const hashedPassword = await bcrypt.hash(password, SALT_BCRYPT);

    const create = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return Response({ message: "success sign up", data: create, status: 201 });
  } catch (error: any) {
    console.log("error api", error);

    return Response({
      message: "failed sign in",
      data: error.message || "Internal server error",
      status: 500,
    });
  }
};
