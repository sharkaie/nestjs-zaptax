import { Module } from '@nestjs/common';
import { ResourcesService } from './services/resources.service';
import { ResourcesController } from './controllers/resources.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource, ResourceSchema } from 'src/schemas/resource.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Resource.name,
                schema: ResourceSchema,
            },
        ]),
    ],
    controllers: [ResourcesController],
    providers: [ResourcesService],
})
export class ResourcesModule {}
