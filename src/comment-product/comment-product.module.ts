import { Module } from '@nestjs/common';
import { CommentProductController } from './comment-product.controller';
import { CommentProductService } from './comment-product.service';
import { ProductsModule } from '@/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [CommentProductController],
  providers: [CommentProductService],
  exports: [CommentProductService],
})
export class CommentProductModule {}
