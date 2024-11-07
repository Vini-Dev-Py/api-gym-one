import { prisma } from './../../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: "Vinii",
        email: "vinii@gmail.com",
        password: await bcrypt.hash("vinii", 10),
      }
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });