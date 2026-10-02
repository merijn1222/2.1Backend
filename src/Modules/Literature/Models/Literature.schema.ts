import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LiteratureDocument = HydratedDocument<Literature>;

@Schema({ versionKey: false })
export class Literature {
  @ApiProperty({ type: String, description: 'MongoDB ObjectId', example: '66f2a8c7e4b91d3a12ab45cd' })
  _id!: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true, type: String })
  title: string;

  @ApiProperty()
  @Prop({ required: true, type: String })
  author: string;

  @ApiProperty()
  @Prop({ required: true, type: String })
  type: string;

  @ApiProperty()
  @Prop({ required: true, type: String })
  description: string;

  @ApiProperty()
  @Prop({ required: true, type: String })
  level: string;

  @ApiProperty({ type: [String], required: false })
  @Prop({ type: [String] })
  themes: string[];

  @ApiProperty({ type: [String], required: false })
  @Prop({ type: [String] })
  genre: string[];

  @ApiProperty({ required: false })
  @Prop({ type: Number })
  length: number;

  @ApiProperty({ required: false })
  @Prop({ type: String })
  url: string;
}

export const LiteratureSchema = SchemaFactory.createForClass(Literature);