import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create a user
    const user = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: hashedPassword,
        },
    });

    console.log(`✅ User created: ${user.email}`);

    const superheroes = await prisma.superhero.createMany({
        data: [
            { name: 'Superman', superpower: 'Super Strength', humility_score: 80, user_id: user.id },
            { name: 'Batman', superpower: 'Genius-Level Intellect', humility_score: 95, user_id: user.id },
            { name: 'Wonder Woman', superpower: 'Superhuman Strength', humility_score: 85, user_id: user.id },
        ],
        skipDuplicates: true,
    });

    console.log(`✅ Superheroes seeded: ${superheroes.count}`);
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
