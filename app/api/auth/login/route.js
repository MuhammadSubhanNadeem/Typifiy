// app/api/test/route.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function GET(request) {
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
