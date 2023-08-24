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
import { CurrentUser, PortalController } from '@/decorator';
import { Serialize } from '@/interceptor';
import { JwtAuthGuard } from '@/auth/guard';
import { IReqUser } from '@/auth/interface';
import {
  CommentProductDto,
  CreateCommentProductDto,
  UpdateCommentProductDto,
  CommentProductQuery,
} from './dto';
import { CommentProductService } from './comment-product.service';

@ApiTags('Comment Product')
@PortalController({ path: 'comment-product' })
export class CommentProductController {
  private readonly logger = new Logger(CommentProductController.name);
  constructor(private commentProductService: CommentProductService) {}

  @Get('/:id')
  @Serialize(CommentProductDto)
  public async getCommentById(@Param('id') id: string) {
    this.logger.debug(`Rest to get comment product by id ${id}`);
    return this.commentProductService.getCommentById(id);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  public async getListCommentProduct(@Query() query: CommentProductQuery) {
    this.logger.debug(`Rest to get lis comment product info`);
    return this.commentProductService.getListCommentProduct(query);
  }

  @Post('/')
  @Serialize(CommentProductDto)
  @UseGuards(JwtAuthGuard)
  public async createComment(
    @CurrentUser() payload: IReqUser,
    @Body() dto: CreateCommentProductDto,
  ) {
    this.logger.debug(`Rest to create comment product: ${dto}`);
    return await this.commentProductService.createComment(payload, dto);
  }

  @Put('/:id')
  @Serialize(CommentProductDto)
  @UseGuards(JwtAuthGuard)
  public async updateComment(
    @CurrentUser() payload: IReqUser,
    @Body() dto: UpdateCommentProductDto,
    @Param('id') id: string,
  ) {
    this.logger.debug(`Rest to update comment product id: ${id}`);
    return await this.commentProductService.updateComment(payload, dto, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public async deleteComment(
    @CurrentUser() payload: IReqUser,
    @Param('id') id: string,
  ) {
    this.logger.debug(`Rest to delete comment product id: ${id}`);
    return await this.commentProductService.deleteComment(payload, id);
  }
}
