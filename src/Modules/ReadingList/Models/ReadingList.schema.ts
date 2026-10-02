import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Literature } from '../../Literature/Models/Literature.schema.js';

@Schema({ _id: false, versionKey: false })
export class ReadingListItem {
	@ApiProperty({ type: () => Literature, description: 'Populated literature item' })
	@Prop({
		type: MongooseSchema.Types.ObjectId,
		ref: 'Literature',
		required: true,
	})
	literatureId: Types.ObjectId;

	@ApiProperty()
	@Prop({ type: Boolean, required: true })
	read: boolean;

	@ApiProperty({ required: false })
	@Prop({
		type: Number,
		min: 1,
		max: 5,
		validate: Number.isInteger,
	})
	rating?: number;
}

const ReadingListItemSchema =
	SchemaFactory.createForClass(ReadingListItem);

@Schema({ versionKey: false })
export class ReadingList {
	@ApiProperty({ type: String, description: 'MongoDB ObjectId' })
	_id!: Types.ObjectId;

	@ApiProperty()
	@Prop({ type: String, required: true, unique: true, index: true })
	studentId: string;

	@ApiProperty({ type: [ReadingListItem] })
	@Prop({ type: [ReadingListItemSchema], default: [] })
	items: ReadingListItem[];
}

export type ReadingListDocument = HydratedDocument<ReadingList>;

export const ReadingListSchema =
	SchemaFactory.createForClass(ReadingList);
