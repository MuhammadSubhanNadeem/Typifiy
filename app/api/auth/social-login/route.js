import prisma from "@/lib/prismaClient";
import jwt from "jsonwebtoken";
export async function GET(request) {
  try {
    let token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return Response.json(
        { status: false, message: "UnAuthorized Request!" },
        { status: 401 }
      );
    }
    let decodeToken = null;
    try {
      decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return Response.json(
        { status: false, message: "UnAuthorized Token!" },
        { status: 401 }
      );
    }
    if (!decodeToken) {
      return Response.json(
        { status: false, message: "UnAuthorized Request!" },
        { status: 401 }
      );
    }
    if (decodeToken?.email && decodeToken?.accountType) {
      let user = await prisma.userAccountData.findFirst({
        where: {
          email: decodeToken?.email,
          accountType: decodeToken?.accountType,
        },
      });
      if (user) {
        return Response.json(
          {
            status: true,
            message: "Login SuccessFully",
            user,
          },
          { status: 200 }
        );
      }
      return Response.json(
        {
          status: false,
          message: "User Not Found! Please Signup",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        status: false,
        message: "Invalid Credentials!",
      },
      { status: 409 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({
      status: false,
      message: "Internal Server Error! Try Again Later",
      user: null,
    });
  }
}
