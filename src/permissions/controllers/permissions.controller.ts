import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Version,
    ValidationPipe,
    UsePipes,
    ParseBoolPipe,
    Query,
} from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { ValidateMongoId } from 'src/pipes/ValidateMongoId.pipe';

@Controller({ path: 'permissions', version: '1' })
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionsService.create(createPermissionDto);
    }

    @Get()
    findAll(
        @Query('isActive', new ParseBoolPipe({ optional: true }))
        isActive?: boolean,
    ) {
        return this.permissionsService.findAll({ isActive });
    }

    @Get(':id')
    findOne(@Param('id', ValidateMongoId) id: string) {
        return this.permissionsService.findOne(id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    update(
        @Param('id', ValidateMongoId) id: string,
        @Body() updatePermissionDto: UpdatePermissionDto,
    ) {
        return this.permissionsService.update(id, updatePermissionDto);
    }

    @Delete(':id')
    remove(@Param('id', ValidateMongoId) id: string) {
        return this.permissionsService.remove(id);
    }
}
