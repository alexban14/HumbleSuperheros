import { Module } from '@nestjs/common';
import { SuperherosController } from './superheros.controller';
import { SuperherosService } from './superheros.service';
import {SuperherosRepository} from "./superheros.repository";
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [SuperherosController],
  providers: [SuperherosService, SuperherosRepository, PrismaService]
})
export class SuperherosModule {}
