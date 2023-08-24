import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
import { RepositoryModule } from './repository';
import { CachingModule } from './caching/caching.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { FirebaseModule } from './firebase';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthorsModule } from './authors/authors.module';
import { ProductsModule } from './products/products.module';
import { CommentProductModule } from './comment-product/comment-product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    DatabaseModule,
    RepositoryModule,
    CachingModule,
    FileManagerModule,
    FirebaseModule,
    AuthModule,
    UserModule,
    AuthorsModule,
    CategoriesModule,
    ProductsModule,
    CommentProductModule,
    WarehouseModule,
    OrderModule,
    CartModule,
  ],
})
export class AppModule {}
