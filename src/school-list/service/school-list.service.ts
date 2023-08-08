import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entity/product.entity';
import { ProductsService } from 'src/products/service/products.service';
import { GradesService } from 'src/schools/service/grades.service';
import { Repository } from 'typeorm';
import { CreateSchoolListDto, SchoolListEstimatedDto } from '../dto/schoolList.dto';
import { ProductSchoolList } from '../entity/product-list-school.entity';
import { SchoolList } from '../entity/school-list.entity';
import { CategorySchoolList } from '../entity/category-school-list.entity';
import { DetailProductCategory } from '../entity/detail-product-category.entity';

@Injectable()
export class SchoolListService {
    
    getSchoolListById(id: number) {
        return this.schoolListRepository.findOne({
            where:{
                id: id
            },
            relations: {
                productSchoolLists: {
                    product: true
                },
                grade:{
                    school: true
                },
                categorySchoolLists: {
                    detailProductCategory: true
                }                                                        
            }
        });
    }

    async getSchoolListByIdGrade(idGrade: number) {
        
        console.log(idGrade)
        const result = await this.schoolListRepository.query("select sl.id  from school_list sl  where gradeId = ? and year = (select max(sl2.`year`) from school_list sl2 where gradeId = ?)",[idGrade,idGrade])
        
        console.log("aaa",result)

        return this.schoolListRepository.findOne({
            where:{
                id: result[0].id
            },
            relations: {
                productSchoolLists: {
                    product: true
                },
                grade:{
                    school: true
                },
                categorySchoolLists: {
                    detailProductCategory: true
                }                                                        
            }
        });
    }

    constructor(@InjectRepository(SchoolList) private schoolListRepository: Repository<SchoolList>,
    @InjectRepository(ProductSchoolList) private productSchoolListRepository: Repository<ProductSchoolList>,
    @InjectRepository(CategorySchoolList) private categorySchoolListRepository: Repository<CategorySchoolList>,
    @InjectRepository(DetailProductCategory) private detailProductCategoryRepository: Repository<DetailProductCategory>,
    @Inject(GradesService ) private gradeService: GradesService,
    @Inject(ProductsService) private productsService: ProductsService){}

    getAllSchoolList(){
        return this.schoolListRepository.find({relations: {
                                                            grade:{
                                                                school: true
                                                            }                                                        
                                                            }});
    }

   async createSchoolList(createSchoolListDto: CreateSchoolListDto){
        
        const gradeFound = await this.gradeService.getGradeById(createSchoolListDto.gradeId)

        if (gradeFound instanceof HttpException){
            return gradeFound
        }
        let productSchool = createSchoolListDto.lstProductSchool;
        let categorySchool = createSchoolListDto.lstCategorySchool;
        
        if (productSchool){
            let arrIds = productSchool.map(ps => {
                return  ps.productId
            })
            let setIds = new Set(arrIds)
            arrIds = Array.from(setIds)
            let arrProducts = await this.productsService.getProductsByIds(arrIds)
            if ( arrProducts.length !== arrIds.length){
                return new HttpException("Some products don't exists",HttpStatus.CONFLICT)
            }
        }
        const newSchoolList =  this.schoolListRepository.create(createSchoolListDto)
        const resultSchoolList = await this.schoolListRepository.save(newSchoolList)
        
        if (productSchool){
            productSchool = productSchool.map(ps => {
                return  {  schoolListId: resultSchoolList.id,...ps}
            })
            const rpta = this.productSchoolListRepository.create(productSchool)
            
    
            const finalResult = await this.productSchoolListRepository.save(rpta)
        }
        
        for (let i = 0; i < categorySchool.length;i++){
            let cs = categorySchool[i]
            cs = {  schoolListId: resultSchoolList.id,...cs}
            
            const rptaCategory = this.categorySchoolListRepository.create(cs)

            const finalResultCategory = await this.categorySchoolListRepository.save(rptaCategory)

            console.log(finalResultCategory)

            let detailCategoryProduct = cs.lstDetailCategoryProduct

            detailCategoryProduct = detailCategoryProduct.map( dcp => {
                return {categorySchoolListId: finalResultCategory.id,...dcp}
            })

            console.log(detailCategoryProduct)

            const rptaDetailCategory = this.detailProductCategoryRepository.create(detailCategoryProduct)

            const finalResultDetailCategory = await this.detailProductCategoryRepository.save(rptaDetailCategory)

            //detailCategoryProduct = {  categorySchoolListId: finalResultCategory.id,...detailCategoryProduct}

        }

       /* categorySchool = categorySchool.map(cs => {
            return  {  schoolListId: resultSchoolList.id,...cs}
        }) */
        


        return this.getSchoolListById(resultSchoolList.id)
    }

    async getSchoolListEstimated(schoolListEstimated: SchoolListEstimatedDto){
        
        const arrProductNames = schoolListEstimated.products.map(prod => prod.productName);
        const arrProductQuantity = schoolListEstimated.products.map(prod => prod.quantity);
        const arrProducts = await this.productsService.getProductsByName(arrProductNames,arrProductQuantity)       
        console.log(arrProducts)
        let num = 0;
        const newProducts = arrProducts.map(arrProductsDetail => {
            num++;
            return {
                "Min":{"ProductName": arrProductsDetail[0].title, "Price":parseFloat(arrProductsDetail[0].price), "quantity": arrProductsDetail[0].quantity},
                "Max":{"ProductName": arrProductsDetail[arrProductsDetail.length-1].title, "Price":parseFloat(arrProductsDetail[arrProductsDetail.length-1].price),  "quantity": arrProductsDetail[arrProductsDetail.length-1].quantity},
                "Middle":{"ProductName": arrProductsDetail[Math.round(arrProductsDetail.length/2)].title, "Price":parseFloat(arrProductsDetail[Math.round(arrProductsDetail.length/2)].price),  "quantity": arrProductsDetail[Math.round(arrProductsDetail.length/2)].quantity}
            }
        })

        return newProducts

    }


}
