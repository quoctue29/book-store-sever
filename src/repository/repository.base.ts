import { Types } from 'mongoose';
import { defaultClasses, modelOptions } from '@typegoose/typegoose';
import { Exclude, Expose } from 'class-transformer';
import { OmitType } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    // This ensures virtuals and getters are exposed when calling toObject() || toJSON()
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
    timestamps: true,
  },
})
export class Base
  extends defaultClasses.TimeStamps
  implements defaultClasses.Base
{
  @Exclude()
  _id: Types.ObjectId;

  @Exclude()
  __v: string;

  @Expose()
  id: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}

export class NoUpdateBase extends OmitType(Base, ['updatedAt']) {}
