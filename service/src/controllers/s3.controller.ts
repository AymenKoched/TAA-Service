import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { S3Service } from '../services/s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.s3Service.uploadFile(file);
  }

  @Get('list')
  async list() {
    return this.s3Service.listFiles();
  }

  @Get('download/:fileName')
  async download(@Param('fileName') fileName: string, @Res() res) {
    const fileStrem = await this.s3Service.downloadFile(fileName);
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', 'attachment; filename="' + fileName + '"');

    fileStrem.pipe(res);
  }

  @Delete('del/:fileName')
  async del(@Param('fileName') fileName: string) {
    return this.s3Service.deleteFile(fileName);
  }
}
