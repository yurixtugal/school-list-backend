import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controller/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { BrandsController } from './controller/brands.controller';
import { BrandsService } from './service/brands.service';
import { Brand } from './entity/brand.entity';
import { SchoolListModule } from 'src/school-list/school-list.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([Product,Brand]),forwardRef(() => SchoolListModule),ConfigModule,JwtModule ,AuthModule],
  controllers: [ProductsController,BrandsController],
  providers: [ProductsService,BrandsService],
  exports: [ProductsModule,ProductsService]
})
export class ProductsModule {}
