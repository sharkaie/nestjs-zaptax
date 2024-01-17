import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: false })
    description?: string;

    @Prop({ type: Boolean, required: true, default: true })
    isActive: boolean;

    @Prop({ type: Array, required: true })
    actions: string[];
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
