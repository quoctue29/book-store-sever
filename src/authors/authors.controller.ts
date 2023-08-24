import {
  Body,
  Get,
  Logger,
  Param,
  Delete,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PortalController, Roles } from '@/decorator';
import { Serialize } from '@/interceptor';
import { JwtAuthGuard } from '@/auth/guard';
import { Role } from '@/common';
import { isValidObjectId } from '@/utils';
import { AuthorResDto, AuthorReqDto, AuthorQuery } from './dto';
import { AuthorsService } from './authors.service';

@ApiTags('Authors')
@PortalController({ path: 'authors' })
export class AuthorsController {
  private readonly logger = new Logger(AuthorsController.name);
  constructor(private authorsService: AuthorsService) {}

  @Get('/:id')
  @Serialize(AuthorResDto)
  public async getAuthorById(@Param('id') id: string) {
    isValidObjectId(id);
    this.logger.debug(`Rest to get author by id ${id}`);
    return this.authorsService.getAuthorById(id);
  }

  @Post('/')
  @Serialize(AuthorResDto)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SYSTEM_ADMIN, Role.ADMIN)
  public async createAuthor(@Body() dto: AuthorReqDto) {
    this.logger.debug(`Rest to create author name: ${dto.name}`);
    return await this.authorsService.createAuthor(dto);
  }

  @Put('/:id')
  @Serialize(AuthorResDto)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SYSTEM_ADMIN, Role.ADMIN)
  public async updateAuthor(
    @Body() dto: AuthorReqDto,
    @Param('id') id: string,
  ) {
    isValidObjectId(id);
    this.logger.debug(`Rest to update author by id: ${id}`);
    return await this.authorsService.updateAuthor(dto, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SYSTEM_ADMIN, Role.ADMIN)
  public async deleteAuthor(@Param('id') id: string): Promise<any> {
    isValidObjectId(id);
    this.logger.debug(`Rest to delete author by id: ${id}`);
    return await this.authorsService.deleteAuthor(id);
  }

  @Get('/')
  public async getListAuthor(@Query() query: AuthorQuery): Promise<any> {
    this.logger.debug(`Rest to get list author info`);
    return this.authorsService.getListAuthor(query);
  }
}
