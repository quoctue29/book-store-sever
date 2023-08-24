import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryProvider } from '@/repository';
import { ServerMessage, SortEnum } from '@/common';
import { Cart } from './schema/cart.schema';
import { CartResDto, CartReqDto, CartQuery } from './dto';
import { IReqUser } from '@/auth/interface';
import { ProductsService } from '@/products/products.service';

@Injectable()
export class CartService {
  constructor(
    private repository: RepositoryProvider,
    private productsService: ProductsService,
  ) {}
  private readonly name = 'Cart';

  public async getCartById(id: string): Promise<any> {
    const cart: Cart = await this.repository.Cart.findById(id);
    if (_.isNil(cart))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return cart;
  }

  public async updateCart(payload: IReqUser, dto: CartReqDto): Promise<any> {
    let totalAmount = 0;
    let totalPrice = 0;
    for (const product of dto.productIds) {
      const book = await this.productsService.getProductById(product.productId);
      if (product.IsSelected) {
        totalAmount += product.amount;
        totalPrice += product.amount * book.price;
      }
    }
    const cart = await this.repository.Cart.findOneAndUpdate(
      { email: payload.email },
      { totalProduct: totalAmount, totalPrice: totalPrice, ...dto },
      { new: true },
    ).lean();
    if (_.isNil(cart))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return cart;
  }

  public async getListCart(query: CartQuery) {
    const filter = {
      ...(_.isString(query.email)
        ? { email: { $regex: `${query.email}`, $options: 'i' } }
        : {}),
    };
    const option = {
      page: _.defaultTo(query.page, 1),
      limit: _.defaultTo(query.limit, 10),
      sort: {
        ...(!_.isNil(query.sortCreatedAt) &&
        [SortEnum.ASC, SortEnum.DESC].includes(Number(query.sortCreatedAt))
          ? { createdAt: Number(query.sortCreatedAt) }
          : {}),
      },
    };
    const { docs, totalDocs, totalPages } = await this.repository.Cart.paginate(
      filter,
      option,
    );

    return {
      docs: docs.map((doc) => new CartResDto(doc.toObject())),
      totalDocs,
      totalPages,
    };
  }
}
