import { Injectable, NotFoundException } from '@nestjs/common';
import { ServerMessage, SortEnum } from '@/common';
import { RepositoryProvider } from '@/repository';
import { CachingService } from '@/caching';
import { Product } from './schema/products.schema';
import { ProductResDto, ProductReqDto, ProductQuery } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    private repository: RepositoryProvider,
    private cacheManager: CachingService,
  ) {}
  private readonly name = 'Product';

  public async getProductById(id: string): Promise<ProductResDto> {
    const product: Product = await this.repository.Product.findById(id);
    if (_.isNil(product))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return product;
  }

  public async createProduct(dto: ProductReqDto): Promise<ProductResDto> {
    const productExist = await this.repository.Product.findOne({
      name: dto.name,
    });
    if (!_.isNil(productExist))
      throw new NotFoundException(this.name.concat(ServerMessage.WAS_EXISTED));
    const product: Product = await this.repository.Product.create(dto);
    await this.cacheManager.reset();
    return product;
  }

  public async updateProduct(
    dto: ProductReqDto,
    id: string,
  ): Promise<ProductResDto> {
    const product = await this.repository.Product.findOneAndUpdate(
      { _id: id },
      dto,
      { new: true },
    ).lean();
    if (_.isNil(product))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    await this.cacheManager.reset();
    return product;
  }

  public async deleteProduct(id: string): Promise<any> {
    const product = await this.repository.Product.findByIdAndDelete(id);
    if (_.isNil(product))
      throw new NotFoundException(this.name.concat(ServerMessage.WAS_DELETED));
    await this.cacheManager.reset();
    return { msg: this.name.concat(ServerMessage.NOT_FOUND) };
  }

  public async getListProduct(query: ProductQuery): Promise<any> {
    const filter = {
      ...(_.isString(query.name)
        ? { name: { $regex: `${query.name}`, $options: 'i' } }
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
    const { docs, totalDocs, totalPages } =
      await this.repository.Product.paginate(filter, option);

    return {
      docs: docs.map((doc) => new ProductResDto(doc.toObject())),
      totalDocs,
      totalPages,
    };
  }
}
