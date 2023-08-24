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
    collection: 'products',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ name: 1, unique: 1 })
export class Product extends Base {
  constructor(partial: Partial<Product>) {
    super();
    Object.assign(this, partial);
  }

  @prop({ unique: true })
  name: string;

  @prop()
  imageUrl: string;

  @prop()
  description: string;

  @prop()
  price: number;

  @prop()
  provider: string;

  @prop()
  discount: number;

  @prop()
  publishingYear: number;

  @prop()
  publishingCompany: string;

  @prop()
  followers: string;

  @prop()
  authorId: string;

  @prop()
  categoryId: string;

  static paginate: PaginateMethod<Product>;
}
