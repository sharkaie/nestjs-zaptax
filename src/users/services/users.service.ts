import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto) {
        const isUserExists = await this.userModel.findOne({
            email: createUserDto.email,
        });
        console.log(isUserExists);

        // If already exists, throw an error
        if (isUserExists) throw new ConflictException('User already exists');

        const newUser = new this.userModel(createUserDto);
        return newUser.save();
        // return {
        //     message: `This action adds a new user`,
        // };
    }

    findAll() {
        const users = this.userModel.find();
        return users;
    }

    findOne(id: string) {
        const user = this.userModel.findById(id);
        if (!user) throw new NotFoundException(`User not found`);
        return user;
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        const user = this.userModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
        if (!user) throw new NotFoundException(`User not found`);
        return user;
    }

    async remove(id: string) {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) throw new NotFoundException(`User not found`);
        return user;
    }
}
