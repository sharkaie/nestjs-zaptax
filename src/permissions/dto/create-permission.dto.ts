import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
    @IsMongoId()
    @IsNotEmpty()
    resourceId: string;

    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty()
    action: string;
}
