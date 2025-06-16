import { PrismaClient } from "prisma/prisma-client";
export default prismaClientProvider () {
    if (!global?.prisma) {
        global.prisma = new PrismaClient();
    }
    return  global.prisma;
}