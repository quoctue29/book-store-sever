import { CurrentUser, PortalController } from '@/decorator';
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
import { Serialize } from '@/interceptor';
import { IReqUser } from '@/auth/interface';
import { JwtAuthGuard } from '@/auth/guard';
import { OrderResDto, OrderReqDto, OrderQuery, updateStatusOrder } from './dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@PortalController({ path: 'orders' })
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private orderService: OrderService) {}

  @Get('/:id')
  @Serialize(OrderResDto)
  public async getOrderById(@Param('id') id: string): Promise<OrderResDto> {
    this.logger.debug(`Rest to get order by id ${id}`);
    return this.orderService.getOrderById(id);
  }

  @Post('/')
  @Serialize(OrderResDto)
  @UseGuards(JwtAuthGuard)
  public async create(
    @CurrentUser() payload: IReqUser,
    @Body() dto: OrderReqDto,
  ) {
    this.logger.debug(`Res to create order`);
    return this.orderService.createOrder(payload, dto);
  }

  @Put('/:id')
  @Serialize(OrderResDto)
  @UseGuards(JwtAuthGuard)
  public async update(
    @CurrentUser() payload: IReqUser,
    @Body() dto: OrderReqDto,
    @Param('id') id: string,
  ) {
    this.logger.debug(`Res to update order`);
    return this.orderService.updateOrder(payload, dto, id);
  }

  @Put('/status/:id')
  @Serialize(OrderResDto)
  @UseGuards(JwtAuthGuard)
  public async updateStatus(
    @CurrentUser() payload: IReqUser,
    @Body() dto: updateStatusOrder,
    @Param('id') id: string,
  ) {
    this.logger.debug(`Res to update order`);
    return this.orderService.updateStatusOrder(payload, dto, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public async delete(
    @CurrentUser() payload: IReqUser,
    @Param('id') id: string,
  ) {
    this.logger.debug(`Rest to delete order`);
    return this.orderService.deleteOrder(payload, id);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  public getList(@Query() query: OrderQuery) {
    this.logger.debug(`Rest to get order list`);
    return this.orderService.getListOrder(query);
  }
}
