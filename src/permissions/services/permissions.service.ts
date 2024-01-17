import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from 'src/schemas/permission.schema';
import { Model } from 'mongoose';
import { Resource } from 'src/schemas/resource.schema';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectModel(Permission.name)
        private permissionModel: Model<Permission>,
        @InjectModel(Resource.name) private resourceModel: Model<Resource>,
    ) {}

    async create(createPermissionDto: CreatePermissionDto) {
        const isPermissionExists = await this.permissionModel.findOne({
            resourceId: createPermissionDto.resourceId,
            action: createPermissionDto.action,
        });
        if (isPermissionExists)
            throw new ConflictException('Permission already exists');

        const resource = await this.resourceModel.findById(
            createPermissionDto.resourceId,
        );
        if (!resource) throw new NotFoundException('Resource not found');
        if (!resource.actions.includes(createPermissionDto.action))
            throw new NotFoundException('Action not found');
        const newPermission = new this.permissionModel(createPermissionDto);
        return newPermission.save();
    }

    async findAll({ isActive = true }: { isActive: boolean }) {
        const permissions = await this.permissionModel.find({
            isActive,
        });
        return permissions;
    }

    async findOne(id: string) {
        const permission = await this.permissionModel.findById(id);
        if (!permission) throw new NotFoundException(`Permission not found`);
        return permission;
    }

    async update(id: string, updatePermissionDto: UpdatePermissionDto) {
        const permission = await this.permissionModel.findByIdAndUpdate(
            id,
            updatePermissionDto,
            {
                new: true,
            },
        );
        if (!permission) throw new NotFoundException(`Permission not found`);
        return permission;
    }

    async remove(id: string) {
        const permission = await this.permissionModel.findByIdAndDelete(id, {
            new: true,
        });
        if (!permission) throw new NotFoundException(`Permission not found`);
        return permission;
    }
}
