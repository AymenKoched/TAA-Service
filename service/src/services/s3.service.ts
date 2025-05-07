import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  private generateUniqueFileName(originalName: string): string {
    const fileExtension = originalName.split('.').pop();
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const uniqueId = uuidv4();
    return `${baseName}-${uniqueId}.${fileExtension}`;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = this.generateUniqueFileName(file.originalname);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3Client.send(command);
      return `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      throw new InternalServerErrorException(
        `File upload failed: ${error.message}`,
      );
    }
  }

  async downloadFile(fileName: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });

    try {
      const { Body } = await this.s3Client.send(command);
      if (!Body) {
        throw new NotFoundException(`File not found: ${fileName}`);
      }
      return Body as Readable;
    } catch (error) {
      throw new NotFoundException(`File download failed: ${error.message}`);
    }
  }

  async listFiles(): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
    });

    try {
      const { Contents } = await this.s3Client.send(command);
      return Contents ? Contents.map((file) => file.Key) : [];
    } catch (error) {
      throw new InternalServerErrorException(
        `File listing failed: ${error.message}`,
      );
    }
  }

  async deleteFile(fileName: string): Promise<string> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });

    try {
      await this.s3Client.send(command);
      return 'File deleted';
    } catch (error) {
      throw new InternalServerErrorException(
        `File deletion failed: ${error.message}`,
      );
    }
  }
}
