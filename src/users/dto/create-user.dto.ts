import {
    IsAlphanumeric,
    IsEmail,
    IsMongoId,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @IsString()
    lastName: string;
    @IsPhoneNumber('IN')
    phone: string;
    @IsEmail({}, { message: 'Invalid email' })
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsMongoId()
    roleId: string;
}
