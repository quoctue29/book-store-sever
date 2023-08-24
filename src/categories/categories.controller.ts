import {
  Body,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guard';
import { PortalController, Roles } from '@/decorator';
import { Serialize } from '@/interceptor';
import { Role } from '@/common';
import { isValidObjectId } from '@/utils';
import { CategoryDto, CategoryQuery, SetCategoryDto } from './dto';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@PortalController({ path: 'categories' })
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);
  constructor(private categoriesService: CategoriesService) {}

  @Get('/:id')
  @Serialize(CategoryDto)
  public async getCategoryById(@Param('id') id: string) {
    isValidObjectId(id);
    this.logger.debug(`Rest to get category by id ${id}`);
    return this.categoriesService.getCategoryById(id);
  }

  @Post('/')
  @Serialize(CategoryDto)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SYSTEM_ADMIN, Role.ADMIN)
  public async createCategory(@Body() dto: SetCategoryDto) {
    this.logger.debug(`Rest to create category name: ${dto.name}`);
    return await this.categoriesService.createCategory(dto);
  }

  @Put('/:id')
  @Serialize(CategoryDto)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SYSTEM_ADMIN, Role.ADMIN)
  public async updateCategory(
    @Body() dto: SetCategoryDto,
    @Param('id') id: string,
  ) {
    isValidObjectId(id);
    this.logger.debug(`Rest to update category by id: ${id}`);
    return await this.categoriesService.updateCategory(dto, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SYSTEM_ADMIN, Role.ADMIN)
  public async deleteCategory(@Param('id') id: string): Promise<any> {
    isValidObjectId(id);
    this.logger.debug(`Rest to delete category by id: ${id}`);
    return await this.categoriesService.deleteCategory(id);
  }

  @Get('/')
  public async getListCategories(@Query() query: CategoryQuery): Promise<any> {
    this.logger.debug(`Rest to get list category info`);
    return this.categoriesService.getListCategory(query);
  }
}
