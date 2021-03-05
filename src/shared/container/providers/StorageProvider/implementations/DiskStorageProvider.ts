import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';
import createDirectory from '../../../../utils/createDirectory';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string, dest: string): Promise<string> {
    createDirectory(dest);
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder + '/' + dest, file),
    );

    return file;
  }

  public async saveFiles(files: string[], dest: string): Promise<string[]> {
    await createDirectory(dest);
    files.forEach(async file => {
      await fs.promises.rename(
        path.resolve(uploadConfig.tmpFolder, file),
        path.resolve(uploadConfig.uploadsFolder + '/' + dest, file),
      );
    });

    return files;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async getDownloadLink(filepath: string): Promise<string> {
    return '/files/' + filepath;
  }
}

export default DiskStorageProvider;
