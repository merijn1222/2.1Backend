import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Literature,
  LiteratureDocument,
} from '../../Literature/Models/Literature.schema.js';
import {
  ReadingList,
  ReadingListDocument,
} from '../Models/ReadingList.schema.js';
import type {
  AddLiteratureResult,
  IReadingListRepository,
  RemoveLiteratureResult,
} from './IReadingList.repository.js';

@Injectable()
export class MongoReadingListRepository
  implements IReadingListRepository
{
  constructor(
    @InjectModel(ReadingList.name)
    private readonly readingListModel: Model<ReadingListDocument>,
    @InjectModel(Literature.name)
    private readonly literatureModel: Model<LiteratureDocument>,
  ) {}

  async getReadingList(
    studentId: string,
  ): Promise<ReadingListDocument | null> {
    return this.readingListModel
      .findOne({ studentId })
      .populate('items.literatureId')
      .exec();
  }

  async createReadingList(studentId: string): Promise<void> {
    await this.readingListModel.create({
      studentId,
      items: [],
    });
  }

  async addLiterature(
    studentId: string,
    literatureId: string,
  ): Promise<AddLiteratureResult> {
    const literatureObjectId = new Types.ObjectId(literatureId);
    const literature = await this.literatureModel.exists({
      _id: literatureObjectId,
    });

    if (!literature) {
      return { status: 'literature-not-found' };
    }

    const readingList = await this.readingListModel
      .findOneAndUpdate(
        {
          studentId,
          'items.literatureId': { $ne: literatureObjectId },
        },
        {
          $push: {
            items: {
              literatureId: literatureObjectId,
              read: false,
            },
          },
        },
        { new: true, runValidators: true },
      )
      .populate('items.literatureId')
      .exec();

    if (readingList) {
      return { status: 'added', readingList };
    }

    const existingReadingList = await this.readingListModel
      .findOne({ studentId })
      .select({ _id: 1 })
      .lean()
      .exec();

    if (!existingReadingList) {
      return { status: 'reading-list-not-found' };
    }

    return { status: 'already-added' };
  }

  async removeLiterature(
    studentId: string,
    literatureId: string,
  ): Promise<RemoveLiteratureResult> {
    const literatureObjectId = new Types.ObjectId(literatureId);
    const readingList = await this.readingListModel
      .findOneAndUpdate(
        {
          studentId,
          'items.literatureId': literatureObjectId,
        },
        {
          $pull: {
            items: { literatureId: literatureObjectId },
          },
        },
        { new: true, runValidators: true },
      )
      .populate('items.literatureId')
      .exec();

    if (readingList) {
      return { status: 'removed', readingList };
    }

    const existingReadingList = await this.readingListModel
      .findOne({ studentId })
      .select({ _id: 1 })
      .lean()
      .exec();

    if (!existingReadingList) {
      return { status: 'reading-list-not-found' };
    }

    return { status: 'literature-not-in-list' };
  }
}
