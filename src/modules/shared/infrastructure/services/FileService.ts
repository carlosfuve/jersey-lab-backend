import 'dotenv/config';
import IFileService from "../../domain/IFileService";
import { S3Client, HeadObjectCommand, DeleteObjectCommand, ListObjectsV2Command, DeleteObjectsCommand, CopyObjectCommand } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import { StorageEngine } from 'multer';
import path from "path";
import { Request } from "express";

export default class FileService implements IFileService {
  private s3Client: S3Client;
  bucketName: string = process.env.AWS_BUCKET_NAME || "";

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
  }


  getStorageProject(): StorageEngine {
    const storage = multerS3({
      s3: this.s3Client,
      bucket: this.bucketName,
      acl: 'public-read',
      cacheControl: 'no-cache, no-store, must-revalidate',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req: Request, file, cb) {
        try {
          const ext = path.extname(file.originalname);
          const { name, isHighligthedImg } = JSON.parse(req.body.data || "{}");

          if (!name || typeof name !== "string" || !name.trim()) {
            return cb(null, `project/tmp/tmp-main-img${ext}`);
          }

          const nameFile = name.toLowerCase().replace(/ /g, "-");

          if (isHighligthedImg) {
            const fileKey = `project/${nameFile}/${nameFile}-high-img${ext}`;
            return cb(null, fileKey);
          }

          const fileKey = `project/${nameFile}/${nameFile}-main-img${ext}`;
          return cb(null, fileKey);
        } catch (err) {
          cb(err as Error, "");
        }
      }
    })

    return storage;
  }

  getStorageProjectPhoto(): StorageEngine {
    const storage = multerS3({
      s3: this.s3Client,
      bucket: this.bucketName,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req: Request, file, cb) {
        try {
          const { projectId } = req.params;
          if (!projectId) {
            return cb(new Error("projectId no proporcionado"), "");
          }

          const ext = path.extname(file.originalname);
          const name = path.basename(file.originalname, ext).toLowerCase();

          const fileKey = `projectPhotos/${projectId}/${name}${ext}`;
          cb(null, fileKey);
        } catch (err) {
          cb(err as Error, "");
        }
      }
    })

    return storage;
  }

  async existsPath(pathExists: string): Promise<boolean> {
    try {
      await this.s3Client.send(new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: pathExists
      }));
      return true;
    } catch (_) {
      return false;
    }
  }

  removeCwdProcess(pathDirFile: string): string {
    //if (pathDirFile.startsWith("uploads/")) return pathDirFile;
    return pathDirFile;
  }

  async removeFile(pathFile: string): Promise<void> {
    await this.s3Client.send(new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: pathFile
    }));
  }

  async removeDirectory(pathDir: string): Promise<void> {
    const data = await this.s3Client.send(new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: pathDir
    }));

    if (!data.Contents || data.Contents.length === 0) return;

    const objectsToDelete = data.Contents.map(obj => ({ Key: obj.Key! }));

    await this.s3Client.send(new DeleteObjectsCommand({
      Bucket: this.bucketName,
      Delete: { Objects: objectsToDelete }
    }));
  }

  async getFilesDirectory(pathDir: string): Promise<string[]> {
    const data = await this.s3Client.send(new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: pathDir
    }));

    const files = (data.Contents || [])
      .filter(obj => obj.Key && !obj.Key.endsWith("/"))
      .map(obj => obj.Key!);

    return files;
  }

  async moveFilesBetweenDir(originKey: string, destKey: string): Promise<void> {
    // Copiar objeto
    await this.s3Client.send(new CopyObjectCommand({
      Bucket: this.bucketName,
      CopySource: `${this.bucketName}/${originKey}`,
      Key: destKey
    }));

    // Eliminar objeto original
    await this.s3Client.send(new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: originKey
    }));
  }


} 