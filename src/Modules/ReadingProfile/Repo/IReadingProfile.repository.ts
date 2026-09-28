import type { ReadingProfileDocument } from '../Models/ReadingProfile.schema.js';
import type { UpsertReadingProfileDto } from '../Models/DTO/UpsertReadingProfileDto.js';

export const READINGPROFILE_REPO = Symbol('PROFIEL_REPOSITORY');

export interface IReadingProfileRepository {
    getProfile(studentId: string): Promise<ReadingProfileDocument | null>;
    upsertReadingProfile(
        studentId: string,
        profile: UpsertReadingProfileDto,
    ): Promise<ReadingProfileDocument>;
}