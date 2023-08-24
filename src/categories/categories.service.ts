import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RepositoryProvider } from '@/repository';
import { ServerMessage, SortEnum } from '@/common';
import { CategoryDto, CategoryQuery, SetCategoryDto } from './dto';
import { Category } from './schema/category.schema';

@Injectable()
export class CategoriesService {
  constructor(private repository: RepositoryProvider) {}
  private name = 'Category';

  public async getCategoryById(id: string): Promise<CategoryDto> {
    const category: Category = await this.repository.Category.findById(id);
    if (_.isNil(category))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return category;
  }

  public async createCategory(dto: SetCategoryDto): Promise<CategoryDto> {
    const categoryExist: Category = await this.repository.Category.findOne({
      name: dto.name,
    });
    if (!_.isNil(categoryExist))
      throw new BadRequestException(
        this.name.concat(ServerMessage.WAS_EXISTED),
      );
    const category: Category = await this.repository.Category.create(dto);
    return category;
  }

  public async updateCategory(
    dto: SetCategoryDto,
    id: string,
  ): Promise<CategoryDto> {
    const categoryExist: Category = await this.repository.Category.findOne({
      name: dto.name,
    });
    if (!_.isNil(categoryExist))
      throw new BadRequestException(
        this.name.concat(ServerMessage.WAS_EXISTED),
      );
    const category = await this.repository.Category.findOneAndUpdate(
      { _id: id },
      dto,
      { new: true },
    );
    if (_.isNil(category))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return category;
  }

  public async deleteCategory(id: string): Promise<any> {
    const category = await this.repository.Category.findByIdAndDelete(id);
    if (_.isNil(category))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return { msg: this.name.concat(ServerMessage.WAS_DELETED) };
  }

  public async getListCategory(query: CategoryQuery): Promise<any> {
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
      await this.repository.Category.paginate(filter, option);

    return {
      docs: docs.map((doc) => new CategoryDto(doc.toObject())),
      totalDocs,
      totalPages,
    };
  }
}
