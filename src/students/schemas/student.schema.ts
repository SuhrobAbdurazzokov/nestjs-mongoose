import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  fullName: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  groupId: mongoose.Schema.Types.ObjectId;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
