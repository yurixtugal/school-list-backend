import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { Product } from '../entity/product.entity';
import { ProductsService} from "../service/products.service"
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

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

  @UseGuards(ApiKeyGuard)
  @Post('')
  createProduct(@Body() newProduct: CreateProductDto){
    return this.productsService.createProduct(newProduct)
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number){
    return this.productsService.deleteProduct(id)
  } 

  @UseGuards(ApiKeyGuard)
  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number,@Body() newProduct: UpdateProductDto){
    return this.productsService.updateProduct(id,newProduct)
  }
}
