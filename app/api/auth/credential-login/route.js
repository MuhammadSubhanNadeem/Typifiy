// app/api/test/route.js
import prisma from "@/lib/prismaClient";
import bcrypt from "bcrypt";
export async function POST(request) {
  const requestData = await request?.json();
  const email = requestData?.email;
  const password = requestData?.password;
  try {
    const checkUser = await prisma.userAccountData.findFirst({
      where: { email, accountType: "credentials" },
    });

    if (!checkUser) {
      return Response.json(
        { status: false, message: "User Not Found! Please Signup" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return Response.json(
        { status: false, message: "Incorrect Password" },
        { status: 409 }
      );
    }

    console.log(checkUser, "User Login Successfully");

    // return Response.redirect(`${process.env.NEXT_FRONTEND_URL}/`, 302);
    delete checkUser.password;
    return Response.json(
      { status: true, message: "Login Successfully", user: checkUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ status: false, message: error?.message }, { status: 500 });
  }
}
