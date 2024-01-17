import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata): string {
        // Optional casting into ObjectId if wanted!
        if (mongoose.Types.ObjectId.isValid(value)) return value;
        throw new BadRequestException();
    }
}
