import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LiteratureDocument = HydratedDocument<Literature>;

@Schema()
export class Literature {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  author: string;

  @Prop({ required: true, type: String })
  type: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  level: string;

  @Prop({ type: [String] })
  themes: string[];

  @Prop({ type: [String] })
  genre: string[];

  @Prop({ type: Number })
  length: number;

  @Prop({ type: String })
  url: string;
}

export const LiteratureSchema = SchemaFactory.createForClass(Literature);