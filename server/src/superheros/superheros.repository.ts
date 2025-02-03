import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {SuperheroCreateDto, SuperheroDto} from '../dtos/superhero.dto';

@Injectable()
export class SuperherosRepository {
    constructor(private prisma: PrismaService) {}

    async createSuperhero(data: SuperheroCreateDto) {
        return this.prisma.superhero.create({ data });
    }

    async getSuperheroes(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const superheroes = await this.prisma.superhero.findMany({
            orderBy: { humility_score: 'asc' },
            skip,
            take: pageSize,
        });

        const totalCount = await this.prisma.superhero.count();

        return {
            data: superheroes,
            pagination: {
                total: totalCount,
                page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
            },
        };
    }
}
