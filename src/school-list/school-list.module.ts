import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { SchoolsModule } from 'src/schools/schools.module';
import { SchoolListController } from './controller/school-list.controller';
import { ProductSchoolList } from './entity/product-list-school.entity';
import { SchoolList } from './entity/school-list.entity';
import { SchoolListService } from './service/school-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolList,ProductSchoolList]),forwardRef(() => ProductsModule),SchoolsModule],
  controllers: [SchoolListController],
  providers: [SchoolListService]
})
export class SchoolListModule {}
