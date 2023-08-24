import {
  Body,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '@/interceptor';
import { PortalController } from '@/decorator';
import { isValidObjectId } from '@/utils';
import {
  WarehouseResDto,
  WarehouseCreateDto,
  WarehouseUpdateDto,
  WarehouseQuery,
} from './dto';
import { WarehouseService } from './warehouse.service';

@ApiTags('Warehouse')
@PortalController({ path: 'warehouse' })
export class WarehouseController {
  private readonly logger = new Logger(WarehouseController.name);
  constructor(private warehouseService: WarehouseService) {}

  @Get('/:id')
  @Serialize(WarehouseResDto)
  public async getWarehouseById(@Param('id') id: string) {
    isValidObjectId(id);
    this.logger.debug(`Rest to get warehouse by id ${id}`);
    return this.warehouseService.getWarehouseById(id);
  }

  @Post('/')
  @Serialize(WarehouseResDto)
  public async createWarehouse(@Body() dto: WarehouseCreateDto) {
    this.logger.debug(`Rest to create warehouse`);
    return await this.warehouseService.createWarehouse(dto);
  }

  @Put('/:id')
  @Serialize(WarehouseResDto)
  public async updateWarehouse(
    @Body() dto: WarehouseUpdateDto,
    @Param('id') id: string,
  ) {
    isValidObjectId(id);
    this.logger.debug(`Rest to update warehouse by id: ${id}`);
    return await this.warehouseService.updateWarehouse(id, dto);
  }

  @Delete('/:id')
  public async deleteWarehouse(@Param('id') id: string): Promise<any> {
    isValidObjectId(id);
    this.logger.debug(`Rest to delete warehouse by id: ${id}`);
    return await this.warehouseService.deleteWarehouse(id);
  }

  @Get('/')
  public async getListWarehouse(@Query() query: WarehouseQuery): Promise<any> {
    this.logger.debug(`Rest to get list warehouse info`);
    return this.warehouseService.getListWarehouse(query);
  }
}
