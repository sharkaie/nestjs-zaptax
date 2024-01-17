import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourcesModule } from './resources/resources.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { TokensModule } from './tokens/tokens.module';
import { FormsModule } from './forms/forms.module';
import { ResponsesModule } from './responses/responses.module';
import { LotSubmissionsModule } from './lot-submissions/lot-submissions.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        UsersModule,
        ResourcesModule,
        PermissionsModule,
        RolesModule,
        TokensModule,
        FormsModule,
        ResponsesModule,
        LotSubmissionsModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
