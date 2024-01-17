import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from './controllers/permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from 'src/schemas/permission.schema';
import { Resource, ResourceSchema } from 'src/schemas/resource.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Permission.name,
                schema: PermissionSchema,
            },
            {
                name: Resource.name,
                schema: ResourceSchema,
            },
        ]),
    ],
    controllers: [PermissionsController],
    providers: [PermissionsService],
})
export class PermissionsModule {}
