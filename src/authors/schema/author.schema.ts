import {
  index,
  modelOptions,
  plugin,
  Severity,
  PaginateMethod,
} from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';

import { Base } from '@/repository';

@plugin(MongoosePaginate)
@modelOptions({
  schemaOptions: {
    collection: 'authors',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ name: 1, unique: 1 })
export class Author extends Base {
  constructor(partial: Partial<Author>) {
    super();
    Object.assign(this, partial);
  }

  @prop({ unique: true })
  name: string;

  @prop()
  description: string;

  static paginate: PaginateMethod<Author>;
}
