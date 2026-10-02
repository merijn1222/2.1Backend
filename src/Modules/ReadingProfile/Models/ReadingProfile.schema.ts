import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ versionKey: false })
export class ReadingProfile {
	@ApiProperty({ type: String, description: 'MongoDB ObjectId' })
	_id!: Types.ObjectId;

	@ApiProperty()
	@Prop({ type: String, required: true, unique: true, index: true })
	studentId: string;

	@ApiProperty()
	@Prop({ type: String, required: true })
	readingLevel: string;

	@ApiProperty({ type: [String] })
	@Prop({ type: [String], default: [], required: true })
	genres: string[];

	@ApiProperty({ type: [String] })
	@Prop({ type: [String], default: [], required: true })
	themes: string[];

	@ApiProperty()
	@Prop({ type: String, required: true })
	desiredLength: string;

	@ApiProperty()
	@Prop({ type: String, required: true })
	readingGoal: string;

	@ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
	@Prop({ type: Map, of: String, default: {}, required: true })
	answers: Map<string, string>;
}

export type ReadingProfileDocument = HydratedDocument<ReadingProfile>;

export const ReadingProfileSchema = SchemaFactory.createForClass(ReadingProfile);