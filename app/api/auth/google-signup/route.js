import prisma from "@/lib/prismaClient";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function POST(request) {
  const cookieStore = await cookies();
  try {
    let token = request?.headers?.get("Authorization")?.split(" ")[1];
    if (token) {
      let userGoogleRes = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!userGoogleRes.ok) {
        return new Response.json(
          { status: false, message: "UnAuthorized Request!", user: null },
          { status: 401 }
        );
      }
      let userGoogleData = await userGoogleRes.json();
      if (userGoogleData) {
        let existingUser = await prisma.userAccountData.findUnique({
          where: { email: userGoogleData.email },
        });

        if (existingUser) {
          return new Response.json({
            status: false,
            message: "User Already Exists! Please Login",
            user: null,
          });
        }
        let checkUserInDB = await prisma.userAccountData.create({
          data: {
            userName: userGoogleData?.name || "Anonymous",
            email: userGoogleData?.email,
            googleId: userGoogleData?.sub,
            password: "",
            dp: userGoogleData?.picture,
            accountType: "google",
          },
        });
        if (checkUserInDB) {
          let newToken = jwt.sign(
            { email: checkUserInDB?.email },
            process.env?.JWT_SECRET,
            {
              expiresIn: "30d",
            }
          );
          cookieStore.set("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 30 * 24 * 60 * 60,
          });
          return new Response.json({
            status: true,
            message: "Login SuccessFully",
            user: userGoogleData,
          });
        }
        return new Response.json({
          status: false,
          message: "User Not Found! Please Signup",
          user: null,
        });
      }
      return new Response.json({
        status: false,
        message: "User Not Found! Please Signup",
        user: null,
      });
    }
    return new Response.json(
      { status: false, message: "Invalid Credentials!", user: null },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
    return new Response.json({
      status: false,
      message: "Internal Server Error! Try Again Later",
      user: null,
    });
  }
}
