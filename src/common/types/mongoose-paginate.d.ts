import { DocumentType } from '@typegoose/typegoose';
import { PaginateResult, PaginateOptions } from 'mongoose';

declare module '@typegoose/typegoose' {
  /**
   * @description Extra type for mongoose-pagination, mongoose-pagination-v2 plugins
   */
  type PaginateMethod<T> = (
    query?: FilterQuery<DocumentType<T>>,
    options?: PaginateOptions,
    callback?: (err: any, result: PaginateResult<DocumentType<T>>) => void,
  ) => Promise<PaginateResult<DocumentType<T>>>;
}
