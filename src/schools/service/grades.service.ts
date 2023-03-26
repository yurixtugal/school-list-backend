import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGradeDto, UpdateGradeDto } from '../dto/grade.dto';
import { Grade } from '../entity/grade.entity';

@Injectable()
export class GradesService {

    constructor(@InjectRepository(Grade) private  gradeRepository: Repository<Grade>){}

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
