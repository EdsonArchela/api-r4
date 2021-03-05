export default interface IStorageProvider {
  saveFile(file: string, dest: string): Promise<string>;
  saveFiles(files: string[], dest: string): Promise<string[]>;
  deleteFile(file: string): Promise<void>;
  getDownloadLink(filepath: string): Promise<string>;
}
