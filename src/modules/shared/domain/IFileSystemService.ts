import { StorageEngine } from "multer";

export default interface IFileSystemService {

    getStorageProject(): StorageEngine;
    getStorageProjectPhoto(): StorageEngine;

    existsPath(pathExists: string): Promise<boolean>;
    removeCwdProcess(pathDirFile: string): string;
    removeFile(pathFile: string): Promise<void>;
    removeDirectory(pathDir: string): Promise<void>;
    getFilesDirectory(pathDir: string): Promise<string[]>;


    moveFilesBetweenDir(originPathFile: string, destPathFile: string): Promise<void>;

}