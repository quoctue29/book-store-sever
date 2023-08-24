import {
  Body,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PortalController, Roles } from '@/decorator';
import { Serialize } from '@/interceptor';
import { Role } from '@/common';
import { isValidObjectId } from '@/utils';
import { JwtAuthGuard } from '@/auth/guard';
import { ProductResDto, ProductReqDto, ProductQuery } from './dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@PortalController({ path: 'products' })
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);
  constructor(private productsService: ProductsService) {}

  @Get('/:id')
  @Serialize(ProductResDto)
  public async getProductById(@Param('id') id: string) {
    isValidObjectId(id);
    this.logger.debug(`Rest to get product by id ${id}`);
    return this.productsService.getProductById(id);
  }

  @Post('/')
  @Serialize(ProductResDto)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SYSTEM_ADMIN, Role.ADMIN)
  public async createProduct(@Body() dto: ProductReqDto) {
    this.logger.debug(`Rest to create product name: ${dto.name}`);
    return await this.productsService.createProduct(dto);
  }

  @Put('/:id')
  @Serialize(ProductResDto)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SYSTEM_ADMIN, Role.ADMIN)
  public async updateProduct(
    @Body() dto: ProductReqDto,
    @Param('id') id: string,
  ) {
    isValidObjectId(id);
    this.logger.debug(`Rest to update product by id: ${id}`);
    return await this.productsService.updateProduct(dto, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.SYSTEM_ADMIN, Role.ADMIN)
  public async deleteProduct(@Param('id') id: string): Promise<any> {
    isValidObjectId(id);
    this.logger.debug(`Rest to delete product by id: ${id}`);
    return await this.productsService.deleteProduct(id);
  }

  @Get('/')
  @UseInterceptors(CacheInterceptor)
  public async getListProduct(@Query() query: ProductQuery): Promise<any> {
    this.logger.debug(`Rest to get list product info`);
    return this.productsService.getListProduct(query);
  }
}
