import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryProvider } from '@/repository';
import { ServerMessage, SortEnum } from '@/common';
import { Warehouse } from './schema/warehouse.schema';
import {
  WarehouseResDto,
  WarehouseCreateDto,
  WarehouseUpdateDto,
  WarehouseQuery,
} from './dto';

@Injectable()
export class WarehouseService {
  constructor(private repository: RepositoryProvider) {}
  private readonly name = 'Warehouse';

  public async getWarehouseById(id: string): Promise<WarehouseResDto> {
    const warehouse: Warehouse = await this.repository.Warehouse.findById(id);
    if (_.isNil(warehouse))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return warehouse;
  }

  public async getWarehouseByProductId(id: string): Promise<WarehouseResDto> {
    const warehouse: Warehouse = await this.repository.Warehouse.findOne({
      productId: id,
    }).lean();
    if (_.isNil(warehouse))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return warehouse;
  }

  public async createWarehouse(
    dto: WarehouseCreateDto,
  ): Promise<WarehouseResDto> {
    const warehouseExist: Warehouse = await this.repository.Author.findOne({
      productId: dto.productId,
    }).lean();
    if (!_.isNil(warehouseExist))
      throw new NotFoundException(this.name.concat(ServerMessage.WAS_EXISTED));
    const warehouse: Warehouse = await this.repository.Warehouse.create(dto);
    return warehouse;
  }

  public async updateWarehouse(
    id: string,
    dto: WarehouseUpdateDto,
  ): Promise<WarehouseResDto> {
    const warehouse: Warehouse =
      await this.repository.Warehouse.findOneAndUpdate({ _id: id }, dto, {
        new: true,
      }).lean();
    if (_.isNil(warehouse))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return warehouse;
  }

  public async deleteWarehouse(id: string): Promise<any> {
    const warehouse: Warehouse =
      await this.repository.Warehouse.findByIdAndDelete(id);
    if (_.isNil(warehouse))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return { msg: this.name.concat(ServerMessage.WAS_DELETED) };
  }

  public async getListWarehouse(query: WarehouseQuery): Promise<any> {
    const filter = {
      ...(_.isString(query.productId)
        ? { productId: { $regex: `${query.productId}`, $options: 'i' } }
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
      await this.repository.Warehouse.paginate(filter, option);

    return {
      docs: docs.map((doc) => new WarehouseResDto(doc.toObject())),
      totalDocs,
      totalPages,
    };
  }
}
