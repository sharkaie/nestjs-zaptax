import { IsNotEmpty, IsString } from 'class-validator';
import { IsArray, IsMongoId, ValidateNested } from 'class-validator';

export class DeleteManyResourcesDto {
    @IsArray()
    @IsMongoId({ each: true })
    @IsNotEmpty({ each: true })
    resources: string[];
}
