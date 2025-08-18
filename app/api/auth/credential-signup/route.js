// app/api/test/route.js
import prisma from "@/lib/prismaClient";
import bcrypt from "bcrypt";
export async function POST(request) {
  const requestData = await request?.json();
  const firstName = requestData?.firstName;
  const lastName = requestData?.lastName;
  const email = requestData?.email;
  const password = await bcrypt.hash(requestData?.password, 10);

  console.log(process.env.NODE_ENV);
  try {
    let checkUser = await prisma.userAccountData.findFirst({
      where: { email, accountType: "credentials" },
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
      data: {
        firstName,
        lastName,
        email,
        password,
        accountType: "credentials",
      },
    });
    return Response.json(
      { status: true, message: "Account Created Successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ status: false, message: error.message }, { status: 500 });
  }
}
