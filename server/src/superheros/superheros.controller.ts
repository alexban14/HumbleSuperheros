import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    BadRequestException
} from '@nestjs/common';
import { SuperherosService } from './superheros.service';
import {SuperheroCreateRequestSchema, SuperheroSchema} from '../dtos/superhero.dto';

@Controller('superheros')
export class SuperherosController {
    constructor(private superherosService: SuperherosService) {}

    // POST /superheros - Add a new superhero
    @Post()
    async createSuperhero(@Body() body: any) {
        const result = SuperheroCreateRequestSchema.safeParse(body);
        if (!result.success) {
            throw new BadRequestException(result.error.format());
        }
        return this.superherosService.createSuperhero(result.data);
    }

    @Get()
    async getSuperheroes(
        @Query('page') page: string = '1',
        @Query('pageSize') pageSize: string = '10'
    ) {
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        if (isNaN(pageNumber) || isNaN(pageSizeNumber) || pageNumber < 1 || pageSizeNumber < 1) {
            throw new BadRequestException('Invalid pagination parameters');
        }

        return this.superherosService.getSuperheroes(pageNumber, pageSizeNumber);
    }
}
