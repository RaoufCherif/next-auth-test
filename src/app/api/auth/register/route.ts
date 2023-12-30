import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest, res: any) {
  const body = await request.json();

  const { name, email, password } = body;

  if (!body.data.name || !body.data.email || !body.data.password) {
    return new NextResponse("Missing name, email, or password", {
      status: 400,
    });
  }

  const exist = await prisma.user.findUnique({
    where: { email: body.data.email },
  });

  if (exist) {
    return new NextResponse("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.data.password, 10);
 

  const newUser = await prisma.user.create({
    data: {
      email: body.data.email,
      name: body.data.name,
      password: hashedPassword,
    },
  });
  // return res.send({user: newUser, message:"Utilisateur enregistré avec succès"})

  return NextResponse.json(newUser);
}
