import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  virtuals: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Group {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'University' })
  universityId: mongoose.Schema.Types.ObjectId;
}

const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.virtual('students', {
  ref: 'Student',
  localField: '_id',
  foreignField: 'groupId',
});

export { GroupSchema };
