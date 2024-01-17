import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Resource } from './resource.schema';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission {
    @Prop({ required: false })
    description?: string;

    @Prop({ required: true })
    action: string;

    @Prop({ type: Boolean, default: true })
    isActive?: boolean;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true,
    })
    resourceId: Resource;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
