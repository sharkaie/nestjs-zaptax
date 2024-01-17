import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import constants from 'src/constants';

export class CreateResourceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description?: string;

    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsEnum(constants.RESOURCE_PERMISSIONS, { each: true })
    actions: string[];
}
