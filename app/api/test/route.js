import prisma from "@/lib/prismaClient";
export async function GET() {
  try {
    await prisma.test.create({ data: { email: "sn9273671@gmail.com" } });
    return new Response.json({ data: true });
  } catch (error) {
    console.log(error);

    return new Response.json({ data: false, error });
  }
}
