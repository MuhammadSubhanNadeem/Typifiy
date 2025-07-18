import prisma from "@/lib/prismaClient";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get("token")?.value) {
      let token = request.headers.get("Authorization")?.split(" ")[1];
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
          let checkUserInDB = await prisma.userAccountData.findFirst({
            where: { email: userGoogleData?.email },
          });

          console.log(checkUserInDB);
          if (checkUserInDB) {
            let token = jwt.sign(
              { email: checkUserInDB?.email },
              process.env?.JWT_SECRET,
              {
                expiresIn: "30d",
              }
            );
            cookieStore.set("token", token, {
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
      return new Response.json({
        status: false,
        message: "Invalid Data!",
        user: null,
      });
    } else {
      try {
        let token = cookieStore.get("token")?.value;
        let userData = jwt.verify(token, process.env?.JWT_SECRET);
        if (userData) {
          let checkUserInDB = await prisma.userAccountData.findFirst({
            where: { email: userData?.email },
          });

          if (checkUserInDB) {
            return new Response.json({
              status: true,
              message: "Login SuccessFully",
              user: checkUserInDB,
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
      } catch (error) {
        return new Response.json({
          status: false,
          message: "Invalid Token! Please Login Again",
          user: null,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return new Response.json({
      status: false,
      message: "Internal Server Error! Try Again Later",
      user: null,
    });
  }
}
