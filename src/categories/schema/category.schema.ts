import {
  index,
  modelOptions,
  plugin,
  Severity,
  PaginateMethod,
} from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';
import { TypeCategory } from '@/common';

import { Base } from '@/repository';

@plugin(MongoosePaginate)
@modelOptions({
  schemaOptions: {
    collection: 'categories',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ name: 1, unique: 1 })
export class Category extends Base {
  constructor(partial: Partial<Category>) {
    super();
    Object.assign(this, partial);
  }

  @prop({ unique: true })
  name: string;

  @prop()
  type: TypeCategory;

  static paginate: PaginateMethod<Category>;
}
