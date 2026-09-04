import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BoekModule } from './Modules/Boek/Boek.module.js';
import { DbModule } from './Database/Db.module.js';
import { AuthModule } from './Modules/Auth/Auth.module.js';
import { ProfielModule } from './Modules/Profiel/Profiel.module.js';

@Module({
  imports: [BoekModule,
            AuthModule,
            ProfielModule,
            DbModule],
})
export class AppModule {}