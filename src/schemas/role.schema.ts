import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Permission } from './permission.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    description?: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
        required: true,
    })
    permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
