import { Module } from '@nestjs/common';
import { LiteratureModule } from './Modules/Literature/Literature.module.js';
import { DbModule } from './Db.module.js';
import { AuthModule } from './Modules/Auth/Auth.module.js';
import { ReadingProfileModule } from './Modules/ReadingProfile/ReadingProfile.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentModule } from './Modules/Student/Student.module.js';
import { TeacherModule } from './Modules/Teacher/Teacher.module.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './Modules/Auth/Guards/Auth.Guard.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingListModule } from './Modules/ReadingList/ReadingList.module.js';

@Module({
  imports: [
    LiteratureModule,
    AuthModule,
    ReadingProfileModule,
    StudentModule,
    TeacherModule,
    ReadingListModule,
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGO_DATABASE_URL'),
      }),
    }),
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }]
})
export class AppModule { }