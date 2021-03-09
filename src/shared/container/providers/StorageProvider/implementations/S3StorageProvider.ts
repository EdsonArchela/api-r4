import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';
import mime from 'mime';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async getDownloadLink(filepath: string): Promise<string> {
    const link = this.client.getSignedUrl('getObject', {
      Bucket: uploadConfig.config.aws.bucket,
      Key: filepath,
      Expires: 60,
    });
    return link;
  }

  public async saveFiles(files: string[], dest: string): Promise<string[]> {
    const savedFiles: string[] = [];

    const promises = files.map(async file => {
      const saved = await this.saveFile(file, dest);

      savedFiles.push(saved);
    });
    await Promise.all(promises);
    return savedFiles;
  }

  public async saveFile(file: string, dest: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) throw new Error('File not found.');

    const fileContent = await fs.promises.readFile(originalPath);

    const response = await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: `${dest}/${file}`,
        Body: fileContent,
        ContentType,
        ContentDisposition: `inline; filename=${file}`,
      })
      .promise()
      .catch(err => console.log('ERRO NA S3: ', err));

    try {
      fs.unlinkSync(originalPath);
    } catch {
      console.log('failed to exclude file:', originalPath);
    }

    return `${dest}/${file}`;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
