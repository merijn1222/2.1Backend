import { Global, Module } from '@nestjs/common';
import { LocalBoekRepository } from './Local/LocalBoek.repository.js';
import { OnlineBoekRepository } from './Online/OnlineBoek.repository.js';
import { BOEK_REPO } from './Interfaces/IBoek.repository.js'
import { AUTH_REPO } from './Interfaces/IAuth.repository.js';
import { PROFIEL_REPO } from './Interfaces/IProfiel.repository.js';
import { LocalAuthRepository } from './Local/LocalAuth.repository.js';
import { LocalProfielRepository } from './Local/LocalProfiel.repository.js';
import { OnlineProfielRepository } from './Online/OnlineProfiel.repository.js';
import { OnlineAuthRepository } from './Online/OnlineAuth.repository.js';

const USE_ONLINE_DATABASE = false;

@Global()
@Module({

providers: [
  {
    provide: BOEK_REPO,
    useClass: USE_ONLINE_DATABASE
      ? OnlineBoekRepository
      : LocalBoekRepository,
  },
  {
    provide: PROFIEL_REPO,
    useClass: USE_ONLINE_DATABASE
      ? OnlineProfielRepository
      : LocalProfielRepository,
  },
  {
    provide: AUTH_REPO,
    useClass: USE_ONLINE_DATABASE
      ? OnlineAuthRepository
      : LocalAuthRepository,
  },
],
exports: [
  BOEK_REPO,
  PROFIEL_REPO,
  AUTH_REPO,
],
})
export class DbModule {}