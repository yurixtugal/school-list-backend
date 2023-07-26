import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGradeDto, UpdateGradeDto } from '../dto/grade.dto';
import { Grade } from '../entity/grade.entity';
import { SchoolListService } from 'src/school-list/service/school-list.service';

@Injectable()
export class GradesService {


    constructor(@InjectRepository(Grade) private  gradeRepository: Repository<Grade>){}

    async getGradeBySchoolId(id: number) {
        const lstGrades = await this.gradeRepository.find({
            where:{schoolId: id},
            relations:["school"]
        });
        for (let i = 0; i < lstGrades.length; i++){
            const grade = lstGrades[i]
            const result = await this.gradeRepository.query("select sl.file  from school_list sl  where gradeId = ? and year = (select max(sl2.`year`) from school_list sl2 where gradeId = ?)",[grade.id, grade.id])
            lstGrades[i]["fileList"] = result.length > 0? result[0].file:null
            console.log(lstGrades[i])
        }
        return lstGrades;

    }


    getAllGrades(){
        return this.gradeRepository.find();
    }

    async getGradeById(id: number){
        const foundGrade = await this.gradeRepository.findOne( {
            where:{
                id: id
            }
        } );

        if (!foundGrade){
            return new HttpException(`Grade ${id} not found`, HttpStatus.NOT_FOUND)
        }

        return foundGrade
    }

    async createGrade(createGradeDto: CreateGradeDto){
        const foundGrade = await this.gradeRepository.findOneBy({
                name: createGradeDto.name
            });
        if (foundGrade){
            return new HttpException(`Grade ${createGradeDto.name} already exists`,HttpStatus.CONFLICT)
        }

        const newGrade = this.gradeRepository.create(createGradeDto)
        return this.gradeRepository.save(newGrade)
    }

    async deleteGrade(id: number){
        const foundGrade = await this.getGradeById(id);

        if (foundGrade instanceof HttpException){
            return foundGrade
        }

        return this.gradeRepository.delete( { id } )
    }

    async updateGrade(id: number, updateGradeDto: UpdateGradeDto){
        const foundGrade = await this.getGradeById(id);

        if (foundGrade instanceof HttpException){
            return foundGrade
        }

        return this.gradeRepository.update({ id },updateGradeDto)
    }

}
