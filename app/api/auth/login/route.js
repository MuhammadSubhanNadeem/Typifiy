// app/api/test/route.js
import { PrismaClient } from "@prisma/client";
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
  const requestData = await request.formData();
  const email = requestData.get('email');
  const password = requestData.get('password');
  console.log(process.env.NODE_ENV);
  
  try {
    return Response.redirect(`${process.env.NEXT_FRONTEND_URL}/`,302);
  } catch (error) {
    console.log(error);
    
    return Response.redirect(`${process.env.NEXT_FRONTEND_URL}/login`,302);
  }
}
