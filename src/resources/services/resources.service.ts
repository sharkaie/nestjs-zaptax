import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { UpdateResourceDto } from '../dto/update-resource.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resource } from 'src/schemas/resource.schema';
import { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import { AddActionsResourceDto } from '../dto/addActions-resource.dto';

@Injectable()
export class ResourcesService {
    constructor(
        @InjectModel(Resource.name) private resourceModel: Model<Resource>,
    ) {}

    async create(createResourceDto: CreateResourceDto) {
        const isResourceExists = await this.resourceModel.findOne({
            name: createResourceDto.name,
        });
        if (isResourceExists)
            throw new ConflictException('Resource already exists');
        const newResource = new this.resourceModel(createResourceDto);
        return newResource.save();
    }

    async findAll({ query }: { query: Query }) {
        const keyword = query.keyword
            ? {
                  $or: [
                      {
                          name: {
                              $regex: `.*${query.keyword}.*`,
                              $options: 'i',
                          },
                      },
                      {
                          description: {
                              $regex: `.*${query.keyword}.*`,
                              $options: 'i',
                          },
                      },
                  ],
              }
            : {};
            
            let selectFields = {};
            if (query.select && typeof query.select === 'string') {
               selectFields = Object.fromEntries(
                   query.select.split(',').filter(Boolean)
                       .map(field => [field.trim(), 1])
               );
            }
            console.log(selectFields);

        // Add sorting logic
        const collationSettings = query.collation === "i" ? { locale: 'en', strength: 2 }: undefined;
        const sortOption = {};
        if (query.sortBy && typeof query.sortBy === 'string') {
            const sortFields = query.sortBy.split(',').filter(Boolean).map(field => field.trim());
            sortFields.forEach((field) => {
                const order = field[0] === '-' ? -1 : 1;
                const fieldName = field.replace(/^[-+]/, '');
                sortOption[fieldName] = order;
            });
        }
        if(query.paginated === 'false'){
            const resources = await this.resourceModel.find({
                ...keyword,
            })
            .select(selectFields)
            .collation(collationSettings)
            .sort(sortOption);
            if (!resources) throw new NotFoundException(`Resources not found`);
            return resources;
        }
        const responsesPerPage = query.limit ? Number(query.limit) : 10;
        const currentPage = Number(query.page) || 1;
        const skip = responsesPerPage * (currentPage - 1);
        const resources = await this.resourceModel.find({
            ...keyword,
        })
        .select(selectFields)
        .collation(collationSettings)
        .sort(sortOption)
        .limit(responsesPerPage)
        .skip(skip);
        if (!resources) throw new NotFoundException(`Resources not found`);

        const totalCount = await this.resourceModel.countDocuments(keyword);
        const pageCount = Math.ceil(totalCount / responsesPerPage);

        return {
            resources,
            _metadata: {
                totalCount,
                pageCount,
                currentPage,
                responsesPerPage,
            },
        };
    }

    async findOne(id: string) {
        const resource = await this.resourceModel.findById(id);
        if (!resource) throw new NotFoundException(`Resource not found`);
        return resource;
    }

    async update(id: string, updateResourceDto: UpdateResourceDto) {
        const resource = await this.resourceModel.findByIdAndUpdate(
            id,
            updateResourceDto,
            {
                new: true,
            },
        );
        if (!resource) throw new NotFoundException(`Resource not found`);
        return resource;
    }

    // async addActions(id: string, addActionsResourceDto: AddActionsResourceDto) {
    //     const resource = await this.resourceModel.findById(id);
    //     if (!resource) throw new NotFoundException(`Resource not found`);
    //     const updatedResource = await resource.updateOne(
    //         {
    //             $push: {
    //                 actions: { $each: addActionsResourceDto.actions }
    //             }
    //         },
    //         {
    //             new: true,
    //         },
    //     );
    //     return updatedResource;
    // }

    async remove(id: string) {
        const resource = await this.resourceModel.findByIdAndDelete(id, {
            new: true,
        });
        if (!resource) throw new NotFoundException(`Resource not found`);
        return resource;
    }

    async removeMany({ resources }: { resources: string[] }) {
        const deleteManyResource = await this.resourceModel.deleteMany({
            _id: {
                $in: resources,
            },
        });

        if (deleteManyResource.deletedCount === 0) throw new NotFoundException(`Resources not found`);
        if (!deleteManyResource.acknowledged) {
            throw new InternalServerErrorException(
                'Something went wrong while deleting resources',
            );
        }

        const notDeletedResources = await this.resourceModel.find({
            _id: {
                $in: resources,
            },
        });

        const resourcesDeleted = notDeletedResources
            .filter(resource => !resources.includes(resource._id.toString()))
            .map(resource => resource._id.toString());
        return {
            deletedResources: resourcesDeleted,
            deletedCount: deleteManyResource.deletedCount,
            acknowledged: deleteManyResource.acknowledged,
        };
    }
}
