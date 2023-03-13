// @ts-ignore
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma1 = new PrismaClient();

// @ts-ignore
async function main() {
    // create two dummy articles
    const post1 = await prisma1.product.upsert({
        where: { title: 'Product1' },
        update: {},
        create: {
            title: 'Product1',
            description:
                "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
            price: '12'
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
        await prisma1.$disconnect();
    });
