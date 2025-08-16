// app/api/test/route.js
import prisma from "@/lib/prismaClient";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function GET(_) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return Response.json({ auth: false, userData: null });
  }
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    if (userData) {
      return Response.json({ auth: true, userData });
    }
    return Response.json({ auth: false, userData: null });
  } catch (error) {
    return Response.json({ auth: false, userData: null });
  }
}
export async function POST(request) {
  const contentType = request.headers.get("content-type") || "";

  let email, password;

  if (contentType.includes("application/json")) {
    const body = await request.json();
    email = body.email;
    password = body.password;
  } else if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    email = form.get("email");
    password = form.get("password");
  } else if (contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await request.formData();
    email = formData.get("email");
    password = formData.get("password");
  } else {
    return Response.json(
      { error: "Unsupported content type" },
      { status: 415 }
    );
  }

  console.log(process.env.NODE_ENV);

  try {
    const checkUser = await prisma.userAccountData.findFirst({
      where: { email },
    });

    if (!checkUser) {
      // return Response.redirect(
      //   `${process.env.NEXT_FRONTEND_URL}/login?error=User Not Found`,
      //   302
      // );
      return Response.json(
        { status: false, message: "User Not Found" },
        { status: 404 }
      );
    }
    if (checkUser.password !== password) {
      // return Response.redirect(
      //   `${process.env.NEXT_FRONTEND_URL}/login?error=Invalid Password`,
      //   302
      // );
      return Response.json(
        { status: false, message: "Invalid Password" },
        { status: 309 }
      );
    }

    console.log(checkUser, "User Login Successfully");

    // return Response.redirect(`${process.env.NEXT_FRONTEND_URL}/`, 302);
    delete checkUser.password;
    return Response.json(
      { status: false, message: "Login Successfully", user: checkUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.redirect(
      `${process.env.NEXT_FRONTEND_URL}/login?error=Internal Server Error`,
      302
    );
  }
}
