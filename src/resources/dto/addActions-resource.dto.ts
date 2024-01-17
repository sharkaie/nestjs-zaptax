// import { PartialType } from '@nestjs/mapped-types';
// import { CreateResourceDto } from './create-resource.dto';

// export class AddActionResourceDto extends PartialType(CreateResourceDto) {}


import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import constants from 'src/constants';

export class AddActionsResourceDto {
    @IsString({ each: true })
    // @IsNotEmpty()
    @IsNotEmpty({ each: true })
    @IsEnum(constants.RESOURCE_PERMISSIONS, { each: true })
    actions: string[];
}
