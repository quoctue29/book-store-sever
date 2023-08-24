import {
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { DateTimeUtils, StringUtils } from '@/utils';
import { FileUploadDto } from './dto';
import { FileManagerService } from './file-manager.service';

@ApiTags('File Manager')
@Controller('file-manager')
export class FileManagerController {
  constructor(
    private readonly configService: ConfigService,
    private readonly fileManagerService: FileManagerService,
  ) {}

  @Get('/files')
  getFiles() {
    return this.fileManagerService.getListFile();
  }

  @Get('/:fileName')
  @ApiParam({ name: 'fileName' })
  getFile(@Res() res: Response, @Param() params: any): Promise<void> {
    return this.fileManagerService.getFile(res, params.fileName);
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    type: FileUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'file-manager/',
        filename(_, file, cb) {
          const fileExtension = file.originalname.slice(
            file.originalname.lastIndexOf('.'),
            file.originalname.length,
          );
          const fileName = `${StringUtils.toSlug(
            file.originalname.slice(0, file.originalname.lastIndexOf('.')),
          )}-${DateTimeUtils.timeToSeconds()}${fileExtension}`;
          file['filename'] = fileName;
          cb(null, fileName);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            message: 'File size limit reached',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      fileName: file.filename,
      url: `${this.configService.get<string>('PUBLIC_URL')}/api/file-manager/${
        file.filename
      }`,
      path: `/file-manager/${file.filename}`,
    };
  }

  @Delete('/:fileName')
  @ApiParam({ name: 'fileName' })
  deleteFile(@Param() params: any) {
    return this.fileManagerService.delete(params.fileName);
  }
}
