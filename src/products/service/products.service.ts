import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { BrandsService } from 'src/products/service/brands.service';

@Injectable()
export class ProductsService {
  
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,private brandService: BrandsService){}

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({relations:["brand"]});
  }

  async getProductsByName(arrNamesProducts: string[], arrQuantities: number[]){
    let arrProducts = [];
    for (let i = 0; i < arrNamesProducts.length; i++){
      let newArrProducts = await this.productRepository.find({
          where: {title: Like(`%${arrNamesProducts[i]}%`)},
          order: {price: 'ASC'}
        });
        const productsWithQuantity = newArrProducts.map(product => {
          return {
            ...product,
            quantity: arrQuantities[i],
          };
        });
        if (productsWithQuantity && productsWithQuantity.length > 0) arrProducts.push(productsWithQuantity)
    }
    return arrProducts
  }

  getProductsByIds(arrIds: number[]){
    return this.productRepository.findBy({
      id: In(arrIds)
    })
  }

  async createProduct( createProductDto: CreateProductDto){
    
    const brandFound = await this.brandService.getBrandById(createProductDto.brandId)

    if (brandFound instanceof HttpException) {
      return brandFound
    }


    const foundProduct = await this.productRepository.findOneBy({
        title: createProductDto.title
    })
    if (foundProduct) {
      return new HttpException("Product already exists",HttpStatus.CONFLICT)
    }
    
    const newProduct = this.productRepository.create(createProductDto)
    console.log("returning new product")
    return this.productRepository.save(newProduct);
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: {
       id
      },
      relations:["brand"]
    });

    if (!product){
      return new HttpException("Product not found", HttpStatus.NOT_FOUND)
    }

    return product

  }

  async updateProduct(id: number, updatedFields: UpdateProductDto){
    const product = await this.productRepository.findOne({
      where: {
       id
      }
    });

    if (!product){
      return new HttpException("Product not found", HttpStatus.NOT_FOUND)
    }

    return this.productRepository.update({id},updatedFields)
  }

 async deleteProduct(id: number) {
    
    const product = await this.productRepository.findOne({
      where: {
       id
      }
    });

    if (!product){
      return new HttpException("Product not found", HttpStatus.NOT_FOUND)
    }
    
    return this.productRepository.delete({ id: id });
  }
}
