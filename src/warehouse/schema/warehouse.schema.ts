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
    collection: 'warehouse',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ productId: 1, unique: 1 })
export class Warehouse extends Base {
  constructor(partial: Partial<Warehouse>) {
    super();
    Object.assign(this, partial);
  }

  @prop({ unique: true })
  productId: string;

  @prop()
  amount: number;

  static paginate: PaginateMethod<Warehouse>;
}
