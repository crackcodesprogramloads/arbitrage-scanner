"use server";

import prisma from "../lib/prismaClient";

export async function createUser(authUserID: string, authUserEmail: string, authUserTimeJoined: number) {
  await prisma.user.create({
    data: {
      authId: authUserID,
      email: authUserEmail,
      timeJoined: authUserTimeJoined,
    },
  });

  const allUsers = await prisma.user.findMany();
  console.dir(allUsers, { depth: null });
}

// createUser(authUserID, authUserEmail, authUserTimeJoined)
//   .catch(async (e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
