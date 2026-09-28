import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ versionKey: false })
export class ReadingProfile {
	@Prop({ type: String, required: true, unique: true, index: true })
	studentId: string;

	@Prop({ type: String, required: true })
	readingLevel: string;

	@Prop({ type: [String], default: [], required: true })
	genres: string[];

	@Prop({ type: [String], default: [], required: true })
	themes: string[];

	@Prop({ type: String, required: true })
	desiredLength: string;

	@Prop({ type: String, required: true })
	readingGoal: string;

	@Prop({ type: Map, of: String, default: {}, required: true })
	answers: Map<string, string>;
}

export type ReadingProfileDocument = HydratedDocument<ReadingProfile>;

export const ReadingProfileSchema = SchemaFactory.createForClass(ReadingProfile);