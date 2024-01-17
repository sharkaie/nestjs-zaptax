import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class UserSetting {
    @Prop({ required: true })
    receiveNotification: string;

    @Prop({ required: true })
    receiveEmail: string;

    @Prop({ required: true })
    receiveSMS: string;
}

export const UserSettingSchema = SchemaFactory.createForClass(UserSetting);
