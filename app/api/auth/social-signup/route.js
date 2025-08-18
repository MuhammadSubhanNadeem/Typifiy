import prisma from "@/lib/prismaClient";
import jwt from "jsonwebtoken";
export async function POST(request) {
  let requestData = await request.json();
  if (
    !requestData?.firstName ||
    !requestData?.lastName ||
    !requestData?.email ||
    !requestData?.accountType
  ) {
    return Response.json(
      {
        status: false,
        message: "Required Data Missing!",
      },
      { status: 409 }
    );
  }
  try {
    let existingUser = await prisma.userAccountData.findUnique({
      where: {
        email: requestData?.email,
        accountType: requestData?.accountType,
      },
    });

    if (existingUser) {
      return Response.json(
        {
          status: false,
          message: "User Already Exist! Please Login",
        },
        { status: 409 }
      );
    }
    let createdNewUser = await prisma.userAccountData.create({
      data: {
        userName: "Anonymous",
        firstName: requestData?.firstName,
        lastName: requestData?.lastName,
        email: requestData?.email,
        googleId: requestData?.googleId,
        password: "",
        dp: requestData?.dp || "",
        accountType: requestData?.accountType,
      },
    });
    if (createdNewUser) {
      let newToken = jwt.sign(
        {
          email: createdNewUser?.email,
          accountType: createdNewUser?.accountType,
        },
        process.env?.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      return Response.json(
        {
          status: true,
          message: "Login SuccessFully",
          user: createdNewUser,
          token: newToken,
        },
        { status: 201 }
      );
    }
    return Response.json(
      {
        status: false,
        message: "User Signup Failed! Try Again Later",
      },
      { status: 500 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        status: false,
        message: "Internal Server Error! Try Again Later",
      },
      { status: 500 }
    );
  }
}
