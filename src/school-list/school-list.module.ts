import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { SchoolsModule } from 'src/schools/schools.module';
import { SchoolListController } from './controller/school-list.controller';
import { ProductSchoolList } from './entity/product-list-school.entity';
import { SchoolList } from './entity/school-list.entity';
import { SchoolListService } from './service/school-list.service';
import { CategorySchoolList } from './entity/category-school-list.entity';
import { DetailProductCategory } from './entity/detail-product-category.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolList,ProductSchoolList, CategorySchoolList, DetailProductCategory]),forwardRef(() => ProductsModule),SchoolsModule,ConfigModule,JwtModule,AuthModule],
  controllers: [SchoolListController],
  providers: [SchoolListService]
})
export class SchoolListModule {}
