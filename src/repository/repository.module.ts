import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { DatabaseModule } from '@/database';
import { RepositoryProvider } from './repository.provider';
import { User } from '@/users/schema/user.schema';
import { Category } from '@/categories/schema/category.schema';
import { Author } from '@/authors/schema/author.schema';
import { Product } from '@/products/schema/products.schema';
import { CommentProduct } from '@/comment-product/schema/comment-product.schema';
import { Warehouse } from '@/warehouse/schema/warehouse.schema';
import { Cart } from '@/cart/schema/cart.schema';
import { Order } from '@/order/schema/order.schema';

@Global()
@Module({
  imports: [
    DatabaseModule,
    TypegooseModule.forFeature([
      User,
      Author,
      Category,
      Product,
      CommentProduct,
      Warehouse,
      Cart,
      Order,
    ]),
  ],
  providers: [RepositoryProvider],
  exports: [RepositoryProvider],
})
export class RepositoryModule {}
