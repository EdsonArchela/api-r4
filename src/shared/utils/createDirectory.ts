import uploadConfig from '@config/upload';

export default async function createDirectory(folder: string) {
  const fs = require('fs');
  const dirs = folder.split('/');

  let path = uploadConfig.uploadsFolder;

  for (let i = 0; i < dirs.length; i++) {
    path += `/${dirs[i]}`;
    if (!fs.existsSync(path)) {
      try {
        await fs.mkdirSync(path);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
