import { Global, Module } from '@nestjs/common';
import { MongoBoekRepository } from './Modules/Boek/Repo/MongoBoek.repository.js';
import { BOEK_REPO } from './Modules/Boek/Repo/IBoek.repository.js'
import { AUTH_REPO } from './Modules/Auth/Repo/IAuth.repository.js';
import { PROFIEL_REPO } from './Modules/Profiel/Repo/IProfiel.repository.js';
import { MongoProfielRepository } from './Modules/Profiel/Repo/MongoProfiel.repository.js';
import { PostAuthRepository } from './Modules/Auth/Repo/PostAuth.repository.js';
import { PrismaService } from './Database/Prisma/prisma.service.js';
import { STUDENT_REPO } from './Modules/Student/Repo/IStudent.repository.js';
import { PostStudentRepository } from './Modules/Student/Repo/PostStudent.repository.js';
import { TEACHER_REPO } from './Modules/Teacher/Repo/ITeacher.repository.js';
import { PostTeacherRepository } from './Modules/Teacher/Repo/PostTeacher.repository.js';

@Global()
@Module({

providers: [
  PrismaService,

  {
    provide: BOEK_REPO,
    useClass: MongoBoekRepository
  },
  {
    provide: PROFIEL_REPO,
    useClass: MongoProfielRepository
  },
  {
    provide: AUTH_REPO,
    useClass: PostAuthRepository,
  },
  {
    provide: STUDENT_REPO,
    useClass: PostStudentRepository
  },
  {
    provide: TEACHER_REPO,
    useClass: PostTeacherRepository,
  }
],
exports: [
  BOEK_REPO,
  PROFIEL_REPO,
  AUTH_REPO,
  STUDENT_REPO,
  TEACHER_REPO,
],
})
export class DbModule {}