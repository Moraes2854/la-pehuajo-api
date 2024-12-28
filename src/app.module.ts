import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';

import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductsModule } from './products/products.module';
import { join } from 'path';
import { FirebaseStorageService } from './firebase-storage/firebase-storage.service';
import { UploadController } from './upload/upload.controller';

console.log(envs);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude:['api/*'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      database: envs.dbName,
      username: envs.dbUsername,
      password: envs.dbPassword || '',
      autoLoadEntities: true,
      synchronize: true,
      ssl: envs.useSsl ? { rejectUnauthorized: false } : undefined
    }),
    AuthModule, 
    CategoriesModule, 
    ProductCategoryModule, 
    ProductsModule,
  ],
  providers: [FirebaseStorageService],
  controllers: [UploadController],
})
export class AppModule {}
