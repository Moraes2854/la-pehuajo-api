import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { FirebaseStorageService } from '../firebase-storage/firebase-storage.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly firebaseStorageService: FirebaseStorageService) {}

    @Post('images')
    @UseInterceptors(
      FilesInterceptor('files', 10, {
        storage: diskStorage({
          destination: './uploads', // Local folder where files will be stored
          filename: (req, file, callback) => {
            const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
            callback(null, uniqueSuffix); // Unique file name
          },
        }),
        limits: {
          fileSize: 5 * 1024 * 1024, // Limit: 5MB per file
        },
        fileFilter: (req, file, callback) => {
          // Allow only specific file types (e.g., images)
          if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
      }),
    )
    
    async uploadMultipleImages(@UploadedFiles() files: Array<Express.Multer.File>) {
      const urls = [];
      for (const file of files) {
        const url = await this.firebaseStorageService.uploadFile( file );
        urls.push( url );        
      }
      return {
        message: 'Files uploaded successfully!',
        urls,
      };
    }
}
