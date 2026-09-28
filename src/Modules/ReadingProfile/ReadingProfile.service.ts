import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { READINGPROFILE_REPO } from './Repo/IReadingProfile.repository.js';
import type { IReadingProfileRepository } from './Repo/IReadingProfile.repository.js';
import type { ReadingProfileDocument } from './Models/ReadingProfile.schema.js';
import type { UpsertReadingProfileDto } from './Models/DTO/UpsertReadingProfileDto.js';

@Injectable()
export class ReadingProfileService {
  constructor(
    @Inject(READINGPROFILE_REPO)
    private readonly repo: IReadingProfileRepository,
  ) { }

  async getProfile(studentId: string): Promise<ReadingProfileDocument> {
    let profile: ReadingProfileDocument | null;

    try {
      profile = await this.repo.getProfile(studentId);
    } catch {
      throw new InternalServerErrorException(
        'Een onverwachte fout is opgetreden',
      );
    }

    if (!profile) {
      throw new NotFoundException('Reading profile not found');
    }

    return profile;
  }

  async upsertReadingProfile(
    studentId: string,
    profile: UpsertReadingProfileDto,
  ): Promise<ReadingProfileDocument> {
    try {
      return await this.repo.upsertReadingProfile(studentId, profile);
    } catch {
      throw new InternalServerErrorException(
        'Een onverwachte fout is opgetreden',
      );
    }
  }
}
