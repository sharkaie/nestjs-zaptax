import { Module } from '@nestjs/common';
import { LotSubmissionsService } from './lot-submissions.service';
import { LotSubmissionsController } from './lot-submissions.controller';

@Module({
    controllers: [LotSubmissionsController],
    providers: [LotSubmissionsService],
})
export class LotSubmissionsModule {}
