// app/api/test/route.js
import prisma from "@/lib/prismaClient";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(request) {
  const requestData = await request?.formData();
  const firstName = requestData?.get("first_name");
  const lastName = requestData?.get("last_name");
  const email = requestData?.get("email");
  const password = requestData?.get("password");
  console.log(process.env.NODE_ENV);
  try {
    let checkUser = await prisma.userAccountData.findFirst({
      where: { email },
    });
    console.log(checkUser);
    if (checkUser) {
      return Response.json(
        {
          status: false,
          message: "User Already Exist! Please Login",
        },
        { status: 409 }
      );
    }
    let newUser = await prisma.userAccountData.create({
      data: { firstName, lastName, email, password, accountType: "credentials" },
    });
    return Response.json(
      { status: true, message: "Account Created Successfully", user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { status: true, message: error, user: null },
      { status: 200 }
    );
  }
}
