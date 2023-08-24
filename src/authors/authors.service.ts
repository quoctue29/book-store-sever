import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryProvider } from '@/repository';
import { ServerMessage, SortEnum } from '@/common';
import { Author } from './schema/author.schema';
import { AuthorResDto, AuthorReqDto, AuthorQuery } from './dto';

@Injectable()
export class AuthorsService {
  constructor(private repository: RepositoryProvider) {}
  private readonly name = 'Author';

  public async getAuthorById(id: string): Promise<AuthorResDto> {
    const author: Author = await this.repository.Author.findById(id);
    if (_.isNil(author))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return author;
  }

  public async createAuthor(dto: AuthorReqDto): Promise<AuthorResDto> {
    const authorExist = await this.repository.Author.findOne({
      name: dto.name,
    }).lean();
    if (!_.isNil(authorExist))
      throw new NotFoundException(this.name.concat(ServerMessage.WAS_EXISTED));
    const author: Author = await this.repository.Author.create(dto);
    return author;
  }

  public async updateAuthor(
    dto: AuthorReqDto,
    id: string,
  ): Promise<AuthorResDto> {
    const author = await this.repository.Author.findOneAndUpdate(
      { _id: id },
      dto,
      { new: true },
    ).lean();
    if (_.isNil(author))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return author;
  }

  public async deleteAuthor(id: string): Promise<any> {
    const author = await this.repository.Category.findByIdAndDelete(id);
    if (_.isNil(author))
      throw new NotFoundException(this.name.concat(ServerMessage.NOT_FOUND));
    return { msg: this.name.concat(ServerMessage.WAS_DELETED) };
  }

  public async getListAuthor(query: AuthorQuery): Promise<any> {
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
      await this.repository.Author.paginate(filter, option);

    return {
      docs: docs.map((doc) => new AuthorResDto(doc.toObject())),
      totalDocs,
      totalPages,
    };
  }
}
