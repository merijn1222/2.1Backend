import { ApiProperty } from '@nestjs/swagger';
import { DESIRED_LENGTHS, type DesiredLength } from '../ReadingProfile.schema.js';

export class UpsertReadingProfileDto {
	@ApiProperty({
		type: String,
		required: true,
		description: "The student's reading level.",
		example: 'F1',
	})
	readingLevel!: string;

	@ApiProperty({
		type: [String],
		required: true,
		description: 'Preferred literature genres.',
		example: ['Fantasy', 'Mystery'],
	})
	genres!: string[];

	@ApiProperty({
		type: [String],
		required: true,
		description: 'Preferred themes in literature.',
		example: ['Friendship', 'Adventure'],
	})
	themes!: string[];

	@ApiProperty({
		enum: DESIRED_LENGTHS,
		required: true,
		description: 'Preferred length of literature.',
		example: 'short',
	})
	desiredLength!: DesiredLength;

	@ApiProperty({
		type: String,
		required: true,
		description: "The student's reading goal.",
		example: 'Read more fiction',
	})
	readingGoal!: string;

	@ApiProperty({
		type: Object,
		required: true,
		description: 'Answers keyed by question ID.',
		additionalProperties: { type: 'string' },
		example: {
			FictieWaargebeurd: 'Fictie',
			questionId2: 'Answer 2',
			questionId3: 'Answer 3',
		},
	})
	answers!: Record<string, string>;
}