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
import { NationEnum, ProvinceCityEnum, statusOrder } from '@/common';

@plugin(MongoosePaginate)
@modelOptions({
  schemaOptions: {
    collection: 'orders',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Order extends Base {
  constructor(partial: Partial<Order>) {
    super();
    Object.assign(this, partial);
  }

  @prop()
  recipientName: string;

  @prop()
  email: string;

  @prop()
  phone: string;

  @prop({ default: NationEnum.VN })
  nation: NationEnum;

  @prop({ default: ProvinceCityEnum.HCM })
  provinceCity: ProvinceCityEnum;

  @prop()
  district: string;

  @prop()
  wards: string;

  @prop()
  address: string;

  @prop({ default: statusOrder.WAITING })
  isConfirm: statusOrder;

  static paginate: PaginateMethod<Order>;
}
