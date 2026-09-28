import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ReadingListDocument } from './Models/ReadingList.schema.js';
import {
  READINGLIST_REPO,
  type IReadingListRepository,
} from './Repo/IReadingList.repository.js';
import { Types } from 'mongoose';

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
}
