import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { readdir, stat, unlink } from 'fs/promises';
import { formatBytes } from '@/utils';

@Injectable()
export class FileManagerService {
  constructor(private readonly configService: ConfigService) {}
  folderPath = 'file-manager';

  async streamFile(res: Response, path: string) {
    const file = createReadStream(path);
    file.pipe(res as any);
  }

  isExisted(path: string) {
    return existsSync(path);
  }

  async getFile(res: Response, fileName: string): Promise<void> {
    const path = `${this.folderPath}/${fileName}`;
    if (!this.isExisted(path)) {
      throw new HttpException('FILE_NOT_EXISTED', 404);
    }
    await this.streamFile(res, path);
  }

  async delete(name: string) {
    const imagePath = `${this.folderPath}/${name}`;

    return unlink(imagePath)
      .then(async () => ({ success: true }))
      .catch(() => {
        throw new HttpException('CANNOT_FIND_IMAGE', 404);
      });
  }

  async getListFile() {
    const fileNames = await readdir(this.folderPath);
    let files: {
      name: string;
      sizeInBytes: number;
      sizeInString: string;
      url: string;
    }[] = [];

    await Promise.all(
      fileNames.map(async (fileName) => {
        const ignoreFiles = ['README.md', '.DS_Store'];
        if (ignoreFiles.includes(fileName)) return;

        const stats = await stat(`${this.folderPath}/${fileName}`);

        files.push({
          name: fileName,
          sizeInBytes: stats.size,
          sizeInString: formatBytes(stats.size),
          url: `${this.configService.get<string>(
            'PUBLIC_URL',
          )}/api/file-manager/${fileName}`,
        });
      }),
    );

    const totalSizeInBytes = files.reduce((a, b) => a + b.sizeInBytes, 0);

    return {
      totalSizeInBytes,
      totalSizeInString: formatBytes(totalSizeInBytes),
      count: files.length,
      data: files,
    };
  }
}
