import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User as UserModel } from '@/users/schema/user.schema';
import { Author as AuthorModel } from '@/authors/schema/author.schema';
import { Category as CategoryModel } from '@/categories/schema/category.schema';
import { Product as ProductModel } from '@/products/schema/products.schema';
import { CommentProduct as CommentProductModel } from '@/comment-product/schema/comment-product.schema';
import { Warehouse as WarehouseModel } from '@/warehouse/schema/warehouse.schema';
import { Cart as CartModel } from '@/cart/schema/cart.schema';
import { Order as OrderModel } from '@/order/schema/order.schema';

@Injectable()
export class RepositoryProvider {
  constructor(
    @InjectModel(UserModel)
    public readonly User: ReturnModelType<typeof UserModel>,
    @InjectModel(AuthorModel)
    public readonly Author: ReturnModelType<typeof AuthorModel>,
    @InjectModel(CategoryModel)
    public readonly Category: ReturnModelType<typeof CategoryModel>,
    @InjectModel(ProductModel)
    public readonly Product: ReturnModelType<typeof ProductModel>,
    @InjectModel(CommentProductModel)
    public readonly CommentProduct: ReturnModelType<typeof CommentProductModel>,
    @InjectModel(WarehouseModel)
    public readonly Warehouse: ReturnModelType<typeof WarehouseModel>,
    @InjectModel(CartModel)
    public readonly Cart: ReturnModelType<typeof CartModel>,
    @InjectModel(OrderModel)
    public readonly Order: ReturnModelType<typeof OrderModel>,
  ) {}
}
