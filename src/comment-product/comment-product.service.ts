import { Injectable, NotFoundException } from '@nestjs/common';
import { ServerMessage, SortEnum } from '@/common';
import { isValidObjectId } from '@/utils';
import { IReqUser } from '@/auth/interface';
import { RepositoryProvider } from '@/repository';
import { CommentProduct } from './schema/comment-product.schema';
import {
  CommentProductDto,
  CreateCommentProductDto,
  UpdateCommentProductDto,
  CommentProductQuery,
} from './dto';
import { ProductsService } from '@/products/products.service';

@Injectable()
export class CommentProductService {
  constructor(
    private repository: RepositoryProvider,
    private productsService: ProductsService,
  ) {}
  private readonly name = 'Comment product';

  public async getCommentById(id: string): Promise<CommentProductDto> {
    isValidObjectId(id);
    const comment: CommentProduct =
      await this.repository.CommentProduct.findById(id);
    if (_.isNil(comment))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return comment;
  }

  public async createComment(
    payload: IReqUser,
    dto: CreateCommentProductDto,
  ): Promise<CommentProductDto> {
    await this.productsService.getProductById(dto.productId);
    const comment: CommentProduct = await this.repository.CommentProduct.create(
      { ...dto, userId: payload.id },
    );
    return comment;
  }

  public async updateComment(
    payload: IReqUser,
    dto: UpdateCommentProductDto,
    id: string,
  ): Promise<CommentProductDto> {
    const comment = await this.repository.CommentProduct.findOneAndUpdate(
      { $and: [{ userId: payload.id }, { _id: id }] },
      dto,
      { new: true },
    ).lean();
    if (_.isNil(comment))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return comment;
  }

  public async deleteComment(payload: IReqUser, id: string): Promise<any> {
    const comment = await this.repository.CommentProduct.findOneAndDelete(
      { $and: [{ userId: payload.id }, { _id: id }] },
      { new: true },
    ).lean();
    if (_.isNil(comment))
      throw new NotFoundException(this.name.concat(ServerMessage.WAS_DELETED));
    return comment;
  }

  public async getListCommentProduct(query: CommentProductQuery): Promise<any> {
    const filter = {
      ...(_.isString(query.comment)
        ? { comment: { $regex: `${query.comment}`, $options: 'i' } }
        : {}),
      ...(_.isString(query.productId)
        ? { productId: { $regex: `${query.productId}`, $options: 'i' } }
        : {}),
      ...(_.isString(query.userId)
        ? { userId: { $regex: `${query.userId}`, $options: 'i' } }
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
      await this.repository.CommentProduct.paginate(filter, option);

    return {
      docs: docs.map((doc) => new CommentProductDto(doc.toObject())),
      totalDocs,
      totalPages,
    };
  }
}
