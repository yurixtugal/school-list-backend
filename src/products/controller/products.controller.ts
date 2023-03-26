import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { Product } from '../entity/product.entity';
import { ProductsService} from "../service/products.service"

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }

  @Post('')
  createProduct(@Body() newProduct: CreateProductDto){
    return this.productsService.createProduct(newProduct)
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number){
    return this.productsService.deleteProduct(id)
  } 

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number,@Body() newProduct: UpdateProductDto){
    return this.productsService.updateProduct(id,newProduct)
  }
}
