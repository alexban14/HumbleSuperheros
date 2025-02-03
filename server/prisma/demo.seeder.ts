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
            { name: 'Superman', superpower: 'Super Strength', humility_score: 8, user_id: user.id },
            { name: 'Batman', superpower: 'Genius-Level Intellect', humility_score: 9, user_id: user.id },
            { name: 'Wonder Woman', superpower: 'Superhuman Strength', humility_score: 8, user_id: user.id },
            { name: 'Flash', superpower: 'Super Speed', humility_score: 9, user_id: user.id },
            { name: 'Aquaman', superpower: 'Hydrokinesis', humility_score: 7, user_id: user.id },
            { name: 'Green Lantern', superpower: 'Power Ring', humility_score: 9, user_id: user.id },
            { name: 'Martian Manhunter', superpower: 'Shape-shifting & Telepathy', humility_score: 8, user_id: user.id },
            { name: 'Green Arrow', superpower: 'Master Archer', humility_score: 9, user_id: user.id },
            { name: 'Hawkeye', superpower: 'Master Archer', humility_score: 8, user_id: user.id },
            { name: 'Iron Man', superpower: 'Powered Armor Suit', humility_score: 9, user_id: user.id },
            { name: 'Captain America', superpower: 'Super Soldier Serum', humility_score: 10, user_id: user.id },
            { name: 'Black Panther', superpower: 'Enhanced Strength', humility_score: 10, user_id: user.id },
            { name: 'Thor', superpower: 'Godly Strength & Control over Lightning', humility_score: 7, user_id: user.id },
            { name: 'Doctor Strange', superpower: 'Mastery of Magic', humility_score: 8, user_id: user.id },
            { name: 'Black Widow', superpower: 'Expert Spy & Martial Artist', humility_score: 9, user_id: user.id },
            { name: 'Scarlet Witch', superpower: 'Reality Warping', humility_score: 7, user_id: user.id },
            { name: 'Spider-Man', superpower: 'Wall-Crawling & Web-Shooting', humility_score: 9, user_id: user.id },
            { name: 'Deadpool', superpower: 'Regeneration & Martial Arts', humility_score: 6, user_id: user.id },
            { name: 'Wolverine', superpower: 'Regenerative Healing Factor', humility_score: 8, user_id: user.id },
            { name: 'Luke Cage', superpower: 'Invulnerable Skin & Super Strength', humility_score: 7, user_id: user.id },
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
