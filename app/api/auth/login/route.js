// app/api/test/route.js
import prisma from "@/lib/prismaClient";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function GET(_) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return new Response.json({ auth: false, userData: null });
  }
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    if (userData) {
      return new Response.json({ auth: true, userData });
    }
    return new Response.json({ auth: false, userData: null });
  } catch (error) {
    return new Response.json({ auth: false, userData: null });
  }
}
export async function POST(request) {
  const requestData = await request.formData();
  const email = requestData.get("email");
  const password = requestData.get("password");
  console.log(process.env.NODE_ENV);
  try {
    let checkUser = await prisma.userAccountData.findFirst({
      where: { email },
    });
    if (!checkUser) {
      return Response.redirect(
        `${process.env.NEXT_FRONTEND_URL}/login?error=User Not Found`,
        302
      );
    }
    if (checkUser?.password !== password) {
      return Response.redirect(
        `${process.env.NEXT_FRONTEND_URL}/login?error=Invalid Password`,
        302
      );
    }
    new Response.json(
      { status: true, message: "User Login Successfully", user: checkUser },
      { status: 200 }
    );
    return Response.redirect(`${process.env.NEXT_FRONTEND_URL}/`, 302);
  } catch (error) {
    console.log(error);

    return Response.redirect(
      `${process.env.NEXT_FRONTEND_URL}/login?error=Internal Server Error`,
      302
    );
  }
}
