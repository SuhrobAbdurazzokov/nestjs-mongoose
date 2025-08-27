import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  virtuals: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class University {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  email: true;

  @Prop({ required: true })
  address: string;
}

const UniversitySchema = SchemaFactory.createForClass(University);

UniversitySchema.virtual('groups', {
  ref: 'Group',
  localField: '_id',
  foreignField: 'universityId',
});

export { UniversitySchema };
