import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entity/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';


@Injectable()
export class BrandsService {

    
    constructor(@InjectRepository(Brand) private brandRepository: Repository<Brand>){}

    async createBrand(createBrandDto: CreateBrandDto){
        const foundBrand = await this.brandRepository.findBy({
            name: createBrandDto.name
        })
        console.log(foundBrand)
        if (foundBrand.length > 0) {
          return new HttpException("Brand already exists",HttpStatus.CONFLICT)
        }
        
        const newBrand = this.brandRepository.create(createBrandDto);
        return this.brandRepository.save(newBrand)
    }

    getAllBrands(){
        return this.brandRepository.find({
            relations: ["products"]
        })
    }

    async getBrandById(id: number){
        const foundBrand = await this.brandRepository.findOne({
            where: {
             id
            },
            relations: ["products"]
          })
          if (!foundBrand){
            return new HttpException(`Brand ${id} doesn't exists`, HttpStatus.NOT_FOUND)
          }
        return foundBrand
    }


    async deleteBrand(id: number) {
        const foundBrand = await this.getBrandById(id);
        if (!foundBrand){
            return new HttpException(`Brand ${id} doesn't exists`, HttpStatus.NOT_FOUND)
        }
        return this.brandRepository.delete({ id })
    }

    async updateBrand(id: number, updateBrandDto: UpdateBrandDto) {
        const foundBrand = await this.getBrandById(id);
        if (!foundBrand){
            return new HttpException(`Brand ${id} doesn't exists`, HttpStatus.NOT_FOUND)
        }

        return this.brandRepository.update({ id },updateBrandDto)
    }



}
