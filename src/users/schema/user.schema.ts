import {
  index,
  modelOptions,
  plugin,
  Severity,
  PaginateMethod,
} from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';
import { Role } from '../../common';

import { Base } from '../../repository/repository.base';

@plugin(MongoosePaginate)
@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ email: 1, unique: 1 })
@index({ userName: 1, unique: 1 })
export class User extends Base {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @prop({ unique: true })
  uid?: any;

  @prop({ unique: true })
  email: string;

  @prop({ unique: true })
  userName: string;

  @prop()
  password: string;

  @prop()
  fullName?: string;

  @prop()
  phone?: string;

  @prop()
  avatar?: string;

  @prop()
  address?: string;

  @prop({ default: false })
  isVerifiedEmail: boolean;

  @prop({ default: [Role.USER] })
  roles: Role[];

  @prop({ default: 1 })
  authVersion: number;

  static paginate: PaginateMethod<User>;
}
