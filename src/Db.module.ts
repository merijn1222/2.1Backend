import { Global, Module } from '@nestjs/common';
import { MongoLiteratureRepository } from './Modules/Literature/Repo/MongoLiterature.repository.js';
import { LITERATURE_REPO } from './Modules/Literature/Repo/ILiterature.repository.js'
import { AUTH_REPO } from './Modules/Auth/Repo/IAuth.repository.js';
import { READINGPROFILE_REPO } from './Modules/ReadingProfile/Repo/IReadingProfile.repository.js';
import { MongoReadingProfileRepository } from './Modules/ReadingProfile/Repo/MongoReadingProfile.repository.js';
import { PostAuthRepository } from './Modules/Auth/Repo/PostAuth.repository.js';
import { PrismaService } from './Database/Prisma/prisma.service.js';
import { STUDENT_REPO } from './Modules/Student/Repo/IStudent.repository.js';
import { PostStudentRepository } from './Modules/Student/Repo/PostStudent.repository.js';
import { TEACHER_REPO } from './Modules/Teacher/Repo/ITeacher.repository.js';
import { PostTeacherRepository } from './Modules/Teacher/Repo/PostTeacher.repository.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Literature, LiteratureSchema } from './Modules/Literature/Models/Literature.schema.js';
import { MongoReadingListRepository } from './Modules/ReadingList/Repo/MongoReadingList.repository.js';
import { READINGLIST_REPO } from './Modules/ReadingList/Repo/IReadingList.repository.js';
import { ReadingList, ReadingListSchema } from './Modules/ReadingList/Models/ReadingList.schema.js';
import { ReadingProfile, ReadingProfileSchema } from './Modules/ReadingProfile/Models/ReadingProfile.schema.js';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Literature.name, schema: LiteratureSchema },
      { name: ReadingList.name, schema: ReadingListSchema },
      { name: ReadingProfile.name, schema: ReadingProfileSchema },
    ])
  ],
  providers: [
    PrismaService,

    {
      provide: LITERATURE_REPO,
      useClass: MongoLiteratureRepository
    },
    {
      provide: READINGPROFILE_REPO,
      useClass: MongoReadingProfileRepository
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
    },
    {
      provide: READINGLIST_REPO,
      useClass: MongoReadingListRepository,
    },
  ],
  exports: [
    LITERATURE_REPO,
    READINGPROFILE_REPO,
    AUTH_REPO,
    STUDENT_REPO,
    TEACHER_REPO,
    READINGLIST_REPO,
    PrismaService,
  ],
})
export class DbModule { }