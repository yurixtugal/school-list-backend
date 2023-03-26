import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entity/product.entity';
import { ProductsService } from 'src/products/service/products.service';
import { GradesService } from 'src/schools/service/grades.service';
import { Repository } from 'typeorm';
import { CreateSchoolListDto } from '../dto/schoolList.dto';
import { ProductSchoolList } from '../entity/product-list-school.entity';
import { SchoolList } from '../entity/school-list.entity';

@Injectable()
export class SchoolListService {
    getSchoolListById(id: number) {
        return this.schoolListRepository.findOne({
            where:{
                id: id
            }
        });
    }

    constructor(@InjectRepository(SchoolList) private schoolListRepository: Repository<SchoolList>,
    @InjectRepository(ProductSchoolList) private productSchoolListRepository: Repository<ProductSchoolList>,
    @Inject(GradesService ) private gradeService: GradesService,
    @Inject(ProductsService) private productsService: ProductsService){}

    getAllSchoolList(){
        return this.schoolListRepository.find();
    }

   async createSchoolList(createSchoolListDto: CreateSchoolListDto){
        
        const gradeFound = await this.gradeService.getGradeById(createSchoolListDto.gradeId)

        if (gradeFound instanceof HttpException){
            return gradeFound
        }
        let productSchool = createSchoolListDto.lstProductSchool;
        let arrIds = productSchool.map(ps => {
            return  ps.productId
        })
        let setIds = new Set(arrIds)
        arrIds = Array.from(setIds)
        let arrProducts = await this.productsService.getProductsByIds(arrIds)
        if ( arrProducts.length !== arrIds.length){
            return new HttpException("Some products don't exists",HttpStatus.CONFLICT)
        }
        const newSchoolList =  this.schoolListRepository.create(createSchoolListDto)
        const resultSchoolList = await this.schoolListRepository.save(newSchoolList)
        productSchool = productSchool.map(ps => {
            return  {  schoolListId: resultSchoolList.id,...ps}
        })
        const rpta = this.productSchoolListRepository.create(productSchool)
        
        const finalResult = await this.productSchoolListRepository.save(rpta)

        return this.getSchoolListById(resultSchoolList.id)
    }


}
