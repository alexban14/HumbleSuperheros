import { Injectable, NotFoundException } from '@nestjs/common';
import { SuperherosRepository } from './superheros.repository';
import {SuperheroCreateDto, SuperheroCreateRequestDto, SuperheroDto} from '../dtos/superhero.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class SuperherosService {
    constructor(
        private superherosRepository: SuperherosRepository,
        private prisma: PrismaService
    ) {}

    async createSuperhero(data: SuperheroCreateRequestDto) {
        let userId: string = data.user_id ?? '';
        if (userId === '') {
            const firstUser = await this.prisma.user.findFirst();
            if (!firstUser) {
                throw new NotFoundException('No users found. Please create a user first.');
            }
            userId = firstUser.id;
        }

        const superhero: SuperheroCreateDto = {
            ...data,
            user_id: userId
        }

        console.log(superhero);

        return this.superherosRepository.createSuperhero(superhero);
    }

    async getSuperheroes(page: number, pageSize: number) {
        return this.superherosRepository.getSuperheroes(page, pageSize);
    }
}
