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
import { UserInfoDto } from '@/users/dto';

@plugin(MongoosePaginate)
@index({ email: 1, unique: 1 })
@modelOptions({
  schemaOptions: {
    collection: 'carts',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Cart extends Base {
  constructor(partial: Partial<Cart>) {
    super();
    Object.assign(this, partial);
  }

  @prop()
  email: string;

  @prop()
  productIds: any;

  @prop()
  totalProduct: number;

  @prop()
  totalPrice: number;

  static paginate: PaginateMethod<Cart>;
}
