import type { ReadingListDocument } from '../Models/ReadingList.schema.js';

export const READINGLIST_REPO = Symbol('READINGLIST_REPOSITORY');

export type AddLiteratureResult =
  | { status: 'added'; readingList: ReadingListDocument }
  | { status: 'reading-list-not-found' }
  | { status: 'literature-not-found' }
  | { status: 'already-added' };

export type RemoveLiteratureResult =
  | { status: 'removed'; readingList: ReadingListDocument }
  | { status: 'reading-list-not-found' }
  | { status: 'literature-not-in-list' };

export type AddRatingResult =
  | { status: 'rated'; readingList: ReadingListDocument }
  | { status: 'reading-list-not-found' }
  | { status: 'literature-not-in-list' };

export interface IReadingListRepository {
  getReadingList(studentId: string): Promise<ReadingListDocument | null>;
  createReadingList(studentId: string): Promise<void>;
  addLiterature(
    studentId: string,
    literatureId: string,
  ): Promise<AddLiteratureResult>;
  removeLiterature(
    studentId: string,
    literatureId: string,
  ): Promise<RemoveLiteratureResult>;
  addRating(
    studentId: string,
    literatureId: string,
    rating: number | undefined,
    read: boolean,
  ): Promise<AddRatingResult>;
}
