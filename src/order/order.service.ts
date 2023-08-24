import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RepositoryProvider } from '@/repository';
import { ServerMessage, SortEnum } from '@/common';
import { IReqUser } from '@/auth/interface';
import { OrderResDto, OrderReqDto, OrderQuery, updateStatusOrder } from './dto';

@Injectable()
export class OrderService {
  constructor(private repository: RepositoryProvider) {}
  private readonly name = 'Order';

  public async getOrderById(id: string): Promise<OrderResDto> {
    const order = await this.repository.Order.findById(id);
    if (_.isNil(order))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return order;
  }

  public async createOrder(
    payload: IReqUser,
    dto: OrderReqDto,
  ): Promise<OrderResDto> {
    const order = await this.repository.Order.create({
      email: payload.email,
      ...dto,
    });
    return order;
  }

  public async updateOrder(
    payload: IReqUser,
    dto: OrderReqDto,
    id: string,
  ): Promise<any> {
    const order = await this.repository.Order.findOneAndUpdate(
      { _id: id, email: payload.email },
      dto,
      { new: true },
    ).exec();
    if (!order)
      throw new NotFoundException(`${this.name}${ServerMessage.NOT_FOUND}`);
    return order;
  }

  public async updateStatusOrder(
    payload: IReqUser,
    dto: updateStatusOrder,
    id: string,
  ): Promise<OrderResDto> {
    const order = await this.repository.Order.findOneAndUpdate(
      { _id: id, email: payload.email },
      dto,
      { new: true },
    ).exec();
    if (!order)
      throw new NotFoundException(`${this.name}${ServerMessage.NOT_FOUND}`);
    return order;
  }

  public async deleteOrder(payload: IReqUser, id: string) {
    const order = await this.repository.Order.findOneAndDelete({
      _id: id,
      email: payload.email,
    }).exec();
    if (!order) throw new NotFoundException(ServerMessage.INVALID_PERMISSION);
    return { msg: this.name.concat(ServerMessage.WAS_DELETED) };
  }

  public async getListOrder(query: OrderQuery) {
    const filter = {
      ...(_.isString(query.email)
        ? { email: { $regex: `${query.email}`, $options: 'i' } }
        : {}),
      ...(_.isString(query.recipientName)
        ? { recipientName: { $regex: `${query.recipientName}`, $options: 'i' } }
        : {}),
      ...(_.isString(query.phone)
        ? { phone: { $regex: `${query.phone}`, $options: 'i' } }
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
      await this.repository.Order.paginate(filter, option);

    return {
      docs: docs.map((doc) => new OrderResDto(doc.toObject())),
      totalDocs,
      totalPages,
    };
  }
}
