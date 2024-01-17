import { PartialType } from '@nestjs/mapped-types';
import { CreateLotSubmissionDto } from './create-lot-submission.dto';

export class UpdateLotSubmissionDto extends PartialType(
    CreateLotSubmissionDto,
) {}
