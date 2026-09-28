import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ _id: false })
export class ReadingListItem {
	@Prop({
		type: MongooseSchema.Types.ObjectId,
		ref: 'Literature',
		required: true,
	})
	literatureId: Types.ObjectId;

	@Prop({ type: Boolean, required: true })
	read: boolean;

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

@Schema()
export class ReadingList {
	@Prop({ type: String, required: true, unique: true, index: true })
	studentId: string;

	@Prop({ type: [ReadingListItemSchema], default: [] })
	items: ReadingListItem[];
}

export type ReadingListDocument = HydratedDocument<ReadingList>;

export const ReadingListSchema =
	SchemaFactory.createForClass(ReadingList);
