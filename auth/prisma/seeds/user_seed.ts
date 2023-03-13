import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // create one dummy user
    const post1 = await prisma.user.upsert({
        where: { login: 'User1' },
        update: {},
        create: {
            login: 'User1',
            password: '$2b$12$pGYmpoK1/0VAuDRSiXiNxur5is8FI6IC2cZOifbysWb7JbIUAoQlS',
            description:
                "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!"
        },
    });

    console.log({ post1 });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });
