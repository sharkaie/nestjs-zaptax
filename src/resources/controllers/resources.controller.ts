import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    Query
} from '@nestjs/common';
import { ResourcesService } from '../services/resources.service';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { UpdateResourceDto } from '../dto/update-resource.dto';
import { ValidateMongoId } from 'src/pipes/ValidateMongoId.pipe';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { DeleteManyResourcesDto } from '../dto/deleteMany-resources.dto';
import { AddActionsResourceDto } from '../dto/addActions-resource.dto';

@Controller({ path: 'resources', version: '1' })
export class ResourcesController {
    constructor(private readonly resourcesService: ResourcesService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createResourceDto: CreateResourceDto) {
        return this.resourcesService.create(createResourceDto);
    }

    // TODO: Add all entities to the findAll method (ListAllEntities)
    @Get()
    findAll(@Query() query: ExpressQuery) {
        return this.resourcesService.findAll({ query });
    }

    @Get(':id')
    findOne(@Param('id', ValidateMongoId) id: string) {
        return this.resourcesService.findOne(id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    update(
        @Param('id', ValidateMongoId) id: string,
        @Body() updateResourceDto: UpdateResourceDto,
    ) {
        return this.resourcesService.update(id, updateResourceDto);
    }

    // @Patch(':id')
    // @UsePipes(new ValidationPipe())
    // addActions(
    //     @Param('id', ValidateMongoId) id: string,
    //     @Body() addActionsResourceDto: AddActionsResourceDto,
    // ) {
    //     return this.resourcesService.addActions(id, addActionsResourceDto);
    // }

    @Delete(':id')
    remove(@Param('id', ValidateMongoId) id: string) {
        return this.resourcesService.remove(id);
    }

    @Delete('')
    @UsePipes(new ValidationPipe())
    deleteMany(@Body() resources: DeleteManyResourcesDto) {
        return this.resourcesService.removeMany(resources);
    }
}
