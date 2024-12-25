import { Injectable } from '@nestjs/common';
import { firebaseApp } from './firebase-config';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

@Injectable()
export class FirebaseStorageService {
  private bucket = firebaseApp.storage().bucket();

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = `${uuidv4()}-${file.originalname}`;
      const filePath = join('uploads/', fileName);

      const fileUpload = this.bucket.file(filePath);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.end(file.buffer);
      return new Promise((resolve, reject) => {
        stream
          .on('finish', async () => {
            const [url] = await fileUpload.getSignedUrl({
              action: 'read',
              expires: '03-01-2500',
            });
            resolve(url);
          })
          .on('error', (error) => reject(`Error al subir archivo: ${error}`));
      });
    } catch (error) {
      throw new Error(`Error al subir archivo: ${error.message}`);
    }
  }
}
