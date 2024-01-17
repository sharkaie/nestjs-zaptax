import { Injectable } from '@nestjs/common';
import { CreateLotSubmissionDto } from './dto/create-lot-submission.dto';
import { UpdateLotSubmissionDto } from './dto/update-lot-submission.dto';

@Injectable()
export class LotSubmissionsService {
    create(createLotSubmissionDto: CreateLotSubmissionDto) {
        return 'This action adds a new lotSubmission';
    }

    findAll() {
        return `This action returns all lotSubmissions`;
    }

    findOne(id: number) {
        return `This action returns a #${id} lotSubmission`;
    }

    update(id: number, updateLotSubmissionDto: UpdateLotSubmissionDto) {
        return `This action updates a #${id} lotSubmission`;
    }

    remove(id: number) {
        return `This action removes a #${id} lotSubmission`;
    }
}
