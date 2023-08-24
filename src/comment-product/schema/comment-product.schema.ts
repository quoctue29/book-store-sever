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
    collection: 'comment-products',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class CommentProduct extends Base {
  constructor(partial: Partial<CommentProduct>) {
    super();
    Object.assign(this, partial);
  }

  @prop()
  comment: string;

  @prop()
  productId: string;

  @prop()
  userId: string;

  static paginate: PaginateMethod<CommentProduct>;
}
