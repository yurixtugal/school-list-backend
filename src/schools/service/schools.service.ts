import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSchoolDto, UpdateSchoolDto } from '../dto/school.dto';
import { School } from '../entity/school.entity';

@Injectable()
export class SchoolsService {

    constructor(@InjectRepository(School) private  schoolRepository: Repository<School>){}

    getAllSchools(){
        return this.schoolRepository.find();
    }

    async getSchoolById(id: number){
        const foundSchool = await this.schoolRepository.findOne( {
            where:{
                id: id
            }
        } );

        if (!foundSchool){
            return new HttpException(`School ${id} not found`, HttpStatus.NOT_FOUND)
        }

        return foundSchool
    }

    async createSchool(createSchoolDto: CreateSchoolDto){
        const foundSchool = await this.schoolRepository.findOneBy({
                name: createSchoolDto.name
            });
        if (foundSchool){
            return new HttpException(`School ${createSchoolDto.name} already exists`,HttpStatus.CONFLICT)
        }

        const newSchool = this.schoolRepository.create(createSchoolDto)
        return this.schoolRepository.save(newSchool)
    }

    async deleteSchool(id: number){
        const foundSchool = await this.getSchoolById(id);

        if (foundSchool instanceof HttpException){
            return foundSchool
        }

        return this.schoolRepository.delete( { id } )
    }

    async updateSchool(id: number, updateSchoolDto: UpdateSchoolDto){
        const foundSchool = await this.getSchoolById(id);

        if (foundSchool instanceof HttpException){
            return foundSchool
        }

        return this.schoolRepository.update({ id },updateSchoolDto)
    }

}
