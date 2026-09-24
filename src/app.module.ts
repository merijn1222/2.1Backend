import { Module } from '@nestjs/common';
import { BoekModule } from './Modules/Boek/Boek.module.js';
import { DbModule } from './Db.module.js';
import { AuthModule } from './Modules/Auth/Auth.module.js';
import { ProfielModule } from './Modules/Profiel/Profiel.module.js';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './Modules/Student/Student.module.js';
import { TeacherModule } from './Modules/Teacher/Teacher.module.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './Modules/Auth/Guards/Auth.Guard.js';

@Module({
  imports: [BoekModule,
            AuthModule,
            ProfielModule,
            StudentModule,
            TeacherModule,
            DbModule,
            ConfigModule.forRoot({
              isGlobal: true,
            })],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }]
})
export class AppModule {}