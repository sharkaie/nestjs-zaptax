import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { LotSubmissionsService } from './lot-submissions.service';
import { CreateLotSubmissionDto } from './dto/create-lot-submission.dto';
import { UpdateLotSubmissionDto } from './dto/update-lot-submission.dto';

@Controller('lot-submissions')
export class LotSubmissionsController {
    constructor(
        private readonly lotSubmissionsService: LotSubmissionsService,
    ) {}

    @Post()
    create(@Body() createLotSubmissionDto: CreateLotSubmissionDto) {
        return this.lotSubmissionsService.create(createLotSubmissionDto);
    }

    @Get()
    findAll() {
        return this.lotSubmissionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.lotSubmissionsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateLotSubmissionDto: UpdateLotSubmissionDto,
    ) {
        return this.lotSubmissionsService.update(+id, updateLotSubmissionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.lotSubmissionsService.remove(+id);
    }
}
