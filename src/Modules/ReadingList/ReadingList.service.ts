import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import type { ReadingListDocument } from './Models/ReadingList.schema.js';
import {
  READINGLIST_REPO,
  type AddRatingResult,
  type IReadingListRepository,
} from './Repo/IReadingList.repository.js';
import { Types } from 'mongoose';
import type { AddRatingDto } from './Models/DTO/AddRatingDto.js';

@Injectable()
export class ReadingListService {
  constructor(
    @Inject(READINGLIST_REPO)
    private readonly repo: IReadingListRepository,
  ) { }

  async getReadingList(studentId: string): Promise<ReadingListDocument> {
    const readingList = await this.repo.getReadingList(studentId);

    if (!readingList) {
      throw new NotFoundException('Reading list not found');
    }

    return readingList;
  }

  async addLiterature(
    studentId: string,
    literatureId: string,
  ): Promise<ReadingListDocument> {
    if (!Types.ObjectId.isValid(literatureId)) {
      throw new BadRequestException('Invalid literature ID');
    }

    const result = await this.repo.addLiterature(studentId, literatureId);

    switch (result.status) {
      case 'added':
        return result.readingList;
      case 'reading-list-not-found':
        throw new NotFoundException('Reading list not found');
      case 'literature-not-found':
        throw new NotFoundException('Literature not found');
      case 'already-added':
        throw new ConflictException(
          'Literature is already in the reading list',
        );
    }
  }

  async removeLiterature(
    studentId: string,
    literatureId: string,
  ): Promise<ReadingListDocument> {
    if (!Types.ObjectId.isValid(literatureId)) {
      throw new BadRequestException('Invalid literature ID');
    }

    const result = await this.repo.removeLiterature(studentId, literatureId);

    switch (result.status) {
      case 'removed':
        return result.readingList;
      case 'reading-list-not-found':
        throw new NotFoundException('Reading list not found');
      case 'literature-not-in-list':
        throw new NotFoundException('Literature is not in the reading list');
    }
  }

  async addRating(
    studentId: string | null,
    dto: AddRatingDto,
  ): Promise<ReadingListDocument> {
    if (!studentId) {
      throw new ForbiddenException('Student ID is missing from the access token');
    }

    if (!Types.ObjectId.isValid(dto.literatureId)) {
      throw new BadRequestException('literatureId must be a valid MongoDB ObjectId');
    }

    if (
      dto.rating !== undefined &&
      (typeof dto.rating !== 'number' ||
        !Number.isInteger(dto.rating) ||
        dto.rating < 1 ||
        dto.rating > 5)
    ) {
      throw new BadRequestException('rating must be an integer between 1 and 5');
    }

    if (typeof dto.read !== 'boolean') {
      throw new BadRequestException('read must be a boolean');
    }
    
    let result: AddRatingResult;
    try {
      result = await this.repo.addRating(
        studentId,
        dto.literatureId,
        dto.rating,
        dto.read,
      );
    } catch {
      throw new InternalServerErrorException('Onverwachte fout opgetreden');
    }

    switch (result.status) {
      case 'rated':
        return result.readingList;
      case 'reading-list-not-found':
        throw new NotFoundException('Reading list not found');
      case 'literature-not-in-list':
        throw new NotFoundException('Literature is not in the reading list');
      default:
        throw new InternalServerErrorException('Onverwachte fout opgetreden');
    }
  }
}
