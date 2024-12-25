import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Like, IsNull, ILike } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto, FindCategoryDto } from './dto';
import { Category } from './entities/category.entity';
import { PaginationDto } from '../common/dto';
import { ProductCategoryService } from '../product-category/product-category.service';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger('CategoriesService');
    
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly productCategoryService: ProductCategoryService,
    private readonly dataSource: DataSource,

  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save( category );
      return category;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAll( filters: FindCategoryDto, paginationDto: PaginationDto ) {
    try {
      const { limit = 20, offset = 0 } = paginationDto;
      const categories = await this.categoryRepository.find({
        where: this.buildWhereByFilters( filters ),
        // take: limit,
        // skip: offset,
      });
      return categories;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findOrderedAlphabetically( filters: FindCategoryDto, paginationDto: PaginationDto ){
    try {
      const { limit = 20, offset = 0 } = paginationDto;
      const categories = await this.categoryRepository.find({
        where: this.buildWhereByFilters( filters ),
        // take: limit,
        // skip: offset,
        order: {
          name: 'ASC',
        }
      });
      return categories;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAllMain( filters: FindCategoryDto ){
    try {
      const categories = await this.categoryRepository.find({
        where: {
          ...this.buildWhereByFilters( filters ),
        },
        relations: ['childrens'],
        order: {
          name: 'ASC',
        }
      });
      return categories;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findOne( id: string, filters: FindCategoryDto ) {
    try {
      const category = await this.categoryRepository.findOne({ 
        where: { 
          ...this.buildWhereByFilters( filters ),
          id 
        }
      });
      return category;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      await this.categoryRepository.update(id, {
        ...updateCategoryDto,
        id
      });

      const category = await this.findOne( id, { } );
  
      return category;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async remove(id: string) {
    try {
      await this.productCategoryService.deleteAllByCategoryId( id );
      await this.categoryRepository.delete({ id });
      return true;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async rehabilitate(id: string) {
    try {
      await this.categoryRepository.update(id, {
        isAvailable: true,
        isDeleted: false
      });

      return true;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  private buildWhereByFilters( filters: FindCategoryDto ){
    let where = { };
    if ( typeof filters.isAvailable === 'boolean' ) where = { ...where, isAvailable: filters.isAvailable };
    if ( typeof filters.isDeleted === 'boolean' ) where = { ...where, isDeleted: filters.isDeleted };
    if ( filters.name ) where = { ...where, name: ILike(`%${ filters.name }%`) };

    return where;
  }


  private handleDBError( error: any ){
    if (error.code === '23505') throw new BadRequestException(error.detail);
    
    this.logger.error(error);

    if ( !error.message ) throw new InternalServerErrorException(`Unexpected error, check server logs`);
    else throw new InternalServerErrorException(error.message)
  }
}
