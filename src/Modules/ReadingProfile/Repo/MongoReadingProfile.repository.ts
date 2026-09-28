import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    ReadingProfile,
    ReadingProfileDocument,
} from '../Models/ReadingProfile.schema.js';
import type { UpsertReadingProfileDto } from '../Models/DTO/UpsertReadingProfileDto.js';
import type { IReadingProfileRepository } from './IReadingProfile.repository.js';

@Injectable()
export class MongoReadingProfileRepository implements IReadingProfileRepository {
    constructor(
        @InjectModel(ReadingProfile.name)
        private readonly readingProfileModel: Model<ReadingProfileDocument>,
    ) {}

    getProfile(studentId: string): Promise<ReadingProfileDocument | null> {
        return this.readingProfileModel.findOne({ studentId }).exec();
    }

    upsertReadingProfile(
        studentId: string,
        profile: UpsertReadingProfileDto,
    ): Promise<ReadingProfileDocument> {
        return this.readingProfileModel
            .findOneAndUpdate(
                { studentId },
                { $set: profile },
                { new: true, upsert: true, runValidators: true },
            )
            .exec();
    }
}