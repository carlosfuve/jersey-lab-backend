import multer, { StorageEngine } from "multer";
import IFileSystemService from "../../domain/IFileSystemService";
import path from "path";
import fs from "fs/promises";

export default class FileSystemService implements IFileSystemService {


    getStorageProject(): StorageEngine {
        const storage = multer.diskStorage({
            destination: async (req, _file, cb) => {
                try {
                    const { name } = JSON.parse(req.body.data);
                    const dirProject = path.join(process.cwd(), "uploads", "project");

                    if (!name || typeof name != "string" || !name.trim()) {
                        //Crear carpeta temporal 
                        const destDir = path.join(dirProject, "tmp");

                        if (!await this.existsPath(destDir)) {
                            fs.mkdir(destDir, { recursive: true });
                        }

                        return cb(null, destDir);
                    }

                    const nameDir: string = name.toLowerCase().replace(/ /g, "-");
                    const destDir = path.join(dirProject, nameDir);

                    if (!await this.existsPath(destDir)) {
                        fs.mkdir(destDir, { recursive: true });
                    }
                    else throw new Error("");

                    cb(null, destDir);
                } catch (err) {
                    cb(err as Error, "");
                }
            },
            filename: async (req, file, cb) => {
                try {
                    const ext = path.extname(file.originalname);
                    const { name } = JSON.parse(req.body.data || "{}");

                    if (!name || typeof name != "string" || !name.trim()) {
                        //Crear archivo temporal
                        return cb(null, `tmp-main-img${ext}`);
                    }

                    const nameFile = name.toLowerCase().replace(/ /g, "-");

                    // Ruta de carpeta y archivo
                    const folderPath = path.join(process.cwd(), "uploads", "project", nameFile);
                    const filePath = path.join(folderPath, `${nameFile}-main-img${ext}`);

                    // Si existe, añadir número de archivos
                    if (await this.existsPath(filePath)) {
                        const filesCount = await fs.readdir(folderPath);
                        return cb(null, `${nameFile}-main-img-${filesCount.length}${ext}`);
                    }

                    cb(null, `${nameFile}-main-img${ext}`);
                } catch (err) {
                    cb(err as Error, "");
                }
            }

        });

        return storage;
    }

    getStorageProjectPhoto(): StorageEngine {
        const storage = multer.diskStorage({
            destination: async (req, _file, cb) => {
                try {
                    const { projectId } = req.params;
                    if (!projectId) return cb(new Error("projectId no proporcionado"), "");

                    const destDir: string = path.join(process.cwd(), "uploads", "projectPhotos");

                    if (!await this.existsPath(destDir)) {
                        fs.mkdir(destDir, { recursive: true });
                    }

                    cb(null, destDir);
                } catch (err) {
                    cb(err as Error, "");
                }
            },
            filename: (_req, file, cb) => {
                const ext = path.extname(file.originalname);
                const name = path.basename(file.originalname, ext).toLowerCase();
                cb(null, `${name}${ext}`);
            },
        });

        return storage;
    }



    async existsPath(pathExists: string): Promise<boolean> {
        try {
            await fs.stat(pathExists);
            return true;
        } catch {
            return false;
        }
    }

    removeCwdProcess(pathDirFile: string): string {
        const relativePath: string = path.relative(process.cwd(), pathDirFile);
        if (relativePath.startsWith("uploads")) return relativePath;

        return pathDirFile;

    }

    async removeFile(pathFile: string,): Promise<void> {
        if (await this.existsPath(pathFile)) await fs.unlink(pathFile);
    }
    async removeDirectory(pathDir: string,): Promise<void> {
        if (await this.existsPath(pathDir)) await fs.rm(pathDir, { recursive: true });
    }


    async getFilesDirectory(pathDir: string): Promise<string[]> {
        // Filtramos solo archivos y mantenemos la extensión
        const files = await fs.readdir(pathDir, { withFileTypes: true });

        return files.filter(f => f.isFile()).map(f => f.name);;
    }

    async moveFilesBetweenDir(originPathFile: string, destPathFile: string): Promise<void> {
        const destDir = path.dirname(destPathFile);
        if (!await this.existsPath(destDir)) {
            await fs.mkdir(destDir, { recursive: true });
        }

        await fs.copyFile(originPathFile, destPathFile);
    }
}